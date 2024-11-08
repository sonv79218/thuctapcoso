const db = require("../../config/db");

// Hàm thêm sách
exports.addBook = (req, res) => {
  const { title, genre, author, year } = req.body;

  if (!title || !genre || !author || !year) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp đầy đủ thông tin sách" });
  }

  const sql =
    "INSERT INTO books (title, genre, author, year) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, genre, author, year], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm sách: ", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "Sách đã tồn tại hoặc lỗi trùng lặp dữ liệu" });
      }

      return res.status(500).json({ message: "Lỗi khi thêm sách", error: err });
    }

    res
      .status(201)
      .json({ message: "Thêm sách thành công", bookId: result.insertId });
  });
};
