# 🔐 MERN 2FA Authentication System

A **full-stack authentication system** built using the **MERN stack** that supports **Two-Factor Authentication (2FA)** with **TOTP** verification using [Speakeasy](https://github.com/speakeasyjs/speakeasy) and [Passport.js](http://www.passportjs.org/) for secure user authentication.  
This project demonstrates a complete **1FA (username/password)** and **2FA (TOTP)** authentication flow.

---

## 📜 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Authentication Flow](#authentication-flow)
- [Routes](#routes)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)

---

## ✨ Features
- **User Registration & Login** using Passport.js
- **Session-based authentication**
- **Two-Factor Authentication (2FA)** using Speakeasy (TOTP)
- **MongoDB** for persistent storage of users & 2FA secrets
- **Frontend** built with **React + Vite**
- **Secure API routes** for authentication
- **QR Code generation** for easy 2FA setup
- **Logout & Session Management**
- **Status Check Endpoint** to verify authentication state

---

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Axios
- Tailwind CSS / CSS Modules

**Backend:**
- Node.js + Express.js
- Passport.js
- Speakeasy (TOTP)
- MongoDB + Mongoose
- Express-Session
- bcrypt.js (password hashing)

---

## 📂 Architecture Overview

```plaintext
Frontend (React + Vite)
        |
        | API Requests (Axios)
        v
Backend (Node.js + Express)
  - Routes
  - Controllers
  - Passport.js Auth Strategies
  - Speakeasy TOTP Handling
  - MongoDB User Storage
```

## 🔄 Authentication Flow

### 1FA (Username/Password)
1. User submits login credentials.
2. Passport.js validates credentials against MongoDB.
3. Session is created.

### 2FA (TOTP)
1. After successful 1FA, if 2FA is enabled:
2. Backend sends prompt to enter OTP.
3. OTP is verified using Speakeasy.
4. If verified, full session access is granted.

## 📜 Routes

### Auth Routes (Passport.js)

POST   /api/auth/register    → Register new user  
POST   /api/auth/login       → Login user  
POST   /api/auth/logout      → Logout user  
GET    /api/auth/status      → Check authentication status  

### 2FA Routes (Speakeasy)

POST   /api/auth/2fa/setup   → Generate secret & QR code
POST   /api/auth/2fa/verify  → Verify TOTP
POST   /api/auth/2fa/reset   → Disable or reset 2FA

## ⚙ Installation & Setup

### Clone the repository
```bash
git clone https://github.com/priyansh-narang2308/2fa-auth.git
cd frontend
npm install
```

```bash
cd backend
npm install
```

```bash
npm run dev
```

## 🌱 Environment Variables

### Create a .env file in backend:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/2fa_auth
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt
```
