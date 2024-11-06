import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute để kiểm tra token trước khi cho phép truy cập vào trang
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  // Nếu không có token, điều hướng đến trang login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Nếu có token, hiển thị children (trang được bảo vệ)
  return children;
};

export default PrivateRoute;
