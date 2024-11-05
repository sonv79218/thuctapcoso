const express = require("express");
const router = express.Router();
const db = require("../db"); // Import kết nối cơ sở dữ liệu
// Đăng nhập
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra email và password trong database
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).send("Lỗi server");
    }

    if (results.length > 0) {
      // Nếu có kết quả, trả về thành công và có thể kèm theo thông tin người dùng
      res.json({ message: "Đăng nhập thành công", user: results[0] });
    } else {
      // Nếu không có kết quả, báo lỗi đăng nhập
      res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
  });
});

module.exports = router;
