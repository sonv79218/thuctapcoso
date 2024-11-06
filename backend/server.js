require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser"); // Đảm bảo rằng đây là dòng đúng
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
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
app.listen(port, () => {
  console.log(`Server chạy trên http://localhost:${port}/api/home`);
});
