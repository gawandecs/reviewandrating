const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
import getUserRoutes from "./module/user/user.routes";
import errorHandler from "./utils/exception";
const app = express();
let port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", true);

const url = "mongodb://localhost:27017/user";

mongoose
  .connect(url)
  .then((ans: any) => {
    console.log("ConnectedSuccessful");
  })
  .catch((err: any) => {
    console.log("Error in the Connection");
  });

app.use("/", getUserRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`The application is listening on port ${port} `);
});
