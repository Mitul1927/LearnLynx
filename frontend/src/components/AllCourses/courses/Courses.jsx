import CourseCard from "../cards/Card";
import "../AllCourses.css";
import "./Courses.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(()=>{
    setUserId(localStorage.getItem("id"))
  },[])
  

  // Fetch courses and user ID on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await axios.get("http://localhost:3000/api/admin/courses");
        setCourses(coursesResponse.data);
        if (coursesResponse.status!=200) {
          throw new Error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="App">
      <div className="course-grid">
        {courses.map((course) => {
          // Check if the current user is enrolled in the course
          const isEnrolled = userId && course.students.includes(userId);

          // Check if the current user is the owner of the course
          const teachercourse = userId === course.owner._id;

          return (
            <CourseCard
              key={course._id}
              title={course.title}
              image={course.img}
              discount_price={course.discountPrice}
              price={course.price}
              id={course._id}
              owner={course.owner.username}
              isEnrolled={isEnrolled} // Pass isEnrolled prop to CourseCard
              teachercourse={teachercourse} // Pass teachercourse prop to CourseCard
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;

