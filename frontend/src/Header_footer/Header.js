import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Header.css";
//import { all } from "axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component render
  useEffect(() => {
    const userId = sessionStorage.getItem("userId"); // Lấy user_id từ sessionStorage
    setIsLoggedIn(!!userId); // Chuyển đổi thành boolean
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    sessionStorage.removeItem("userId"); // Xóa thông tin đăng nhập
    sessionStorage.removeItem("token"); // Xóa thông tin đăng nhập
    sessionStorage.removeItem("username"); // Xóa thông tin đăng nhập
    setIsLoggedIn(false);
    alert("Bạn đã đăng xuất!");
    navigate("/home"); // Chuyển hướng về trang đăng nhập
  };

  // Hàm xử lý nâng cấp
  const handleUpgradeClick = () => {
    navigate("/upgrade"); // Chuyển hướng tới trang nâng cấp
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <a className="logo" href="/home">
          <img src="/image.png" alt="Logo" className="logo-img" />
        </a>

        {/* Nút tìm kiếm */}
        <form className="search-form">
          <input type="text" placeholder="Search" className="search-input" />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {/* Tài khoản & Nâng cấp */}
        <div className="action-buttons">
          <button className="upgrade-button" onClick={handleUpgradeClick}>
            Nâng Cấp
          </button>
          <div className="account-actions">
            {isLoggedIn ? (
              <>
                {/* Menu điều hướng */}

                <nav className="nav-menu">
                  <ul className="menu-list">
                    <li>
                      <a href="/book" className="menu-link">
                        Author
                      </a>
                    </li>
                  </ul>
                </nav>
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
