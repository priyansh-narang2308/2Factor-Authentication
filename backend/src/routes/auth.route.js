import { Router } from "express";
import {
  authStatus,
  login,
  logout,
  register,
  reset2FA,
  setup2FA,
  verify2FA,
} from "../controllers/auth.controller.js";
import passport from "passport";


const router = Router();

// Normal Routes
router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.get("/status", authStatus); // to check whether the user is logged in or not
router.post("/logout", logout);

// MFA Routes
router.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  },
  setup2FA
);
router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  },
  verify2FA
);
router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  },
  reset2FA
);

export default router;
