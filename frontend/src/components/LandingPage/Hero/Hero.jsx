import threedots from "../../../assets/3dots.png";
import leftbottom from "../../../assets/left_bottom_corner.png";
import rectangle2 from "../../../assets/rectangle-2.png";
import rightbottom from "../../../assets/Image.png";
import Programmer from "../../../assets/Programmer.gif.png";
import "./Hero.css";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-container">
        <div className="home2">
          <p className="improve">
            <img className="threedots" src={threedots} alt="threedots" />
            Improve your
          </p>
          <div>
            <p className="skills">Skills </p>
            <p className="faster">Faster</p>
          </div>
          <div className="web-dev">
            <p className="web">Web Dev</p>
            <p className="dsa">DSA</p>
            <p className="java">JAVA</p>
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/all-courses");
              }}
              className="enroll-btn-hero"
            >
              <p className="enroll-hero">
                Enroll Now <span className="arrow-hero">→</span>
              </p>
            </button>
          </div>
          <img className="left-bottom" src={leftbottom} alt="leftbottom" />
        </div>
        <div className="home3">
          <p className="learning-line">
            A Learning Platform That Is Sharp, Agile, And Efficient In Helping
            Users Gain knowledge And Skills Quickly And Effectively.
          </p>
          <img className="rectangle-2" src={rectangle2} alt="rectangle2" />
          <img className="right-bottom" src={rightbottom} alt="" />
        </div>
      </div>

      <div className="matrix">
        <div className="div">
          <p className="para">4.5</p> <p className="para2">80K Reviews</p>
        </div>
        <div className="div">
          <p className="para">50M</p> <p className="para2">Enrollments</p>
        </div>
        <div className="div">
          <p className="para">2M+</p> <p className="para2">Learners</p>
        </div>
        <div>
          <p className="para">1K+</p> <p className="para2">Popular Courses</p>
        </div>
      </div>
      <div className="education">
        <div className="img">
          <img src={Programmer} alt="" />
        </div>
        <div className="right-div">
          <p className="provide">We Provide</p>
          <p className="online">
            {" "}
            <span className="smart">Smart</span> Online
          </p>
          <p className="edu">Education</p>
          <p className="combine">
            Our Courses Come With Assigned Projects, Direct Interactions With
            Mentors, Relevant Resources, And Tools That Help You Dive Into
            In-Depth Learning From Anywhere.
          </p>
        </div>
      </div>
    </>
  );
}
