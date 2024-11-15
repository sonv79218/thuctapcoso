// controllers/bookController/addBookController.js
const db = require("../../config/db");

exports.listBook = (req, res) => {
  const userId = req.query.userId;
  //const userId = sessionStorage.getItem("userId");
  // if (!userId) {
  //   return res.status(400).send("user not found");
  // }
  const query = "SELECT * FROM books WHERE userId = ?";
  //const query = "SELECT * FROM books ";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).send("Lỗi server");
    } else {
      res.json(results); // Trả về dữ liệu sách dưới dạng JSON
    }
  });
};
