const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db"); // Giả sử file này chứa kết nối DB của bạn
const jwt = require("jsonwebtoken");
const router = express.Router(); // Thêm dòng này để khai báo router

router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem username có tồn tại không
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }

    if (results.length === 0) {
      // Nếu không tìm thấy người dùng
      return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Nếu mật khẩu không khớp
      return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    }

    // Tạo JWT token
    const token = jwt.sign({ username: user.username }, "JWT_SECRET", {
      expiresIn: "1h", // Ví dụ: hết hạn sau 1 giờ
    });

    // Trả về token cho client
    res.status(200).json({ message: "Đăng nhập thành công!", token });
  });
});

module.exports = router; // Đảm bảo export router
