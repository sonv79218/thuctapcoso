const express = require("express");
const router = express.Router();

// Tìm kiếm
router.get("/", (req, res) => {
  // Logic tìm kiếm
  res.send("Kết quả tìm kiếm");
});

module.exports = router;
