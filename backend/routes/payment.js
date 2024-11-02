const express = require("express");
const router = express.Router();

// Thanh toán
router.get("/", (req, res) => {
  // Logic thanh toán
  res.send("Thanh toán thành công");
});

module.exports = router;
