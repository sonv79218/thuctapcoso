// src/components/ButtonBack.js
import React from "react";
import { useNavigate } from "react-router-dom";

// Component ButtonBack
const ButtonBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  return (
    <button onClick={handleGoBack} style={styles.button}>
      Quay lại
    </button>
  );
};

// Styles for the button
const styles = {
  button: {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default ButtonBack;
