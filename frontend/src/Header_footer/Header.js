import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import "../Css/Header.css"; // Import file CSS
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm xử lý khi nhấn vào nút Nâng Cấp
  const handleUpgradeClick = () => {
    navigate("/upgrade"); // Chuyển hướng tới trang Upgrade
  };

  return (
    <header style={{ height: "100px" }}>
      {/* Thanh điều hướng sử dụng Bootstrap */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ height: "100%" }}
      >
        <div className="container-fluid" style={{ height: "100%" }}>
          {/* Logo với khoảng cách 40px từ bên trái */}
          <a
            className="navbar-brand"
            href="/home"
            style={{ marginLeft: "40px", marginTop: "8px", height: "100%" }}
          >
            <img
              src="/image.png" // Đường dẫn tới ảnh logo của bạn
              alt="Logo"
              width="85"
              height="70"
            />
          </a>

          {/* Tính năng thu nhỏ menu trên thiết bị di động */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Các mục trong thanh điều hướng */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0 "
              style={{ marginLeft: "30px" }}
            >
              {/* Các mục menu */}
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/book">
                  Author
                </a>
              </li>
            </ul>

            {/* Ô tìm kiếm với khoảng cách 20px từ logo */}
            <form className="d-flex" style={{ marginLeft: "20px" }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "500px" }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            {/* Nút nâng cấp và tài khoản ở bên phải */}
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
              style={{ marginRight: "40px" }}
            >
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleUpgradeClick}
                  style={{ marginRight: "20px" }}
                >
                  Nâng Cấp
                </button>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tài khoản
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/login">
                      Đăng nhập
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/register">
                      Đăng ký
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
