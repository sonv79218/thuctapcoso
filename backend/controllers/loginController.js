// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // File chứa kết nối DB của bạn

// Hàm xử lý đăng nhập
exports.login = async (req, res) => {
  //sau khi nhận dữ liệu từ frontend lúc này đã có dữ liệu từ req. 1 request gồm có username và password gửi trong body
  const { username, password } = req.body;
  // Tìm từ bảng users có username là giá trị được truyền vào ?, ở đây là [username]
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    //thực hiện truy vấn trên csdl
    //nếu không kết nối được csdl
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    //nếu không tìm được bất cứ username trùng
    if (results.length === 0) {
      return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    }
    //result là phần tên người dùng dữ liệu từ db. có thể là nhiều user cùng tên nên để là mảng
    const user = results[0];
    //nếu mật khẩu giống nhau sẽ trả về true. còn không giống sẽ trả về passwordMath là false
    //so sánh mật khẩu của người dùng - không mã hóa với mật khẩu trong cơ sở dữ liệu - được mã hóa
    const passwordMatch = await bcrypt.compare(password, user.password);
    //nếu mật khẩu không khớp
    if (!passwordMatch) {
      return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    }
    // localStorage.setItem("username", user.username); // Lưu username
    // localStorage.setItem("user_id", user.id); // Lưu user_id (nếu cần)
    //localStorage.setItem("token", token); // Lưu JWT token (nếu có)

    //Tạo JWT token để trả về cho frontend
    const token = jwt.sign({ username: user.username }, "JWT_SECRET", {
      expiresIn: "1h",
    });

    // Trả về token cho client
    // res.status(200).json({ message: "Đăng nhập thành công!", token });
    //tôi sẽ dùng localStorage để lưu
    res
      .status(200)
      .json({
        message: "đăng nhập thành công",
        token,
        username: user.username,
        user_id: user.id,
      });
  });
};
