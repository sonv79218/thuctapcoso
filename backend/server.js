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
const loginRoutes = require("./routes/login");
const paymentRoutes = require("./routes/payment");
const bookRoutes = require("./routes/book");
const searchRoutes = require("./routes/search");
const securityRoutes = require("./routes/security");
const accessControlRoutes = require("./routes/accessControl");
const sharingRoutes = require("./routes/sharing");
const notificationsRoutes = require("./routes/notifications");
const homeRoutes = require("./routes/home"); // Thêm dòng này
// Sử dụng các routes
app.use("/", homeRoutes); // Thay đổi để sử dụng homeRoutes
app.use("/api/login", loginRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/access", accessControlRoutes);
app.use("/api/sharing", sharingRoutes);
app.use("/api/notifications", notificationsRoutes);
// Kết nối với MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối DB:", err);
  } else {
    console.log("Kết nối DB thành công!");
  }
});

// Route kiểm tra dữ liệu
app.get("/books", (req, res) => {
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

// Khởi động server
app.listen(port, () => {
  console.log(`Server chạy trên http://localhost:${port}/books`);
});
