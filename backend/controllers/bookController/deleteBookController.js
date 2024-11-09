const db = require("../../config/db");

exports.deleteBook = (req, res) => {
  const bookId = req.params.id; // Lấy ID sách từ tham số URL

  // Xóa sách trong cơ sở dữ liệu
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [bookId], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa sách: ", err);
      return res.status(500).json({ message: "Lỗi khi xóa sách", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sách không tồn tại" });
    }

    res.status(200).json({ message: "Sách đã được xóa thành công" });
  });
};
