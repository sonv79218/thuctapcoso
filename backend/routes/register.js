// routes/register.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db"); // Kết nối cơ sở dữ liệu

router.post("/", async (req, res) => {
  const { username, password, email, full_name } = req.body;

  // Kiểm tra nếu tên người dùng hoặc email đã tồn tại
  const userCheckQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(userCheckQuery, [username, email], async (err, results) => {
    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Tên người dùng hoặc email đã tồn tại!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm người dùng mới vào cơ sở dữ liệu
    const insertQuery =
      "INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)";
    db.query(
      insertQuery,
      [username, hashedPassword, email, full_name],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Lỗi khi thêm người dùng!" });
        }
        res.status(201).json({ message: "Đăng ký thành công!" });
      }
    );
  });
});

module.exports = router;
