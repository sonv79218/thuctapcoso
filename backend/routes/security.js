const express = require("express");
const router = express.Router();

// Bảo mật
router.get("/", (req, res) => {
  // Logic bảo mật
  res.send("Cấu hình bảo mật");
});

module.exports = router;
