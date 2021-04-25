const contacts = require("./schemas/cantact");

const listContacts = async () => {
  const results = await contacts.find();
  return results;
};

const getContactById = async (contactId) => {
  const results = await contacts.findById(contactId);
  return results;
};

const removeContact = async (contactId) => {
  const results = await contacts.findByIdAndRemove(contactId);
  return results;
};

const addContact = async (body) => {
  const results = await contacts.create(body);
  return results;
};

const updateContact = async (contactId, body) => {
   const result = await contacts.findByIdAndUpdate(contactId, {...body}, { new: true });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
