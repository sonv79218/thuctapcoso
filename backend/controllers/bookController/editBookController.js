const db = require("../../config/db");

// Lấy thông tin sách theo ID
const getBookById = (req, res) => {
  const bookId = req.params.id;

  const query = "SELECT * FROM books WHERE id = ?";
  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.error("Lỗi khi truy vấn DB:", err);
      return res
        .status(500)
        .json({ message: "Lỗi server khi lấy thông tin sách" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    res.status(200).json(results[0]);
  });
};

// Cập nhật thông tin sách
const updateBook = (req, res) => {
  // Kiểm tra dữ liệu nhận được từ frontend
  console.log("Dữ liệu nhận được từ frontend: ", req.body);
  console.log("File nhận được: ", req.files);

  const bookId = req.params.id;
  const { title, genre, author, year } = req.body;
  const coverImage = req.files?.coverImage
    ? req.files.coverImage[0].path
    : null;

  // Cập nhật câu lệnh SQL không sử dụng pdfFile
  const query = `
    UPDATE books
    SET title = ?, genre = ?, author = ?, year = ?, coverImage = ?
    WHERE id = ?
  `;
  const values = [title, genre, author, year, coverImage, bookId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Lỗi khi cập nhật DB:", err);
      return res.status(500).json({ message: "Lỗi server khi cập nhật sách" });
    }

    res.status(200).json({ message: "Cập nhật sách thành công!" });
  });
};

module.exports = {
  getBookById,
  updateBook,
};
