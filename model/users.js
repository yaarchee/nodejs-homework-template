const User = require("./schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  const rest = await User.findOne({ _id: id });
  console.log("findById<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log(rest);
  return await User.findOne({ _id: id });
};

const create = async ({ name, email, password, sex, verify, verifyToken }) => {
  const user = new User({ name, email, password, sex, verify, verifyToken });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, sub) => {
  return await User.updateOne({ _id: id }, { subscription: sub });
};

const updateAvatar = async (id, avatar, imgIdCloud) => {
  return await User.updateOne({ _id: id }, { avatar, imgIdCloud });
};

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};
const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken }); // [1]
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
};
