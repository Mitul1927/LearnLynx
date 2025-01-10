import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { MdChatBubbleOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  // Gemini AI Configuration
  const [geminiAI, setGeminiAI] = useState(null);
  const [chatSession, setChatSession] = useState(null);

  useEffect(() => {
    // Initialize Gemini AI
    const initGeminiAI = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          "AIzaSyDwFuZmqsRfuVxA_vsgTgUeDpHhxdJZMHY"
        );
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `
          You are Rock, a friendly assistant integrated into LearnLynx, a Learning Management System (LMS) that simplifies education and helps people learn to code and more. Your role is to assist users by providing clear, accurate, and professional answers to their queries about LearnLynx.

LearnLynx offers a variety of features that cater to students, teachers, and administrators, helping them manage courses, schedule meetings, track performance, and communicate seamlessly.

Key Features of LearnLynx:

    Course Management: Teachers can create, manage, and assign courses with ease. Navigate to the 'Courses' section to see available courses and manage them.
    Video Conferencing: Teachers can schedule and host live meetings with students. To schedule a live class, go to the 'Meetings' section, click on 'Schedule Meeting,' and select the date and time for the session.
    Assignment Submission: Students can upload and submit assignments. Teachers can grade and provide feedback directly through the platform. Check out the 'Assignments' tab to see and manage submissions.
    Performance Analysis: Teachers and administrators can track student performance with reports and analytics. This feature is accessible in the 'Reports' section.
    Payment Integration: LearnLynx integrates with Razorpay for secure payment processing during course enrollment. Once enrolled, payments can be made securely via Razorpay.
    Student Registration: Students can enroll in specific courses through the 'Register' page. Simply log in and select your desired course.
    Authentication: Secure login system powered by email/password. LearnLynx ensures a smooth and safe login process for all users.
    Responsive Design: LearnLynx is optimized for both desktop and mobile use, ensuring a seamless experience no matter the device.

LearnLynx Pages:

    Home: The homepage offers a quick overview of the latest courses, announcements, and featured content.
    Courses: This section lists all available courses. Students can browse and enroll, while teachers can manage their assigned courses.
    Meetings: Teachers can schedule and manage video conferences here. Students can see upcoming meetings for their enrolled courses.
    Assignments: Students upload assignments here, and teachers review and grade submissions in this section.
    Reports: Teachers and admins can view detailed analytics and student performance reports here.
    Register/Login: Access these pages for account creation or login to start using LearnLynx.

Guidelines for Responding:

    Tone and Style: Be professional, friendly, and clear. Avoid jargon unless requested by the user.
    Accuracy: Stick strictly to LearnLynx’s features and capabilities. Only provide information about the platform.
    Examples: For common queries, provide step-by-step guides. For example, "How do I join a course?" or "How do I schedule a meeting?"
    Error Handling: If a feature is unavailable on LearnLynx, politely inform the user and suggest alternatives where applicable.
    Helpfulness: Always aim to resolve the user’s query effectively. If necessary, suggest contacting support or exploring the FAQ section.

Examples of Queries and Responses:

    User: How do I enroll in a course on LearnLynx?
        AI: To enroll in a course on LearnLynx, log in to your account, navigate to the 'Courses' section, and select the course you want to join. Follow the instructions to complete the registration process. If the course requires payment, you can pay securely via Razorpay.

    User: How do I schedule a live class with students?
        AI: To schedule a live class, go to the 'Meetings' section, click on 'Schedule Meeting,' and set the topic, date, and time. Students enrolled in your course will be able to join the meeting at the scheduled time.

    User: What payment options are available for course registration?
        AI: LearnLynx uses Razorpay for payment processing, which supports various payment methods including credit/debit cards, UPI, net banking, and digital wallets.

    User: How do I reset my password?
        AI: To reset your password, click on the 'Forgot Password' link on the login page, enter your registered email address, and follow the instructions sent to your email.

Special Instructions:

    Clarification: If the user is confused, break down the solution into simple steps.
    Complex Queries: For complex issues, recommend reaching out to LearnLynx support or visiting the FAQ section.
    Feature Suggestions: If a user offers feedback or suggests a new feature, thank them and encourage them to share their input with LearnLynx support.
          `,
        });

        const generationConfig = {
          temperature: 0.5,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        };

        // Start chat session with initial history
        const session = model.startChat({
          generationConfig,
          history: [
            {
              role: "user",
              parts: [{ text: "Hi" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Hi Manan!  What can I help you with today regarding LearnLynx?  Remember to check out our YouTube channel: https://youtube.com/LearnLynx and follow us on Facebook: https://facebook.com/codingmoney.com for more learning resources!\n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "How do I enroll in a course on LearnLynx?" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "That's a great question, Manan!  Because our website, https://learnlynx.com, is still under construction, the exact enrollment process isn't yet live.  However, once the site is launched,  enrollment will be straightforward.  You'll likely need to create an account (if you don't already have one) using your email address. Then, you'll browse the available courses, select the one you're interested in, and follow the on-screen instructions to complete your registration.  Payment, if required, will be securely processed through Razorpay, offering various payment options.  I'll keep you updated as soon as the enrollment feature is available!  In the meantime, you can subscribe to our YouTube channel for updates: https://youtube.com/LearnLynx\n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "Hi" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Hi Manan!  How can I assist you today with LearnLynx?  Don't forget to check out our YouTube channel for helpful tutorials: https://youtube.com/LearnLynx and follow us on Facebook: https://facebook.com/codingmoney.com for updates!\n",
                },
              ],
            },
          ],
        });

        setGeminiAI(model);
        setChatSession(session);
      } catch (error) {
        console.error("Failed to initialize Gemini AI:", error);
        toast.error("Chatbot initialization failed");
      }
    };

    initGeminiAI();

    // Check login status
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    if (localStorage.getItem("Teacher") === "true") {
      setIsTeacher(true);
    }
  }, []);

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
        setIsLoggedIn(false);
        setIsTeacher(false);
        setUserId(null);
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

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && chatSession) {
      // Add user message to chat
      const userMessage = { text: newMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      try {
        // Send message to Gemini AI through chat session
        const result = await chatSession.sendMessage(newMessage);
        const botResponse = result.response.text();

        // Add bot response to chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error getting Gemini response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, I couldn't process your request.", sender: "bot" },
        ]);
      }
    }
  };
  return (
    <>
      <div className="header">
        <div>
          <nav>
            <NavLink className="navlink" to="/">
              Home
            </NavLink>
            <NavLink className="navlink" to="/about">
              Blog
            </NavLink>
            <NavLink className="navlink" to="/all-courses">
              Courses
            </NavLink>
          </nav>
        </div>
        <div className="image">
          <Link to="/">
            <img className="imageshown" src={Logo} alt="project photo" />
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="authentication">
            <Link className="link login" to="/plans">
              Teach on LearnLynx
            </Link>
            {isTeacher ? (
              <Link
                className="link login"
                to={`http://localhost:3001/admin/${id}/dashboard`}
              >
                Dashboard
              </Link>
            ) : (
              <Link className="link login" to="/my-learnings">
                My Learnings
              </Link>
            )}
            <a href="#" className="link login logout" onClick={handleLogout}>
              Logout
            </a>
          </div>
        ) : (
          <div className="authentication">
            <Link className="link login" to="/plans">
              Teach on LearnLynx
            </Link>
            <Link className="link signup" to="/login">
              Login
            </Link>
          </div>
        )}

        <div className="chatbot-btn" onClick={toggleChatbot}>
          <MdChatBubbleOutline size={30} color="currentColor" />
        </div>

        {/* Chatbot Popup */}
        {showChatbot && (
          <div className="chatbot-popup">
            <div className="chatbot-header">
              <div className="chatbot-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M8 3v3M16 3v3M3 10h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Zm18-5a2 2 0 0 1 2 2v3H3V7a2 2 0 0 1 2-2h4Z" />
                </svg>
                Rock - LearnLynx Assistant
              </div>
              <button onClick={toggleChatbot} className="close-chat-btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="chatbot-body">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-msg ${
                    msg.sender === "user" ? "user-msg" : "bot-msg"
                  }`}
                >
                  <div className="msg-content">
                    {msg.sender === "user" ? (
                      <div className="user-icon">👤</div>
                    ) : (
                      <div className="bot-icon">🤖</div>
                    )}
                    <span>{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="chatbot-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything about LearnLynx..."
              />
              <button onClick={handleSendMessage}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Header;
