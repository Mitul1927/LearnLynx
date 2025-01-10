import React, { useState, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  Bell,
  BookOpen,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./StudentDashboard.css";
import axios from "axios";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [notices, setNotices] = useState([]);
  const username = localStorage.getItem("username") || "Student";
  const { id } = useParams();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchUpcomingClasses = async () => {
      try {
        const response = await axios.get(`/api/Upcomingclasses?course=${id}`);
        const parsedClasses = response.data.map((classItem) => ({
          ...classItem,
          date: new Date(classItem.date),
        }));
        setClasses(parsedClasses);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };

    const fetchNotices = async () => {
      try {
        const response = await axios.get(`/api/getNotice?course=${id}`);
        setNotices(response.data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    };

    fetchUpcomingClasses();
    fetchNotices();
  }, [id]);

  const joinMeeting = (roomCode) => {
    const appID = 1731996383;
    const serverSecret = "07bf73fbdd4291dc94114777d2d2d975";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomCode,
      Date.now().toString(),
      `${localStorage.getItem("username")}`
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.getElementById("zego-cloud-container"),
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
    });
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)} className="nav-button">
            <ChevronLeft size={20} />
          </button>
          <h2>
            {currentDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={() => changeMonth(1)} className="nav-button">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}

          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty"></div>
          ))}

          {[...Array(daysInMonth)].map((_, index) => {
            const date = new Date(year, month, index + 1);
            const hasClasses = classes.some((classItem) =>
              isSameDay(classItem.date, date)
            );

            return (
              <div
                key={index + 1}
                className={`calendar-day ${
                  isSameDay(date, selectedDate) ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {index + 1}
                {hasClasses && (
                  <div className="class-dot-container">
                    <span className="class-dot"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderClassList = () => {
    const todayClasses = classes.filter((classItem) =>
      isSameDay(classItem.date, selectedDate)
    );

    return (
      <div className="class-list-container">
        <h3 className="class-list-title">
          Classes on{" "}
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
        {todayClasses.length === 0 ? (
          <div className="no-classes">
            <p>No classes scheduled for this date</p>
          </div>
        ) : (
          <div className="class-list">
            {todayClasses.map((classItem) => (
              <div key={classItem._id} className="class-item">
                <div className="class-time">
                  <Clock size={20} />
                  <span>{classItem.time_start}</span>
                </div>
                <div className="class-details">
                  <h4>{classItem.course.title}</h4>
                </div>
                <button
                  className="join-meeting-button-unique"
                  onClick={() => joinMeeting(classItem.roomCode)}
                >
                  Join Meeting
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderNotices = () => (
    <div className="notices-container-unique">
      <h2>Notices</h2>
      {notices.length === 0 ? (
        <div className="no-notices">
          <p>No notices available</p>
        </div>
      ) : (
        notices.map((notice) => (
          <div key={notice._id} className="notice-item notice-card">
            <div className="notice-icon">
              <Bell size={20} />
            </div>
            <div className="notice-content">
              <h4>{notice.title}</h4>
              <p className="notice-description">
                <strong>Notice:</strong> {notice.notice}
              </p>
              <span className="notice-description">
                <strong>Date:</strong>{" "}
                {new Date(notice.createdAt).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  // second: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "classes":
        return (
          <>
            {renderCalendar()}
            {renderClassList()}
          </>
        );
      case "chat":
        return (
          <div className="placeholder-content">
            Chat functionality coming soon!
          </div>
        );
      case "notice":
        return renderNotices();
      case "resources":
        return (
          <div className="placeholder-content">
            Course resources will be available here.
          </div>
        );
      default:
        return (
          <div className="placeholder-content">
            Select a tab to view its content.
          </div>
        );
    }
  };

  return (
    <div className="dashboard-unique">
      <nav className="navbar-unique">
        <h2 className="navbar-title">
          {getGreeting()}, {username}!
        </h2>
        <div className="navbar-tabs">
          <button
            className={`tab-button ${activeTab === "classes" ? "active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            <Calendar size={16} /> Scheduled Classes
          </button>
          <button
            className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageCircle size={16} /> Chat
          </button>
          <button
            className={`tab-button ${activeTab === "notice" ? "active" : ""}`}
            onClick={() => setActiveTab("notice")}
          >
            <Bell size={16} /> Notice
          </button>
          <button
            className={`tab-button ${
              activeTab === "resources" ? "active" : ""
            }`}
            onClick={() => setActiveTab("resources")}
          >
            <BookOpen size={16} /> Resources
          </button>
        </div>
      </nav>
      {/* <header className="dashboard-header-unique">
        <p></p>
      </header> */}
      <main className="dashboard-content">
        <div className="classes-container">{renderContent()}</div>
      </main>
    </div>
  );
};

export default StudentDashboard;
