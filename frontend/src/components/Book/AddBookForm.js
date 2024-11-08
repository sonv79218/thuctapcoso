import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường trước khi gửi
    if (!title || !genre || !author || !year || !pdfFile) {
      alert("Vui lòng cung cấp đầy đủ thông tin sách và file PDF");
      return;
    }

    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("author", author);
    formData.append("year", year);
    formData.append("pdfFile", pdfFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/book/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Lỗi khi thêm sách: ", error);
      alert("Đã xảy ra lỗi khi thêm sách");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        placeholder="Năm"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input type="file" onChange={handleFileChange} accept=".pdf" required />
      <button type="submit">Thêm Sách</button>
    </form>
  );
};

export default AddBookForm;
