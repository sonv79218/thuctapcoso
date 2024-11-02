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
