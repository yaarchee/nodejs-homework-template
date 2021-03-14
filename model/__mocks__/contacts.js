const { contacts } = require("./data");

const listContacts = jest.fn(
  (userId, { sortBy, sortByDesc, filter, sub, limit = "9", offset = "1" }) => {
    return { total: contacts.length, limit, page: offset, contacts };
  }
);

const getContactById = jest.fn((contactId) => {
  const result = contacts.find((contact) => contact._id === contactId);

  return result;
});

const removeContact = jest.fn((contactId) => {
  const index = contacts.findIndex((contact) => contact._id === contactId);

  const [contact] = contacts.splice(index, 1);
  return contact;
});

const addContact = jest.fn((body) => {
  const newContact = { ...body, _id: "test" };
  contacts.push(newContact);
  return newContact;
});

const updateContact = jest.fn((body, contactId, userId) => {
  let contact = contacts.find((contact) => contact._id === contactId);

  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

module.exports = {
  updateContact,
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
