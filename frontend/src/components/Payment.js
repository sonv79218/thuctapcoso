// components/Payment.js

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get("planId");

  useEffect(() => {
    if (planId) {
      // Thực hiện thanh toán và cập nhật gói cước
      axios
        .post("/api/account-upgrade/payment", { planId, userId: 1 }) // Ví dụ userId = 1
        .then(() => {
          axios
            .post("/api/account-upgrade/update", { planId, userId: 1 })
            .then(() => {
              alert("Nâng cấp tài khoản thành công!");
              navigate("/home");
            })
            .catch((error) =>
              console.error("Error updating user plan:", error)
            );
        })
        .catch((error) => console.error("Error processing payment:", error));
    }
  }, [planId, navigate]);

  return <div>Đang xử lý thanh toán...</div>;
};

export default Payment;
