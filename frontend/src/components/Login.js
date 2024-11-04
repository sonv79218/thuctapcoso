import React from "react";

const Login = () => {
  return (
    <div>
      <h2>Đăng Nhập</h2>
      <form>
        <div>
          <label>Tên đăng nhập:</label>
          <input type="text" placeholder="Nhập tên đăng nhập" />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
