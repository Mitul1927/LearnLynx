import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dash_Notify.css";

function Dash_Notify() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    title: "",
    notice: "",
  });
  const [message, setMessage] = useState("");

  // Fetch courses on component mount
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { course, title, notice } = formData;

    if (!course || !title || !notice) {
      setMessage("Please fill out all fields.");
      return;
    }

    axios
      .post(`http://localhost:3000/api/postNotice?course=${course}`, {
        title,
        notice,
      })
      .then((response) => {
        setMessage(response.data);
        setFormData({ course: "", title: "", notice: "" });
      })
      .catch((error) => {
        console.error("Error posting notice:", error);
        setMessage("Failed to post notice. Please try again.");
      });
  };

  return (
    <div className="post-notice-container">
      <h1>Post Notice to Students</h1>
      <form className="post-notice-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="course">Select Course</label>
          <select
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title of Notice</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter the title of the notice"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notice">Notice</label>
          <textarea
            name="notice"
            id="notice"
            value={formData.notice}
            onChange={handleChange}
            required
            placeholder="Enter your notice here"
            rows="6"
          />
        </div>

        <button type="submit" className="submit-button">
          Post Notice
        </button>
      </form>

      {message && (
        <p className={`message ${message.includes("Failed") ? "error" : ""}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Dash_Notify;
