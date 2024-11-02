const express = require("express");
const router = express.Router();

// Đọc sách
router.get("/read", (req, res) => {
  // Logic đọc sách
  res.send("Đang đọc sách");
});

// Lưu sách
router.post("/save", (req, res) => {
  // Logic lưu sách
  res.send("Sách đã được lưu");
});

module.exports = router;
