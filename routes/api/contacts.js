const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  await res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    await res
      .status(404)
      .json({ message: "Пользователь не найден", status: 404 });
    return;
  }

  await res.json(data);
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    await res
      .status(400)
      .json({ message: "Заполните поля" + "name, email, phone " });
    return;
  }
  const data = await addContact(name, email, phone);
  await res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    await res
      .status(404)
      .json({ message: "Пользователь не найден", status: 404 });
    return;
  }
  await res.json(data);
});

router.patch("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(req.body, contactId);

  if (!data) {
    await res
      .status(404)
      .json({
        message: "Пользователь или данные для обневления не найдены",
        status: 404,
      });
    return;
  }

  await res.json({
    status: "success",
    code: 200,
    data: { data },
  });
});

module.exports = router;
