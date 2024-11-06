// routes/accountUpgradeRoutes.js

const express = require("express");
const router = express.Router();
const accountUpgradeController = require("../controllers/accountUpgradeController");

router.get("/plans", accountUpgradeController.getPlans);
router.post("/confirm", accountUpgradeController.confirmPlan);
router.post("/payment", accountUpgradeController.processPayment);
router.post("/update", accountUpgradeController.updateUserPlan);

module.exports = router;
