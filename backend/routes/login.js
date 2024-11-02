const express = require("express");
const router = express.Router();

// Đăng nhập
router.get("/", (req, res) => {
  // Logic đăng nhập
  res.send("Đăng nhập thành công");
});

module.exports = router;
