import React, { useState } from "react";
import axios from "axios";
import "../../Css/Book/AddBookForm.css";
import ButtonBack from "../../Header_footer/ButtonBack";
const AddBookForm = () => {
  //state cho các thuộc tính
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  // State preview lưu trữ ảnh
  const [previewImage, setPreviewImage] = useState("");
  const [isPaid, setIsPaid] = useState("");
  //hàm thay đổi trạng thái của State pdfFile
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };
  //hàm thay đổi trạng thái của State ImageFile
  const handleImageChange = (e) => {
    // e là truyền vào hàm với tham số là 1 sự kiện, e.target sẽ lấy được phần tử DOM kích hoạt sự kiện. và .files[0] sẽ lấy ra file đầu tiên trong chuỗi files đó
    const file = e.target.files[0];
    setCoverImage(file);
    //tạo URL tạm thời cho ảnh. mục đích là để sau này dùng State đó hiển thị ra màn hình preview sách trước khi thêm
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // khi ng dùng gửi form (e) thì mặc định tải lại trang. đây là câu lệnh ngăn hành vi mặc định đó

    if (
      !title ||
      !genre ||
      !author ||
      !year ||
      !pdfFile ||
      !coverImage ||
      !isPaid
    ) {
      alert("Vui lòng cung cấp đầy đủ thông tin sách và file ảnh bìa");
      return;
    }
    const userId = sessionStorage.getItem("userId"); // Lấy userId từ localStorage
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm sách");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("author", author);
    formData.append("year", year);
    formData.append("pdfFile", pdfFile);
    formData.append("coverImage", coverImage);
    formData.append("userId", userId);
    formData.append("isPaid", isPaid);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/book/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Lỗi khi thêm sách: ", error);
      alert("Đã xảy ra lỗi khi thêm sách");
    }
  };

  return (
    <div className="add-book-container">
      <form onSubmit={handleSubmit} className="add-book-form">
        <h2>Thêm Sách Mới</h2>
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
          required
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
          required
        />
        <div className="radio-container">
          <label>
            <input
              type="radio"
              name="isPaid"
              value="free" // lưu giá trị ispaid = free khi chọn free
              //checked // Kiểm tra trạng thái hiện tại
              onChange={(e) => setIsPaid(e.target.value)}
            />
            Miễn phí
          </label>
          <label>
            <input
              type="radio"
              name="isPaid"
              value="paid" // lưu giá trị vào is paid khi chọn trả phí
              onChange={(e) => setIsPaid(e.target.value)}
            />
            Trả phí
          </label>
        </div>
        <button type="submit" className="add-book-btn">
          Thêm Sách
        </button>
      </form>

      <div className="image-preview">
        {previewImage && <img src={previewImage} alt="Xem trước ảnh bìa" />}
        {pdfFile && (
          <div className="pdf-file-info">Tệp PDF: {pdfFile.name}</div>
        )}
      </div>
      <ButtonBack></ButtonBack>
    </div>
  );
};

export default AddBookForm;
