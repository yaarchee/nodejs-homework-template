import commander from "commander";
const { Command } = commander;
const program = new Command();

export default program
  .version("0.0.1")
  .option("-l, --list", "All contacts", "list")
  .option("-g, --get <id>", "Get contact by ID")
  .option("-r, --remove <id>", "Remove contact by ID")
  .option("-a, --add", "Added contact by ID", "add")
  .option("-n, --name <name>", "Name")
  .option("-e, --email <email>", "Email")
  .option("-p, --phone <phone>", "Phone");
