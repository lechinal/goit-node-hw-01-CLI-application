const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <action>", "Chose an action", "No action")
  .option("-i, --id <id>", "Write an id", "No id")
  .option("-n, --name <name>", "Write a name", "No name")
  .option("-e, --email <email>", "Write an email", "No email")
  .option("-p, --phone <phone>", "Write a phone number", "No phone number")
  .option("-l, --list <list>", "List contacts");

program.action(() => {
  const options = program.opts();
});

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone, id);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
