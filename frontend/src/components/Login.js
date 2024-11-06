import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu đăng nhập tới server
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      // Kiểm tra đăng nhập thành công
      if (response.status === 200) {
        const { token } = response.data; // Giả sử token trả về là 'token'

        // Lưu token vào localStorage
        localStorage.setItem("token", token);

        // Điều hướng đến trang home sau khi đăng nhập thành công
        navigate("/home");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setErrorMessage("Thông tin đăng nhập không đúng.");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tài khoản</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
