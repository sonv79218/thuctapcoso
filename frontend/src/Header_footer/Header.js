import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Trạng thái lưu vai trò người dùng
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập và vai trò khi component render
  useEffect(() => {
    const userId = sessionStorage.getItem("userId"); // Lấy user_id từ sessionStorage
    const userRole = sessionStorage.getItem("role"); // Lấy role từ sessionStorage
    setIsLoggedIn(!!userId); // Chuyển đổi thành boolean
    setRole(userRole); // Lưu vai trò của người dùng
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role"); // Xóa vai trò
    setIsLoggedIn(false);
    setRole(null); // Đặt lại vai trò
    alert("Bạn đã đăng xuất!");
    navigate("/home");
  };

  // Hàm xử lý nâng cấp
  const handleUpgradeClick = () => {
    navigate("/upgrade");
  };

  // Hàm xử lý quay lại trang Admin // xử lý cho nút bấm nếu thỏa mãn yêu cầu trong biến session thì hiện ra nút bấm
  // giờ thì thỏa mãn yêu cầu thì truy cập trang
  const handleGoToAdmin = () => {
    navigate("/admin-dashboard");
  };

  return (
    <header className="header">
      <div className="header-container">
        <a className="logo" href="/home">
          <img src="/image.png" alt="Logo" className="logo-img" />
        </a>

        <form className="search-form">
          <input type="text" placeholder="Search" className="search-input" />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="action-buttons">
          <button className="upgrade-button" onClick={handleUpgradeClick}>
            Nâng Cấp
          </button>
          <div className="account-actions">
            {isLoggedIn ? (
              <>
                <nav className="nav-menu">
                  <ul className="menu-list">
                    <li>
                      <a href="/book" className="menu-link">
                        Author
                      </a>
                    </li>
                  </ul>
                </nav>

                {role === "admin" && ( // nếu điều kiện trước dấu && đúng thì sau && sẽ được thực thi
                  <button onClick={handleGoToAdmin} className="admin-button">
                    Admin Page
                  </button>
                )}

                <a href="/profile" className="account-link">
                  Tài khoản
                </a>
                <button onClick={handleLogout} className="logout-button">
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="account-link">
                  Đăng nhập
                </a>
                <a href="/register" className="account-link">
                  Đăng ký
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
