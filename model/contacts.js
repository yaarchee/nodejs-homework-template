const Contact = require("./schemas/contact");

async function listContacts(userId) {
  const result = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return result;
}

async function getContactById(contactId) {
  const result = await Contact.findOne({ _id: contactId }).populate({
    path: "owner",
    select: "name email sex -_id",
  });

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

async function updateContact(body, contactId, userId) {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
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
