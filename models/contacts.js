const fs = require("fs/promises");
const ObjectID = require("bson-objectid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const myUpdateContacts = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const data = await allContacts.find((contact) => contact.id === id);
  if (!data) {
    return null;
  }
  return data;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const i = allContacts.findIndex((item) => item.id === id);

  if (i === -1) {
    return null;
  }

  const [result] = allContacts.splice(i, 1);
  myUpdateContacts(allContacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  myUpdateContacts(allContacts);
  return newContact;
};

const updateContactById = async (id, body) => {
  const allContacts = await listContacts();
  const i = allContacts.findIndex((item) => item.id === id);

  if (i === -1) {
    return null;
  }

  allContacts[i] = { ...body, id };
  await myUpdateContacts(allContacts);
  return allContacts[i];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
