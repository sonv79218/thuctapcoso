// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { login } = require("../controllers/loginController"); // Import controller

// Định nghĩa route cho đăng nhập
router.post("/", login);

module.exports = router;
