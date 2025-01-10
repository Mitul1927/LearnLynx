import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import "./Success.css";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [userd, setUser] = useState({});
  const [showPopup, setShowPopup] = useState(false); // For success popup
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token") || "";

    if (token) {
      localStorage.setItem("token", token);

      const fetchUser = async () => {
        try {
          const res = await fetch(
            "http://localhost:3000/api/verifyusergoogle",
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              method: "GET",
            }
          );
          const data = await res.json();
          localStorage.setItem("id", data.user._id);
          localStorage.setItem("Teacher", data.user.isTeacher ? true : false);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("username", data.user.username);
          setUser(data.user);
          setShowPopup(true); 
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1000);
        } catch (error) {
          navigate("/login");
        }
      };

      fetchUser();
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <>
      {showPopup && (
        <div className="successPopup">
          <div className="popupContent">
            <FcGoogle className="googleIcon" />
            <h2>Welcome!</h2>
            <p>You’ve successfully logged in with Google.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Success;


