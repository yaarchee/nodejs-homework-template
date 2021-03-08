const Contact = require("./schemas/contact");
const { SUBSCRIPTIONS } = require("../utils/constants");

async function listContacts(
  userId,
  { sortBy, sortByDesc, filter, sub, limit = "9", offset = "1" }
) {
  console.log(sub + "  <<<<<<<<<<<<<<<<<<<<<<<<<<<");
  const queryToFind = sub
    ? { owner: userId, subscription: sub }
    : { owner: userId };

  const result = await Contact.paginate(queryToFind, {
    limit,
    page: offset,
    populate: {
      path: "owner",
      select: "name email sex -_id",
    },
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // name: 1 --- if sortBy = name
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // name: -1
    },
  });
  console.log(result);
  const { docs: contacts, totalDocs: total } = result;
  return { total: total.toString(), limit, page: offset, contacts };
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
