import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dash_schedule.css";

function DashSchedule() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    date: "",
    time_start: "",
    time_to: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

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
    const roomCode = Date.now().toString();
    const { course, date, time_start, time_to } = formData;

    // Validate form data
    if (!course) {
      setMessage("Please select a course.");
      return;
    }

    if (time_to <= time_start) {
      setMessage("End time must be after start time.");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time_start}`);
    const now = new Date();
    if (selectedDateTime <= now) {
      setMessage("Please select a future date and time.");
      return;
    }

    setLoading(true); // Start loader

    // Schedule class
    axios
      .post(
        `http://localhost:3000/api/scheduleClass?course=${course}&teacher=${localStorage.getItem(
          "id"
        )}`,
        {
          date,
          time_start,
          time_to,
          roomCode,
        }
      )
      .then((response) => {
        console.log(response);
        setMessage(response.data);
        setFormData({
          course: "",
          date: "",
          time_start: "",
          time_to: "",
        });
      })
      .catch((error) => {
        console.error("Error scheduling class:", error);
        setMessage("Failed to schedule class. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop loader
      });
  };

  return (
    <div className="schedule-class-container">
      <h1>Schedule a Class</h1>
      <form className="schedule-form" onSubmit={handleSubmit}>
        {/* Course Dropdown */}
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

        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]} // Disable past dates
          />
        </div>

        {/* Start Time Input */}
        <div className="form-group">
          <label htmlFor="time_start">Start Time</label>
          <input
            type="time"
            id="time_start"
            name="time_start"
            value={formData.time_start}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Time Input */}
        <div className="form-group">
          <label htmlFor="time_to">End Time</label>
          <input
            type="time"
            id="time_to"
            name="time_to"
            value={formData.time_to}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button with Loader */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? <div className="loader"></div> : "Schedule Class"}
        </button>
      </form>

      {/* Message Display */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DashSchedule;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Dash_schedule.css";

// function DashSchedule() {
//   const [courses, setCourses] = useState([]);
//   const [formData, setFormData] = useState({
//     course: "",
//     date: "",
//     time_start: "",
//     time_to: "",
//   });
//   const [message, setMessage] = useState("");

//   // Fetch courses on component mount
//   useEffect(() => {
//     axios
//       .get(
//         `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
//           "id"
//         )}`
//       )
//       .then((response) => {
//         setCourses(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching courses:", error);
//       });
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const roomCode = Date.now().toString();
//     const { course, date, time_start, time_to } = formData;

//     // Validate form data
//     if (!course) {
//       setMessage("Please select a course.");
//       return;
//     }

//     if (time_to <= time_start) {
//       setMessage("End time must be after start time.");
//       return;
//     }

//     const selectedDateTime = new Date(`${date}T${time_start}`);
//     const now = new Date();
//     if (selectedDateTime <= now) {
//       setMessage("Please select a future date and time.");
//       return;
//     }

//     // Schedule class
//     axios
//       .post(
//         `http://localhost:3000/api/scheduleClass?course=${course}&teacher=${localStorage.getItem(
//           "id"
//         )}`,
//         {
//           date,
//           time_start,
//           time_to,
//           roomCode,
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         setMessage(response.data);
//         setFormData({
//           course: "",
//           date: "",
//           time_start: "",
//           time_to: "",
//         });
//       })
//       .catch((error) => {
//         console.error("Error scheduling class:", error);
//         setMessage("Failed to schedule class. Please try again.");
//       });
//   };

//   return (
//     <div className="schedule-class-container">
//       <h1>Schedule a Class</h1>
//       <form className="schedule-form" onSubmit={handleSubmit}>
//         {/* Course Dropdown */}
//         <div className="form-group">
//           <label htmlFor="course">Select Course</label>
//           <select
//             name="course"
//             id="course"
//             value={formData.course}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Select a course
//             </option>
//             {courses.map((course) => (
//               <option key={course._id} value={course._id}>
//                 {course.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Date Input */}
//         <div className="form-group">
//           <label htmlFor="date">Date</label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             min={new Date().toISOString().split("T")[0]} // Disable past dates
//           />
//         </div>

//         {/* Start Time Input */}
//         <div className="form-group">
//           <label htmlFor="time_start">Start Time</label>
//           <input
//             type="time"
//             id="time_start"
//             name="time_start"
//             value={formData.time_start}
//             onChange={handleChange}
//             required
//             min={new Date().toISOString().split("T")[1].substring(0, 5)} // Disable past times
//           />
//         </div>

//         {/* End Time Input */}
//         <div className="form-group">
//           <label htmlFor="time_to">End Time</label>
//           <input
//             type="time"
//             id="time_to"
//             name="time_to"
//             value={formData.time_to}
//             onChange={handleChange}
//             required
//             min={formData.time_start} // Ensure end time is after start time
//           />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-button">
//           Schedule Class
//         </button>
//       </form>

//       {/* Message Display */}
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }

// export default DashSchedule;
