import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import "./Dash_nav.css";
import Logo from "../assets/logo.png";
import { toast, ToastContainer} from "react-toastify";

// React Icons
import {
  FaThLarge,
  FaThList,
  FaUserGraduate,
  FaCalendarAlt,
  FaVideo,
  FaCommentAlt,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

function Dash_nav() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      const data = await response.json();

      if (data.success) {

        
        localStorage.removeItem("token");
        localStorage.removeItem("Teacher");
        localStorage.removeItem("id");
        toast.success("Successfully logged out");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error("Logout error:", error);
    }
  };


  return (
    <div className="dashboard-navbar2">
      <div className="dashboard-navbar-logo">
        <img src={Logo} alt="logo" />
        <h1>LearnLynx</h1>
      </div>
      <div className="dashboard-navbar-links">
        <NavLink
          to={`/admin/${id}/dashboard`}
          className={({ isActive }) =>
            isActive
              ? "dashboard-navbar-navlink active"
              : "dashboard-navbar-navlink"
          }
        >
          <p className="dashboard-navbar-link">
            <FaThLarge className="dashboard-icon" />
            Dashboard
          </p>
        </NavLink>
        <NavLink
          to={`/admin/${id}/mycourses`}
          className={({ isActive }) =>
            isActive
              ? "dashboard-navbar-navlink active"
              : "dashboard-navbar-navlink"
          }
        >
          <p className="dashboard-navbar-link">
            <FaThList className="dashboard-icon" />
            My Courses
          </p>
        </NavLink>
        <NavLink
          to={`/admin/${id}/students`}
          className={({ isActive }) =>
            isActive
              ? "dashboard-navbar-navlink active"
              : "dashboard-navbar-navlink"
          }
        >
          <p className="dashboard-navbar-link">
            <FaUserGraduate className="dashboard-icon" />
            Students
          </p>
        </NavLink>
        <NavLink
          to={`/admin/${id}/schedule`}
          className={({ isActive }) =>
            isActive
              ? "dashboard-navbar-navlink active"
              : "dashboard-navbar-navlink"
          }
        >
          <p className="dashboard-navbar-link">
            <FaCalendarAlt className="dashboard-icon" />
            Schedule
          </p>
        </NavLink>
        <NavLink
          to={`/admin/${id}/liveclass`}
          className={({ isActive }) =>
            isActive
              ? "dashboard-navbar-navlink active"
              : "dashboard-navbar-navlink"
          }
        >
          <p className="dashboard-navbar-link">
            <FaVideo className="dashboard-icon" />
            Live Class
          </p>
        </NavLink>
        <NavLink
          to={`/admin/${id}/chat`}
          className={({ isActive }) =>
            isActive
              ? "dashboard-navbar-navlink active"
              : "dashboard-navbar-navlink"
          }
        >
          <p className="dashboard-navbar-link">
            <FaCommentAlt className="dashboard-icon" />
            Chat
          </p>
        </NavLink>
        <NavLink
          to={`/admin/${id}/notify`}
          className={({ isActive }) =>
            isActive
              ? "dashboard-navbar-navlink active"
              : "dashboard-navbar-navlink"
          }
        >
          <p className="dashboard-navbar-link">
            <FaBell className="dashboard-icon" />
            Notify
          </p>
        </NavLink>
      </div>
      <div>
        <button className="navbar-button" onClick={handleLogout}>
          <FaSignOutAlt className="dashboard-icon" />
          <p>Log Out</p>
        </button>
      </div>
    </div>
  );
}

export default Dash_nav;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Dash_nav.css";
// import Logo from "../assets/logo.png";
// import Dashboard from "../assets/dashboard.png";
// import Mycourses from "../assets/mycourses.png";
// import Students from "../assets/students.png";
// import Schedule from "../assets/Schedule.png";
// import Liveclass from "../assets/liveclass.png";
// import Chat from "../assets/chat.png";
// import Myaccount from "../assets/myaccount.png";
// import Notify from "../assets/notify.png";
// import Logout from "../assets/logout.png";
// import Notify2 from "../assets/notify2.png";
// import Dashboard2 from "../assets/Dashboard2.png";
// import Mycourses2 from "../assets/mycourses2.png";
// import Students2 from "../assets/students2.png";
// import Schedule2 from "../assets/schedule2.png";
// import Liveclass2 from "../assets/liveclass2.png";
// import Chat2 from "../assets/chat2.png";

// function Dash_nav() {
//   const id = localStorage.getItem("id");

//   return (
//     <div className="dashboard-navbar2">
//       <div className="dashboard-navbar-logo">
//         <img src={Logo} alt="logo" />
//         <h1>LearnLynx</h1>
//       </div>
//       <div className="dashboard-navbar-links">
//         <NavLink
//           to={`/admin/${id}/dashboard`}
//           className={({ isActive }) =>
//             isActive
//               ? "dashboard-navbar-navlink active"
//               : "dashboard-navbar-navlink"
//           }
//         >
//           {({ isActive }) => (
//             <p className="dashboard-navbar-link">
//               <img
//                 src={isActive ? Dashboard2 : Dashboard}
//                 alt="dashboard"
//                 className="dashboard"
//               />
//               Dashboard
//             </p>
//           )}
//         </NavLink>
//         <NavLink
//           to={`/admin/${id}/mycourses`}
//           className={({ isActive }) =>
//             isActive
//               ? "dashboard-navbar-navlink active"
//               : "dashboard-navbar-navlink"
//           }
//         >
//           {({ isActive }) => (
//             <p className="dashboard-navbar-link">
//               <img src={isActive ? Mycourses2 : Mycourses} alt="my courses" />
//               My Courses
//             </p>
//           )}
//         </NavLink>
//         <NavLink
//           to={`/admin/${id}/students`}
//           className={({ isActive }) =>
//             isActive
//               ? "dashboard-navbar-navlink active"
//               : "dashboard-navbar-navlink"
//           }
//         >
//           {({ isActive }) => (
//             <p className="dashboard-navbar-link">
//               <img src={isActive ? Students2 : Students} alt="students" />
//               Students
//             </p>
//           )}
//         </NavLink>
//         <NavLink
//           to={`/admin/${id}/schedule`}
//           className={({ isActive }) =>
//             isActive
//               ? "dashboard-navbar-navlink active"
//               : "dashboard-navbar-navlink"
//           }
//         >
//           {({ isActive }) => (
//             <p className="dashboard-navbar-link">
//               <img src={isActive ? Schedule2 : Schedule} alt="schedule" />
//               Schedule
//             </p>
//           )}
//         </NavLink>
//         <NavLink
//           to={`/admin/${id}/liveclass`}
//           className={({ isActive }) =>
//             isActive
//               ? "dashboard-navbar-navlink active"
//               : "dashboard-navbar-navlink"
//           }
//         >
//           {({ isActive }) => (
//             <p className="dashboard-navbar-link">
//               <img src={isActive ? Liveclass2 : Liveclass} alt="live class" />
//               Live Class
//             </p>
//           )}
//         </NavLink>
//         <NavLink
//           to={`/admin/${id}/chat`}
//           className={({ isActive }) =>
//             isActive
//               ? "dashboard-navbar-navlink active"
//               : "dashboard-navbar-navlink"
//           }
//         >
//           {({ isActive }) => (
//             <p className="dashboard-navbar-link">
//               <img src={isActive ? Chat2 : Chat} alt="chat" />
//               Chat
//             </p>
//           )}
//         </NavLink>
//         <NavLink
//           to={`/admin/${id}/notify`}
//           className={({ isActive }) =>
//             isActive
//               ? "dashboard-navbar-navlink active"
//               : "dashboard-navbar-navlink"
//           }
//         >
//           <p className="dashboard-navbar-link">
//             <img src={Notify} alt="my account" />
//             Notify
//           </p>
//         </NavLink>
//       </div>
//       <div>
//         <button className="navbar-button">
//           <img src={Logout} alt="logout" /> <p>Log Out</p>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dash_nav;
