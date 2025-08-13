import express, { urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./config/dbConnect.js";
import "./config/passport.config.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

//Middlewares
const corsOptionsNeeed = {
  origin: ["https://2fauthh.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptionsNeeed));
app.use(express.json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);
// this inializes the passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRoutes);

//Listen App
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is listening on PORT: ${PORT}`);
});
