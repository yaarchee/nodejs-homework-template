const Contacts = require("../model/contacts");

const getAllListContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.getContactById(contactId);

    if (!contact) {
      await res
        .status(404)
        .json({ message: "Пользователь не найден", status: 404 });
      return;
    }

    await res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const createNewContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.removeContact(contactId);
    if (!contact) {
      await res
        .status(404)
        .json({ message: "Пользователь не найден", status: 404 });
      return;
    }
    await res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.updateContact(req.body, contactId);

    if (!contact) {
      await res.status(404).json({
        message: "Пользователь или данные для обневления не найдены",
        status: 404,
      });
      return;
    }

    await res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllListContacts,
  getContactByID,
  createNewContact,
  deleteContact,
  updateContact,
};
