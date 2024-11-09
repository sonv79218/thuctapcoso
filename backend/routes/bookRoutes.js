const express = require("express");
const router = express.Router();
const db = require("../config/db");
//const multer = require("multer");
const addBookController = require("../controllers/bookController/addBookController");
const readBookController = require("../controllers/bookController/listBookController");
const deleteBookController = require("../controllers/bookController/deleteBookController");
const {
  getBookById,
  updateBook,
} = require("../controllers/bookController/editBookController");
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

// Lấy thông tin sách theo ID
router.get("/edit/:id", getBookById);

// Cập nhật sách
router.put("/edit/:id", updateBook);
// Lưu sách
router.post("/save", (req, res) => {
  // Logic lưu sách
  res.send("Sách đã được lưu");
});
// Route kiểm tra dữ liệu
router.delete("/delete/:id", deleteBookController.deleteBook);
module.exports = router;
