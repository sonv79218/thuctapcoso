require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 5000;

// Kết nối với MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Kết nối DB thất bại:", err);
  } else {
    console.log("Kết nối DB thành công!");
  }
});

// Thiết lập route cơ bản
app.get("/", (req, res) => {
  res.send("Hello từ Backend!");
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Server chạy trên http://localhost:${port}`);
});
