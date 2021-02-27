const express = require("express");
const router = express.Router();
const ControllersContact = require("../../controllers/controllersContacts");
const validate = require("../../utils/validationContact");

router.get("/", ControllersContact.getAllListContacts);

router.get("/:contactId", ControllersContact.getContactByID);

router.post("/", validate.createContact, ControllersContact.createNewContact);

router.delete("/:contactId", ControllersContact.deleteContact);

router.patch(
  "/:contactId",
  validate.updateContact,
  ControllersContact.updateContact
);

module.exports = router;
