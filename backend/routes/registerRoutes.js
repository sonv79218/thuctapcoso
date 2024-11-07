// routes/registerRoutes.js
const express = require("express");
const router = express.Router();
const { register } = require("../controllers/registerController"); // Import controller

// Định nghĩa route cho đăng ký
router.post("/register", register);

module.exports = router;
