import React from "react";
import "../Css/Header.css"; // Import file CSS

const Header = () => {
  return (
    <header style={{ height: "70px" }}>
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
            style={{ marginLeft: "40px", height: "100%" }}
          >
            <img
              src="your-logo-url.png" // Đường dẫn tới ảnh logo của bạn
              alt="Logo"
              width="40"
              height="30"
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            {/* Nút nâng cấp và tài khoản ở bên phải */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-outline-primary" type="button">
                  Nâng Cấp
                </button>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
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
