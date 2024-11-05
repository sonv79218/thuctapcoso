import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Thay useHistory bằng useNavigate

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Thay useHistory() bằng useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/home"); // Sử dụng navigate để điều hướng về trang chủ sau khi đăng nhập thành công
      } else {
        setErrorMessage(data.message); // Hiển thị lỗi
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setErrorMessage("Lỗi kết nối đến server.");
    }
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Tên đăng nhập:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Mật khẩu:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
