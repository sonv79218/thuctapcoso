const express = require("express");
const router = express.Router();
const db = require("../config/db");
//const multer = require("multer");
const addBookController = require("../controllers/bookController/addBookController");
const readBookController = require("../controllers/bookController/listBookController");
const upload = require("../config/multerConfig"); // Import multer configuration
// Route thêm sách
// router.post("/add", upload.single("pdfFile"), addBookController.addBook);
router.post(
  "/add",
  //kiểm soát dữ liệu từ API từ middleware
  upload.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  addBookController.addBook
);
// Đọc sách
router.get("/list", readBookController.listBook); // Sửa ở đây, gọi hàm readBook từ controller

// Lưu sách
router.post("/save", (req, res) => {
  // Logic lưu sách
  res.send("Sách đã được lưu");
});
// Route kiểm tra dữ liệu

module.exports = router;
