//imports

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const bparser = require("body-parser");

//inits

const app = express();

const usermodel = require("./model/user");

//midlewares
app.use(bparser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//settings
app.set("PORT", process.env.PORT || 3000);

//server
app.listen(app.get("PORT"), () => {
  console.log(`Server is running on Port ${app.get("PORT")}`);
});
