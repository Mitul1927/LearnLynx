import { useEffect, useRef, useState } from "react";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Forgot Password State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const[backOtp,setBackOtp]=useState("");

  // Handle Login Form Change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle SignUp Form Change
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  // Handle SignUp Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Password And Confirm Password Not Matched");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
      });

      if (response.data.statusCode === 400) {
        toast.error(response.data.message);
      } else {
        toast.success("User Registered Successfully");
        setSignUpData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`);
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
        { withCredentials: true }
      );

      if (response.data.statusCode === 400) {
        toast.error(response.data.message);
      } else {
        toast.success("Welcome To LearnLynx");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user._id);
        localStorage.setItem("Teacher", response.data.user.isTeacher);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);
        setTimeout(() => {
          navigate("/my-learnings");
        }, 1500);

        setLoginData({
          email: "",
          password: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error(`Network error: ${error.message}`);
      toast.error(`Network error: ${error.message}`);
    }
  };

  // Forgot Password Flow Handlers
  const openForgotPassword = () => {
    setShowForgotPassword(true);
    setForgotPasswordStep(1);
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleNextStep = async() => {
    
    if (forgotPasswordStep === 1 && email) {
      const response = await axios.post("http://localhost:3000/api/verifyEmail",{email});
      setBackOtp(response.data);
      setForgotPasswordStep(2);
    } else if (forgotPasswordStep === 2 && backOtp==otp) {
      setForgotPasswordStep(3);
    }
  };



  const handleResetPassword = async() => {
    if (newPassword === confirmNewPassword) {
      const response = await axios.post("http://localhost:3000/api/resetPassword",{email,newPassword});
      // toast.success("Password reset successfully!");
      closeForgotPassword();
    } else {
      toast.error("Passwords do not match.");
    }
  };

  const LoginWithGoogle = () => {
    window.location.href = "http://localhost:3000/api/auth/logingoogle";
  };


  // Create a ref to hold references to OTP input fields
  const otpRefs = useRef([]);

  // Handle OTP input change, only allow numeric input
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers (0-9)
    if (/[^0-9]/.test(value)) {
      return;
    }

    // Update OTP value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));
  };

  // Auto-focus next input field after digit is entered
  const handleKeyUp = (e, index) => {
    // If a digit is entered, focus the next input
    if (/^\d$/.test(e.target.value)) {
      const nextIndex = index + 1;
      if (nextIndex < 4) {
        otpRefs.current[nextIndex].focus();
      }
    }
  };

  return (
    <>
      <div className="loginSignupMain">
        <input type="checkbox" id="loginSignupChk" aria-hidden="true" />

        {/* Sign Up Form */}
        <div className="loginSignupSignup">
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="loginSignupChk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="username"
              placeholder="User name"
              required
              className="loginSignupInput"
              value={signUpData.username}
              onChange={handleSignUpChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="loginSignupInput"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="loginSignupInput"
              value={signUpData.password}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="loginSignupInput"
              value={signUpData.confirmPassword}
              onChange={handleSignUpChange}
            />
            <button className="loginSignupButton signupbutton" type="submit">
              Sign up
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="loginSignupLogin">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="loginSignupChk" aria-hidden="true">
              Login
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              className="loginSignupInput"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="loginSignupInput"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <button className="loginSignupButton" type="submit">
              Login
            </button>
          </form>

          <div className="LoginGoogle">
            <button className="lgbtn" onClick={LoginWithGoogle}>
              <FcGoogle size={20} />
              Login with Google
            </button>
          </div>
          <div className="forgotBTN">
            <button
              type="button"
              className="forgotPasswordBtn"
              onClick={openForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modals */}
      {showForgotPassword && (
        <div className={`modalOverlay ${showForgotPassword ? "active" : ""}`}>
          <div className="modalContent">
            {forgotPasswordStep === 1 && (
              <div>
                <h3>Enter Your Email</h3>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleNextStep}>Next</button>
                <button onClick={closeForgotPassword} className="closeBtn">
                  Close
                </button>
              </div>
            )}

            {forgotPasswordStep === 2 && (
              <div className="otp-modal">
                <h3>Enter OTP</h3>
                <div className="otp-inputs">
                  {Array(4)
                    .fill("")
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        placeholder="0"
                        value={otp[index] || ""}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyUp={(e) => handleKeyUp(e, index)} // Auto-focus next input
                        className="otp-input"
                        ref={(el) => (otpRefs.current[index] = el)} // Reference to input fields
                      />
                    ))}
                </div>
                <button onClick={handleNextStep} className="otp-btn">
                  Next
                </button>
                <button onClick={closeForgotPassword} className="closeBtn">
                  Close
                </button>
              </div>
            )}

            {forgotPasswordStep === 3 && (
              <div>
                <h3>Reset Password</h3>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button onClick={handleResetPassword}>Reset Password</button>
                <button onClick={closeForgotPassword} className="closeBtn">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
      />
    </>
  );
}

// import { useState } from "react";
// import "./Login.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [signUpData, setSignUpData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   const handleSignUpChange = (e) => {
//     const { name, value } = e.target;
//     setSignUpData({ ...signUpData, [name]: value });
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     if (signUpData.password !== signUpData.confirmPassword) {
//       toast.error("Password And Confirm Password Not Matched");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/api/signup", {
//         username: signUpData.username,
//         email: signUpData.email,
//         password: signUpData.password,
//       });

//       if (response.data.statusCode === 400) {
//         const message = response.data.message;
//         console.log(message);
//         toast.error(message);
//       } else {
//         toast.success("User Registered Successfully");
//         setSignUpData({
//           username: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         });
//       }
//     } catch (error) {
//       toast.error(`Network error: ${error.message}`);
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/login",
//         {
//           email: loginData.email,
//           password: loginData.password,
//         },
//         { withCredentials: true } // Ensure cookies are included
//       );

//       if (response.data.statusCode === 400) {
//         const message = response.data.message;
//         toast.error(message);
//       } else {
//         toast.success("Welcome To LearnLynx");
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("id", response.data.user._id);
//         localStorage.setItem("Teacher", response.data.user.isTeacher);
//         localStorage.setItem("username", response.data.user.username);
//         localStorage.setItem("email", response.data.user.email);
//         setTimeout(() => {
//           navigate("/my-learnings");
//         }, 1500);

//         setLoginData({
//           email: "",
//           password: "",
//         });
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error(`Network error: ${error.message}`);
//       toast.error(`Network error: ${error.message}`);
//     }
//   };

//   const LoginWithGoogle = () => {
//     window.location.href = "http://localhost:3000/api/auth/logingoogle";
//   };

//   return (
//     <>
//       <div className="loginSignupMain">
//         <input type="checkbox" id="loginSignupChk" aria-hidden="true" />

//         <div className="loginSignupSignup">
//           <form onSubmit={handleSignupSubmit}>
//             <label htmlFor="loginSignupChk" aria-hidden="true">
//               Sign up
//             </label>
//             <input
//               type="text"
//               name="username"
//               placeholder="User name"
//               required
//               className="loginSignupInput"
//               value={signUpData.username}
//               onChange={handleSignUpChange}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               className="loginSignupInput"
//               value={signUpData.email}
//               onChange={handleSignUpChange}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               className="loginSignupInput"
//               value={signUpData.password}
//               onChange={handleSignUpChange}
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               required
//               className="loginSignupInput"
//               value={signUpData.confirmPassword}
//               onChange={handleSignUpChange}
//             />
//             <button className="loginSignupButton signupbutton" type="submit">
//               Sign up
//             </button>
//           </form>
//         </div>

//         <div className="loginSignupLogin">
//           <form onSubmit={handleLoginSubmit}>
//             <label htmlFor="loginSignupChk" aria-hidden="true">
//               Login
//             </label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               required
//               className="loginSignupInput"
//               value={loginData.email}
//               onChange={handleLoginChange}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               className="loginSignupInput"
//               value={loginData.password}
//               onChange={handleLoginChange}
//             />
//             <button className="loginSignupButton" type="submit">
//               Login
//             </button>
//           </form>
//           <div className="LoginGoogle">
//             <button className="lgbtn" onClick={LoginWithGoogle}>
//               <FcGoogle size={20} />
//               Login with Google
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer
//         position="bottom-right"
//         autoClose={1000} // Close after 1 second
//         hideProgressBar={false}
//       />
//     </>
//   );
// }
