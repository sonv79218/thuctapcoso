const multer = require("multer");
const path = require("path");

// Cấu hình multer với việc kiểm tra loại file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Kiểm tra loại file và chọn thư mục tương ứng
    if (file.fieldname === "pdfFile") {
      cb(null, "uploads/pdfs/"); // Lưu file PDF vào thư mục uploads/file
    } else if (file.fieldname === "coverImage") {
      cb(null, "uploads/images/"); // Lưu ảnh vào thư mục uploads/image
    } else {
      cb(new Error("Chỉ chấp nhận file PDF hoặc ảnh JPG, PNG"), false);
    }
  },
  filename: (req, file, cb) => {
    // Đặt tên file bằng cách kết hợp thời gian và tên gốc để tránh trùng lặp
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Middleware để kiểm tra loại file (PDF và ảnh)
const fileFilter = (req, file, cb) => {
  // Kiểm tra file PDF cho sách và file ảnh cho bìa
  const allowedFileTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Chỉ chấp nhận file PDF hoặc ảnh JPG, PNG"));
  }
};

// Cấu hình multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Áp dụng kiểm tra file
  limits: {
    fileSize: 10 * 1024 * 1024, // Giới hạn dung lượng file tối đa là 10MB
  },
});

module.exports = upload;
