import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(401).json({
        success: false,
        message: "All Fields are required!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });

    console.log("New user: ", newUser);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error registering user",
      message: error,
    });
  }
};

// Login User
export const login = async (req, res) => {
  console.log("The authenticated user is: ", req.user);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

// Check the status of the user
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

// Logout User
export const logout = async (req, res,next) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.session.destroy((error)=>{
      if(error){
        return next(error)
      }

      // clear the cookie here
      // default session name
      res.clearCookie("connect.sid")
      res.status(200).json({
        success: true,
        message: "LogOut successfull",
      });
    })
  });
};

// Setting up the 2FA
export const setup2FA = async (req, res) => {
  try {
    console.log("The requested user is : ", req.user);
    const user = req.user;

    // generate a secret from speakeasy
    var secret = speakeasy.generateSecret();
    console.log("The secret object key is: ", secret);

    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    // make a custom url
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.priyanshnarang.com",
      encoding: "base32",
    });

    // now pass this url to generate a qrcode
    const qrImageUrl = await qrCode.toDataURL(url);

    res.status(200).json({
      success: true,
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error setting up 2FA",
      message: error,
    });
  }
};

// Verifying via OTP
export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({
      message: "2FA Successfull",
      token: jwtToken,
    });
  } else {
    res.status(400).json({
      message: "Invalid 2FA Token!",
    });
  }
};

// Resetting the OTP
export const reset2FA = async (req, res) => {
  try {
    // Just clear out the 2factor secret from the database and make active as false
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "2FA reset successfull",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error relsetting 2FA!",
      message: error,
    });
  }
};
