import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Login.css"; // Đảm bảo đã tạo file CSS này

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  //3 hàm này sẽ được gọi khi cos sự kiện
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("thông tin đăng nhập: ");
    console.log("tên người dùng: ", username);
    console.log("mật khẩu là: ", password);
    try {
      //gọi 1 yêu cầu tải dữ liêu lên backend để nó trả về dữ liệu -> sau đó lưu kết quả nhận được vào biến username và password.
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        console.log("đăng nhập thành công");
        const { token, username, user_id, role } = response.data;

        // Lưu thông tin vào localStorage
        sessionStorage.setItem("username", username); // Lưu username
        sessionStorage.setItem("userId", user_id); // Lưu user_id
        sessionStorage.setItem("token", token); // Lưu token
        sessionStorage.setItem("role", role); // Lưu role

        console.log(sessionStorage.getItem("token"));
        // const { token } = response.data;
        // localStorage.setItem("token", token);
        //navigate("/home");
        if (role === "admin") {
          navigate("/admin-dashboard"); // Trang admin
        } else {
          navigate("/home"); // Trang người dùng
        }
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
        {/* form để nộp dữ liệu */}
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Tài khoản</label>
            <input
              type="text"
              value={username}
              //1 khi thay đổi thì lưu ngay vào state name thông qua useState
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              //1 khi thay đổi thì lưu ngay vào state name thông qua useState
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
          {/*2 khi nhấn đăng nhập thì  */}
          <p>
            Chưa có tài khoản? <a href="/register"> đăng ký</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
