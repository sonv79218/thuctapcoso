import React, { useEffect, useState } from "react";
import "../Css/Header.css";
import BookListPublic from "./Book/BookListPublic";
import BookListFree from "./Book/BookListFree";
import BookListPaid from "./Book/BookListPaid";
import ButtonBack from "../Header_footer/ButtonBack";
const Home = () => {
  // Tạo state để lưu trữ tên người dùng
  const [username, setUsername] = useState("");

  // Lấy tên người dùng từ localStorage khi component được render
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Lưu tên người dùng vào state
    }
  }, []); // useEffect chạy 1 lần khi component được render

  return (
    <div>
      {/* Hiển thị thông báo nếu username tồn tại */}
      {username ? (
        <h1>Chào mừng {username} đến với Cửa hàng Sách</h1>
      ) : (
        <h1>Chào mừng đến với Cửa hàng Sách</h1>
      )}

      <p>
        Khám phá bộ sưu tập sách đa dạng của chúng tôi và chọn cho mình những
        cuốn sách yêu thích.
      </p>

      <h3>Sách miễn phí</h3>
      <BookListFree></BookListFree>
      <h3>Sách Hay</h3>
      <BookListPaid></BookListPaid>
    </div>
  );
};

export default Home;
