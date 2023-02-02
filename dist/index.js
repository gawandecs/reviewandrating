"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const user_routes_1 = __importDefault(require("./module/user/user.routes"));
const app = express();
let port = 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.set('strictQuery', true);
const url = "mongodb://localhost:27017/user";
mongoose.connect(url).then((ans) => {
    console.log("ConnectedSuccessful");
}).catch((err) => {
    console.log("Error in the Connection");
});

app.use("/", user_routes_1.default);
app.listen(port, () => {
    console.log(`The application is listening on port ${port} `);
});
