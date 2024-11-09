import React, { useState } from "react";
import "../Css/Register.css"; // Đảm bảo đã tạo file CSS này

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    full_name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Đăng ký thành công!");
      } else {
        alert("Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              //placeholder="Tên đăng nhập"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              //placeholder="Mật khẩu"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              name="email"
              //placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Họ và tên</label>
            <input
              type="text"
              name="full_name"
              //placeholder="Họ và tên"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="register-btn">
            Đăng Ký
          </button>
          <p>
            Đã có tài khoản? <a href="/login"> đăng nhập </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
