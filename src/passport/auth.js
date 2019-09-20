const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJWT;

const userName = require("../model/user");

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top-secret",
      jwtFromRequest: this.ExtractJWT.fromUrlQueryParameters("secret_token")
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passpordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await userName.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passpordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await userName.findOne({ email });

        if (!user) {
          return done(null, false, { message: "user not found" });
        }
        const validate = await user.isValidated(password);
        if (!validate) {
          return done(null, false, { message: "incorrect password" });
        }
        return done(null, user, { message: "logged sucessfully" });
      } catch (error) {
        done(error);
      }
    }
  )
);
