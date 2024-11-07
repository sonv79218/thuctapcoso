// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // File chứa kết nối DB của bạn

// Hàm xử lý đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra username có tồn tại không
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    }

    // Tạo JWT token
    const token = jwt.sign({ username: user.username }, "JWT_SECRET", {
      expiresIn: "1h",
    });

    // Trả về token cho client
    res.status(200).json({ message: "Đăng nhập thành công!", token });
  });
};
