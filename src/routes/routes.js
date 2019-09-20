const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;
const router = express.Router();
/*
const productSchema = require("../model/producto");
const clientes = require("../model/cliente");
const User = require("../model/user");
*/

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({ message: "signup sucessfully", user: req.user });
    try{
        if(err || !user) {
            const error = new Error ('an error ocurred');
            return next(error)
        }
        req.login(user, {session:false}, async (error) => {
            if(error) return next(error);
            const body = { _id: user._id, email: user.email };
            const jwt = jwt.sign({user:body}, "top_secret");
            return res.json({token})
        }
  
    } catch(error){
        return next(error);
    }

  })(req, res,next);
});

module.exports = router;
