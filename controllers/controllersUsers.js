const jwt = require("jsonwebtoken");
const { HttpCode, SUBSCRIPTIONS, images } = require("../utils/constants");
const Users = require("../model/users");
const fs = require("fs").promises;
const path = require("path");

const { promisify } = require("util");
const Jimp = require("jimp");
// const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const createFolderIsExist = require("../utils/create-dir");

// const uploadCloud = promisify(cloudinary.uploader.upload);
const reg = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email is already use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    if (!user || !(await user.validPassword(password))) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "999h" });
    await Users.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const getInfoUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  console.log("req.user");
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      email,
      subscription,
    },
  });
};

const updateSubscriptionUser = async (req, res, next) => {
  const { subscription } = req.body;
  const id = req.user.id;
  console.log("req.user");
  if (!SUBSCRIPTIONS.includes(subscription)) {
    return res.status(
      HttpCode.BAD_REQUEST.json({
        status: "Error subscription",
        code: HttpCode.BAD_REQUEST,
        data: {
          subscription,
        },
      })
    );
  }
  await Users.updateSubscription(id, subscription);
  return res.status(HttpCode.OK).json({
    status: "Update subscription success",
    code: HttpCode.OK,
    data: {
      subscription,
    },
  });
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const avatarUrl = await saveAvatarToStatic(req);
    // const {
    //   public_id: imgIdCloud,
    //   secure_url: avatarUrl,
    // } = await saveAvatarToCloud(req);
    // await Users.updateAvatar(id, avatarUrl, imgIdCloud);
    await Users.updateAvatar(id, avatarUrl);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};

const saveAvatarToStatic = async (req) => {
  const id = req.user.id;
  const AVATARS_OF_USERS = path.join(process.env.AVATARS_OF_USERS, images);
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
  const avatarUrl = path.normalize(path.join(id, newNameAvatar));
  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar)
    );
  } catch (e) {
    console.log(e.message);
  }
  return avatarUrl;
};

// const saveAvatarToCloud = async (req) => {
//   const pathFile = req.file.path;
//   const result = await uploadCloud(pathFile, {
//     folder: "Photo",
//     transformation: { width: 250, height: 250, crop: "fill" },
//   });
//   cloudinary.uploader.destroy(req.user.imgIdCloud, (err, result) => {
//     console.log(err, result);
//   });
//   try {
//     await fs.unlink(pathFile);
//   } catch (e) {
//     console.log(e.message);
//   }
//   return result;
// };

module.exports = {
  reg,
  login,
  logout,
  getInfoUser,
  updateSubscriptionUser,
  avatars,
};
