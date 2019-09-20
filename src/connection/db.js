const mongoose = require("mongoose");
const ENVIRONMENT = process.env.ENVIRONMENT || "dev";

const config = require("../config/config.json")[ENVIRONMENT];

mongoose
        .connect(...config)
        .then(()=>console.log("sucess"))
        .catch(err => console.log({DBError:err}));