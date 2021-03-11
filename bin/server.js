const app = require("../app");
const db = require("../model/db");
const createFolderIsExist = require("../utils/create-dir");
const { images } = require("../utils/constants");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    console.log(AVATARS_OF_USERS);
    await createFolderIsExist(UPLOAD_DIR);
    await createFolderIsExist(process.env.AVATARS_OF_USERS);
    await createFolderIsExist(path.join(process.env.AVATARS_OF_USERS, images));
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
