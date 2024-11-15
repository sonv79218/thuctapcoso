import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thêm điều hướng từ React Router
import "../../Css/Book/BookList.css"; // CSS tách biệt

const BookList = () => {
  // khai báo state cho các biến
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/list?userId=${userId}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sách:", error);
        setLoading(false);
      });
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book); // Hiển thị sách được chọn
  };

  const handleBackClick = () => {
    setSelectedBook(null); // Quay lại danh sách
  };

  // Hàm xóa sách
  const handleDelete = (bookId) => {
    // Xác nhận trước khi xóa
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      axios
        .delete(`http://localhost:5000/api/book/delete/${bookId}`)
        .then((response) => {
          alert("Sách đã được xóa thành công!");
          setBooks(books.filter((book) => book.id !== bookId)); // Cập nhật lại danh sách
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sách:", error);
          alert("Có lỗi xảy ra khi xóa sách");
        });
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (books.length === 0) {
    return <div className="no-books">Không có sách nào trong danh sách</div>;
  }

  return (
    <div className="booklist-container">
      {selectedBook ? (
        <div className="pdf-viewer-container">
          <button className="back-button" onClick={handleBackClick}>
            Quay lại
          </button>
          {selectedBook.pdf_file ? (
            <iframe
              src={`http://localhost:5000${selectedBook.pdf_file}`}
              width="100%"
              height="700px"
              title={selectedBook.title}
            ></iframe>
          ) : (
            <p>Không có tệp PDF để hiển thị</p>
          )}
        </div>
      ) : (
        <div>
          <h1 className="booklist-title">Danh sách sách</h1>
          <div className="book-grid">
            {books.map((book) => (
              <div className="book-item" key={book.id}>
                <img
                  src={`http://localhost:5000${book.cover_image}`}
                  alt={book.title}
                  className="book-cover"
                />
                <p className="book-title">{book.title}</p>
                <div className="book-actions">
                  <button
                    className="book-button edit"
                    onClick={() => navigate(`/book/edit/${book.id}`)}
                  >
                    Sửa
                  </button>
                  <button
                    className="book-button delete"
                    onClick={() => handleDelete(book.id)}
                  >
                    Xóa
                  </button>
                </div>
                <button
                  className="view-button"
                  onClick={() => handleBookClick(book)}
                >
                  Xem PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
