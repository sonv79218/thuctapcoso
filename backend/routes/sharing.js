const express = require("express");
const router = express.Router();

// Chia sẻ tài liệu
router.get("/", (req, res) => {
  // Logic chia sẻ tài liệu
  res.send("Tài liệu đã được chia sẻ");
});

module.exports = router;
