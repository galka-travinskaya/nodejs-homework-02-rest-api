const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs/promises");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/contacts");
const {validationCreateContact, validationUpdateContact} = require('./validate-contacts-router')

// const contactsPath = path.join(__dirname, "contacts.json");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    console.log(contact);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validationCreateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    console.log(contact);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    console.log(contact);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    console.log(contact);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

// router.patch("/:contactId", async (req, res, next) => {
//   try {
//     const contact = await updateContact(req.params.contactId);
//     console.log(contact);
//     if (contact) {
//       return res.json({
//         status: "success",
//         code: 200,
//         data: {
//           contact,
//         },
//       });
//     } else {
//       return res.status(404).json({
//         status: "error",
//         code: 404,
//         message: "Not found",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
