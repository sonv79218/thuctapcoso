import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    author: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/book/add",
        formData
      );
      alert(response.data.message);
      setFormData({ title: "", genre: "", author: "", year: "" }); // Reset form
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
      alert("Không thể thêm sách");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tiêu đề:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Thể loại:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Tác giả:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Năm xuất bản:</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Thêm sách</button>
    </form>
  );
};

export default AddBookForm;
