// controllers/bookController/addBookController.js
const db = require("../../config/db");

exports.listBookPublic = (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).send("Lỗi server");
    } else {
      res.json(results); // Trả về dữ liệu sách dưới dạng JSON
    }
  });
};
exports.listBookFree = (req, res) => {
  const query = "SELECT * FROM books WHERE isPaid = 'free'";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).send("Lỗi server");
    } else {
      res.json(results); // Trả về dữ liệu sách dưới dạng JSON
    }
  });
};
exports.listBookPaid = (req, res) => {
  const query = "SELECT * FROM books WHERE isPaid = 'paid'";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).send("Lỗi server");
    } else {
      res.json(results); // Trả về dữ liệu sách dưới dạng JSON
    }
  });
};
