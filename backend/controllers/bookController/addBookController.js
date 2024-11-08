const upload = require("../../config/multerConfig");

// Sử dụng multer để upload file
exports.addBook = (req, res) => {
  upload.fields([{ name: "pdfFile" }, { name: "coverImage" }])(
    req,
    res,
    (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { title, genre, author, year } = req.body;
      // Lấy đường dẫn của các file đã upload
      const pdfFile = req.files["pdfFile"]
        ? req.files["pdfFile"][0].path
        : null;
      const coverImage = req.files["coverImage"]
        ? `/uploads/image/${req.files["coverImage"][0].filename}`
        : null;

      // Kiểm tra xem tất cả các trường đã được cung cấp chưa
      if (!title || !genre || !author || !year || !pdfFile || !coverImage) {
        return res.status(400).json({
          message: "Vui lòng cung cấp đầy đủ thông tin sách và file ảnh bìa",
        });
      }

      // Lưu thông tin vào cơ sở dữ liệu
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
          res
            .status(201)
            .json({ message: "Thêm sách thành công", bookId: result.insertId });
        }
      );
    }
  );
};
