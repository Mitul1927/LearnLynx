import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Import the xlsx library
import "./Dash_student.css";

function Dash_students() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
          "id"
        )}`
      );
      setCourses(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchStudents = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
          "id"
        )}`
      );

      const selectedCourseData = response.data.find(
        (course) => course._id === courseId
      );

      if (selectedCourseData) {
        setStudents(selectedCourseData.students || []);
      } else {
        setStudents([]);
        console.warn("No course found with the given ID.");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    if (courseId) fetchStudents(courseId);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      students.map((student) => ({
        "Student Name": student.username,
        Email: student.email,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students_data.xlsx");
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="dash-students-container">
      <h1 className="dash-students-title">Student Information Table</h1>

      <div className="dash-students-dropdown">
        <label htmlFor="course-select" className="dash-students-label">
          Select a Course:
        </label>
        <select
          id="course-select"
          value={selectedCourse}
          onChange={handleCourseChange}
          className="dash-students-select"
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="dash-students-table-container">
        {students.length > 0 ? (
          <>
            <button onClick={handleExportToExcel} className="export-btn">
              Export to Excel
            </button>
            <table className="dash-students-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.username}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="dash-students-no-data">
            No students available for the selected course.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dash_students;
