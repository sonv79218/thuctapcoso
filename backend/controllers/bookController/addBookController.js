const db = require("../../config/db");
exports.addBook = (req, res) => {
  try {
    // Lấy dữ liệu từ body
    const { title, genre, author, year } = req.body;

    // Lấy đường dẫn file từ req.files
    const pdfFile = req.files?.pdfFile
      ? `/uploads/${req.files.pdfFile[0].filename}`
      : null;
    const coverImage = req.files?.coverImage
      ? `/uploads/${req.files.coverImage[0].filename}`
      : null;

    // Kiểm tra dữ liệu
    if (!title || !genre || !author || !year || !pdfFile || !coverImage) {
      return res.status(400).json({
        message: "Vui lòng cung cấp đầy đủ thông tin sách và file ảnh bìa",
      });
    }

    // Thực hiện lưu vào cơ sở dữ liệu
    const sql = `
      INSERT INTO books (title, genre, author, year, cover_image, pdf_file) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [title, genre, author, year, coverImage, pdfFile],
      (err, result) => {
        if (err) {
          console.error("Lỗi khi thêm sách: ", err);
          return res
            .status(500)
            .json({ message: "Lỗi khi thêm sách", error: err });
        }
        res.status(201).json({
          message: "Thêm sách thành công",
          bookId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Lỗi trong quá trình thêm sách: ", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};
