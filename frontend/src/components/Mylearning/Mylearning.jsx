import "./mylearning.css";
import CourseCard from "../utils/Cards/mylearningcard/Card";
import { useState, useEffect } from "react";
import axios from "axios"; // Add this import

export default function Mylearning() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/mylearning?auth=${localStorage.getItem(
            "id"
          )}`
        );
        console.log(response);
        setCourses(response.data.mylearning || []); // Set as an empty array if no courses are returned
      } catch (error) {
        setError("Failed to fetch courses. Please try again later.");
        // console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="mylearningcontainer">
        <h1 className="myLearning-header">My Learnings</h1>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error if any */}
        <div>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard
                key={index}
                id={course._id}
                image={course.img}
                courseName={course.title}
              />
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      </div>
    </>
  );
}
