const express = require("express");
const router = express.Router();
const db = require("../config/db");

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
// Route kiểm tra dữ liệu
router.get("/", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      res.status(500).send("Lỗi server");
    } else {
      res.json(results);
    }
  });
});
module.exports = router;
