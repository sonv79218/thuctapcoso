const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Tất cả file sẽ lưu trong thư mục uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Giới hạn dung lượng 10MB
  },
});

module.exports = upload;
