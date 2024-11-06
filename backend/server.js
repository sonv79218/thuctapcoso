require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser"); // Đảm bảo rằng đây là dòng đúng
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Secret key cho JWT (nên lưu trữ trong biến môi trường)
const JWT_SECRET = process.env.JWT_SECRET || "123456";
// Middleware kiểm tra token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }
    req.user = decoded; // Lưu thông tin người dùng vào request
    next();
  });
};
// Import các routes
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const paymentRoutes = require("./routes/payment");
const bookRoutes = require("./routes/book");
const searchRoutes = require("./routes/search");
const securityRoutes = require("./routes/security");
const accessControlRoutes = require("./routes/accessControl");
const sharingRoutes = require("./routes/sharing");
const notificationsRoutes = require("./routes/notifications");
const homeRoutes = require("./routes/home"); // Thêm dòng này
const accountUpgradeRoutes = require("./routes/accountUpgradeRoutes");
// Sử dụng các routes

app.use("/api/home", homeRoutes); // Thay đổi để sử dụng homeRoutes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/access", accessControlRoutes);
app.use("/api/sharing", sharingRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/account-upgrade", accountUpgradeRoutes);
// Khởi động server
// Đảm bảo rằng người dùng đã đăng nhập trước khi truy cập trang chủ
app.get("/home", authenticateToken, (req, res) => {
  res.json({ message: "Chào mừng bạn đến với trang chủ!", user: req.user });
});
app.listen(port, () => {
  console.log(`Server chạy trên http://localhost:${port}/api/home`);
});
