import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Login.css"; // Đảm bảo đã tạo file CSS này

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setErrorMessage("Thông tin đăng nhập không đúng.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
          <p>
            Chưa có tài khoản? <a href="/register"> đăng ký</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
