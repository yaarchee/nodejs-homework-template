const fs = require("fs/promises");
const handleError = require("./handlerror");

async function writeFile(contactsPath, data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, "  "));
  } catch (e) {
    console.error(e.message);
    handleError(e);
  }
}

async function readFile(contactsPath) {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (e) {
    console.error(e.message);
    handleError(e);
  }
}

module.exports = { readFile, writeFile };
