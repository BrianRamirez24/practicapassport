//imports

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const bparser = require("body-parser");
require("./connection/db");
require("./passport/auth");
//inits

const app = express();

const usermodel = require("./model/user");

//midlewares
app.use(bparser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(require("./routes/routes"));
app.use(require("./routes/secure-routes"));

app.use(
  passport.authenticate("jwt", { session: false }),
  require("./routes/secure-routes")
);
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

//settings
app.set("PORT", process.env.PORT || 3000);

//server
app.listen(app.get("PORT"), () => {
  console.log(`Server is running on Port ${app.get("PORT")}`);
});
