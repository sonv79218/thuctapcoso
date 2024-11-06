// controllers/accountUpgradeController.js

const db = require('../config/db');

// Lấy danh sách các gói cước
exports.getPlans = (req, res) => {
    const query = 'SELECT * FROM plans';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching plans', error: err });
        } else {
            res.json(results);
        }
    });
};

// Xác nhận gói cước đã chọn
exports.confirmPlan = (req, res) => {
    const { planId } = req.body;
    const query = 'SELECT * FROM plans WHERE id = ?';
    db.query(query, [planId], (err, results) => {
        if (err || results.length === 0) {
            res.status(404).json({ message: 'Plan not found', error: err });
        } else {
            res.json({ message: 'Gói cước đã xác nhận', selectedPlan: results[0] });
        }
    });
};

// Xử lý thanh toán
exports.processPayment = (req, res) => {
    const { planId, userId } = req.body;
    // Giả sử thanh toán thành công, cập nhật gói cước người dùng
    const query = 'INSERT INTO payments (user_id, plan_id) VALUES (?, ?)';
    db.query(query, [userId, planId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error processing payment', error: err });
        } else {
            res.json({ message: 'Thanh toán thành công', paymentId: result.insertId });
        }
    });
};

// Cập nhật gói cước cho tài khoản người dùng
exports.updateUserPlan = (req, res) => {
    const { userId, planId } = req.body;
    const query = 'UPDATE users SET plan_id = ? WHERE id = ?';
    db.query(query, [planId, userId], (err) => {
        if (err) {
            res.status(500).json({ message: 'Error updating user plan', error: err });
        } else {
            res.json({ message: 'Nâng cấp tài khoản thành công', planId });
        }
    });
};
