const express = require("express");
const router = express.Router();
const ControllersContact = require("../../controllers/controllersContacts");
const validate = require("../../utils/validationContact");
const guard = require("../../utils/guard");

router.get("/", guard, ControllersContact.getAllListContacts);

router.get("/:contactId", guard, ControllersContact.getContactByID);

router.post(
  "/",
  guard,
  validate.createContact,
  ControllersContact.createNewContact
);

router.delete("/:contactId", guard, ControllersContact.deleteContact);

router.patch(
  "/:contactId",
  guard,
  validate.updateContact,
  ControllersContact.updateContact
);

module.exports = router;
