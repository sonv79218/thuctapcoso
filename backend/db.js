const mysql = require("mysql2");
require("dotenv").config();

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

module.exports = db; // Xuất kết nối DB để sử dụng trong các tệp khác
