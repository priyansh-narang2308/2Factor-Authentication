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
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ success: false, message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        username: user.username,
        isMfaActive: user.isMfaActive,
      });
    });
  })(req, res, next);
});
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
