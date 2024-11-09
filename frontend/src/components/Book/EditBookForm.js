import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  //lấy thông tin sách
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/edit/${id}`) //lấy dữ liệu
      .then((response) => {
        const { title, genre, author, year, coverImage } = response.data;
        setTitle(title);
        setGenre(genre);
        setAuthor(author);
        setYear(year);
        //
        setPreviewImage(`http://localhost:5000/${coverImage}`);
      })
      .catch((error) => {
        console.error("Lỗi khi tải thông tin sách:", error);
      });
  }, [id]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //submit edit
  const handleSubmit = (e) => {
    e.preventDefault();
    // xử lý khi các sự kiện thay đổi
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("author", author);
    formData.append("year", year);
    if (pdfFile) formData.append("pdfFile", pdfFile);
    if (coverImage) formData.append("coverImage", coverImage);
    // khi xử lý xong sự kiện được thay đổi thì nộp cho backend
    axios
      .put(`http://localhost:5000/api/book/edit/${id}`, formData)
      .then((response) => {
        alert(response.data.message);
        navigate("/"); // Chuyển hướng về trang chính sau khi cập nhật thành công
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật sách:", error);
        alert("Đã xảy ra lỗi khi cập nhật sách");
      });
  };

  return (
    <div className="edit-book-container">
      <form onSubmit={handleSubmit} className="edit-book-form">
        <h2>Chỉnh Sửa Sách</h2>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Thể loại"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tác giả"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Năm xuất bản"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <label htmlFor="pdfFileUpload" className="custom-button">
          Chọn sách PDF
        </label>
        <input
          id="pdfFileUpload"
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          name="pdfFile"
          style={{ display: "none" }}
        />
        <label htmlFor="coverImageUpload" className="custom-button">
          Chọn ảnh bìa
        </label>
        <input
          id="coverImageUpload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          name="coverImage"
          style={{ display: "none" }}
        />
        <button type="submit" className="edit-book-btn">
          Lưu Thay Đổi
        </button>
      </form>

      <div className="image-preview">
        {previewImage && <img src={previewImage} alt="Xem trước ảnh bìa" />}
      </div>
    </div>
  );
};

export default EditBookForm;
