// components/UpgradeAccount.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Upgrade.css"; // Import file CSS

const UpgradeAccount = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh sách các gói cước từ API
    axios
      .get("/api/account-upgrade/plans")
      .then((response) => setPlans(response.data))
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleRegister = () => {
    if (selectedPlan) {
      // Xác nhận gói cước và điều hướng đến trang thanh toán
      axios
        .post("/api/account-upgrade/confirm", { planId: selectedPlan.id })
        .then(() => {
          // Điều hướng đến trang thanh toán với gói đã chọn
          navigate(`/payment?planId=${selectedPlan.id}`);
        })
        .catch((error) => console.error("Error confirming plan:", error));
    }
  };

  return (
    <div className="upgrade-account">
      <h2>Nâng cấp tài khoản</h2>
      <div className="plans">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="plan"
            onClick={() => handlePlanSelect(plan)}
          >
            <h3>{plan.name}</h3>
            <p>{plan.details}</p>
            <p>Giá: {plan.price} VND</p>
            {selectedPlan && selectedPlan.id === plan.id && (
              <div className="plan-details">
                <p>
                  <strong>Thông tin chi tiết:</strong>
                </p>
                <p>{plan.fullDetails}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="selected-plan">
          <p>Bạn đã chọn gói: {selectedPlan.name}</p>
          <button className="button" onClick={handleRegister}>
            Đăng ký
          </button>
        </div>
      )}
    </div>
  );
};

export default UpgradeAccount;
