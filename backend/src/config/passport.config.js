import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

// to serizlaize the user
passport.serializeUser((user, done) => {
  console.log("We are inside serializeUser");
  done(null, user._id);
});

// to deserialze the user
passport.deserializeUser(async (_id, done) => {
  console.log("We are inside serializeUser");
  try {
    console.log("We are inside deserializeUser");
    // to find thawt particular desxrized id
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
