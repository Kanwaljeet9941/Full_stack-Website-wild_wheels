const mongoose = require("mongoose");
const dontenv = require("dotenv");
dontenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(() => {
  console.log("Database connectd successfully!");
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
