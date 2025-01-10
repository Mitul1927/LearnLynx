import React from "react";
import { useNavigate } from "react-router-dom";
const CourseCard = ({ image, courseName, id }) => {
  const navigate = useNavigate();
  const styles = {
    cardContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      padding: "2rem",
      fontFamily: "Outfit",
    },
    imageContainer: {
      flex: "0 0 100px",
      marginRight: "20px",
    },
    image: {
      width: "100%",
      height: "auto",
      backgroundColor: "#ddd",
    },
    courseInfo: {
      flex: "1",
      textAlign: "left",
    },
    courseName: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "0",
    },
    tutorName: {
      color: "#555",
      margin: "5px 0",
    },
    rating: {
      display: "flex",
      alignItems: "center",
    },
    stars: {
      color: "#ffc107",
      marginLeft: "5px",
    },
    priceContainer: {
      textAlign: "right",
    },
    price: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    ViewCourse: {
      backgroundColor: "#f9c365",
      display: "block",
      marginTop: "5px",
      color: "black",
      cursor: "pointer",
      border: "none",
      borderRadius: "0.25rem",
      padding: "0.5rem 1rem 0.5rem 1rem",
    },
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.imageContainer}>
        <img src={image} alt="Course" style={styles.image} />
      </div>
      <div style={styles.courseInfo}>
        <h2 style={styles.courseName}>{courseName}</h2>
        {/* <p style={styles.tutorName}>{tutorName}</p> */}
      </div>
      <div style={styles.priceContainer}>
        <button
          style={styles.ViewCourse}
          onClick={() => {
            navigate(`/start/${id}`);
          }}
        >
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
