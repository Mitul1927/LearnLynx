import certificate from "../../../assets/certificate.png.png";
import stairs from "../../../assets/stairs.png";
import seeinglaptop from "../../../assets/seeing-laptop.png";
import laptopfiles from "../../../assets/laptop-files.png";
import "./HeroFeatures.css";
export default function HeroFeatures() {
  return (
    <div className="grid-container">
      <div className="row-1-col-1 column">
        <p className="our">
          {/* <img src={threedots} alt="" /> */}
          Our <span className="features">Features</span>
        </p>
        <p className="our">Special For You.</p>
        <br />
        <br />
        <button className="all-features-btn">
          <p className="all-features">See All Features</p>
        </button>
      </div>
      <div className="row-1-col-2 column black">
        <p className="certificate-para">
          <img className="img" src={certificate} alt="certificate" />
        </p>
        <p className="certificate">Get Certificate</p>
        <div className="content">
          <p>Add Value to the certificates </p>
          <p>and increase your chances of</p>
          <p>getting hired in your dream job.</p>
        </div>
      </div>
      <div className="row-2">
        <div className="row-2-col column black">
          <p className="stairs-para">
            <img className="stairs" src={stairs} alt="stairs" />
          </p>
          <p className="instructor">Amazing Instructor</p>
          <div className="content2">
            <p>Our Amazing Instructor Bring</p>
            <p>Experience, Knowledge And Fun</p>
            <p>On The Table.</p>
          </div>
        </div>
        <div className="row-2-col column black">
          <p className="see-laptop-para">
            <img className=" see-laptop" src={seeinglaptop} alt="" />
          </p>
          <p className="life-time-support">Life Time Support</p>
          <div className="content3">
            <p>You Will Have Lifetime Access</p>
            <p>Of The Courses And Resourses.</p>
            <p>Also Contacting Instructors Any Time!</p>
          </div>
        </div>
        <div className="row-2-col column black">
          <p className="see-laptop-para">
            <img className="laptop-files" src={laptopfiles} alt="" />
          </p>
          <p className="life-time-support">Video Lessons</p>
          <div className="content3">
            <p>Recorded Version Of Lectures</p>
            <p>From Professional Instructors To</p>
            <p>Boost Your Growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
