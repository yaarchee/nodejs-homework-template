const { readFile, writeFile } = require("../utils/fs");
const path = require("path");
const uniqid = require("uniqid");
const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  return await readFile(contactsPath);
}

async function getContactById(contactId) {
  const data = await readFile(contactsPath);
  const contact = data.find((obj) => String(obj.id) === contactId);
  if (!contact) {
    return false;
  }
  return contact;
}

async function removeContact(contactId) {
  const data = await readFile(contactsPath);
  const contacts = data.filter((obj) => String(obj.id) !== contactId);

  if (contacts.length === data.length) {
    return false;
  }
  await writeFile(contactsPath, contacts);
  return contacts;
}

async function addContact(name, email, phone) {
  const data = await readFile(contactsPath);
  data.push({ id: uniqid(), name, email, phone });
  await writeFile(contactsPath, data);
  return data;
}

async function updateContact(params, contactId) {
  const data = await readFile(contactsPath);
  let index = null;
  const contact = data.find((obj, indx) => {
    if (String(obj.id) === contactId) {
      index = indx;
      return obj;
    }
  });
  //console.log(Boolean(Object.keys(params).length));
  if (!Object.keys(params).length && contact) {
    console.log("false");
    return false;
  }

  for (const key in params) {
    contact[key] = params[key];
  }

  data[index] = contact;
  await writeFile(contactsPath, data);

  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
