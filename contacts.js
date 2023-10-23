const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("File reading error: Something went wrong", err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contactID", err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      console.log(`Contact with id:${contactId} not found`);
      return;
    }
    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error on reading file", err);
      return;
    }

    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      console.error(`Contact with id:${contactId} was not found!`);
      return;
    }
    contacts.splice(index, 1);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error("Error on writing file", err);
        return;
      }

      console.log("Contact removed with success!");
    });
  });
}

function addContact(name, email, phone) {
  if (!name) {
    console.error("Error, please add a contact");
    return;
  }
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = { id: v4(), name, email, phone };

    contacts.push(newContact);
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error on writing file", err);
        return;
      }
      console.log("Contact added with succesc!");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
