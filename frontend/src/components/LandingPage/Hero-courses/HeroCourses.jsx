import Card from "../../utils/Cards/LandingPageCards/Card.jsx";
import "./HeroCourses.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleExploreClick = () => {
    window.scrollTo(0, 0); // Scroll to the top
    navigate("/all-courses"); // Navigate to the new route
  };

  return (
    <>
      <div className="page3">
        <p className="popular">
          Popular <span className="courses">Courses</span>
        </p>
        <div className="container2">
          {courses.slice(0, 3).map((course) => (
            <Card
              key={course._id} // Add a unique key for each card
              title={course.title}
              image={course.img}
              dispr={course.discountPrice}
              price={course.price}
              id={course._id}
            />
          ))}
        </div>
        <button className="explore-btn" onClick={handleExploreClick}>
          <p className="explore">
            Explore <span className="explore-arrow">→</span>
          </p>
        </button>
      </div>
    </>
  );
}
