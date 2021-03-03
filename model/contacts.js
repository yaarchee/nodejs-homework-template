const Contact = require("./schemas/contact");

async function listContacts() {
  const result = await Contact.find({});
  return result;
}

async function getContactById(contactId) {
  const result = await Contact.findOne({ _id: contactId });

  return result;
}

async function removeContact(contactId) {
  const result = await Contact.findByIdAndRemove({ _id: contactId });
  return result;
}

async function addContact(body) {
  const result = await Contact.create(body);
  return result;
}

async function updateContact(body, contactId) {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
