// routes/home.js
const express = require("express");
const router = express.Router();

// Route cho trang chủ
router.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Trang Chủ</title>
      </head>
      <body>
        <h1>Chào Mừng Đến Với Ứng Dụng Của Chúng Tôi!</h1>
        <ul>
          <li><a href="/api/login">Đăng Nhập</a></li>
          <li><a href="/api/payment">Thanh Toán</a></li>
          <li><a href="/api/book">Đọc Sách</a></li>
          <li><a href="/api/search">Tìm Kiếm</a></li>
          <li><a href="/api/security">Bảo Mật</a></li>
          <li><a href="/api/access">Quản Lý Quyền Truy Cập</a></li>
          <li><a href="/api/sharing">Chia Sẻ Tài Liệu</a></li>
          <li><a href="/api/notifications">Thông Báo</a></li>
        </ul>
      </body>
    </html>
  `);
});

// Exports the router
module.exports = router;
