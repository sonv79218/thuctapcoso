// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

// Import middleware và routes
const { authenticateToken } = require("./middleware/authMiddleware");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const bookRoutes = require("./routes/bookRoutes");
const accountUpgradeRoutes = require("./routes/accountUpgradeRoutes");

// Cấu hình ứng dụng
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Đảm bảo đã thêm dòng này
// Sử dụng các routes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/account-upgrade", accountUpgradeRoutes);

// Khởi động server
app.get("/home", authenticateToken, (req, res) => {
  res.json({ message: "Chào mừng bạn đến với trang chủ!", user: req.user });
});

app.listen(port, () => {
  console.log(`Server chạy trên http://localhost:${port}`);
});
