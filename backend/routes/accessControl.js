const express = require("express");
const router = express.Router();

// Quản lý quyền truy cập
router.get("/", (req, res) => {
  // Logic quản lý quyền truy cập
  res.send("Quyền truy cập được quản lý");
});

module.exports = router;
