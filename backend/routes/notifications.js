const express = require("express");
const router = express.Router();

// Thông báo
router.get("/", (req, res) => {
  // Logic thông báo
  res.send("Danh sách thông báo");
});

module.exports = router;
