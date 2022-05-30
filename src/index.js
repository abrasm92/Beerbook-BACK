require("dotenv").config();
const debug = require("debug")("beerbook:root");

const chalk = require("chalk");
const connectDB = require("./db");
const initializeServer = require("./server/initializeServer");

const port = process.env.PORT ?? 4000;
const urlDB = process.env.DATA_BASE;

(async () => {
  try {
    await connectDB(urlDB);
    await initializeServer(port);
  } catch {
    debug(chalk.red("An error has ocurred"));
    process.exit(1);
  }
})();
