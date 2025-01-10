import React, { useEffect, useState } from "react";
import "./Heroplans.css";
import personstanding from "../../../assets/two-person-standing.png";
import teaching from "../../../assets/teaching.png.png";
import rabbitEar from "../../../assets/rabbit-ear.png";
import rabbitflower from "../../../assets/rabbit-flower.png";
import { useNavigate } from "react-router-dom";

export default function HeroPlans() {
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const rabbitSection = document.querySelector(".page5-div2");
      const sectionTop = rabbitSection.getBoundingClientRect().top;
      const triggerHeight = window.innerHeight / 1.3; // Adjust this value as needed

      if (sectionTop < triggerHeight) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="page4">
        <p className="page4-potential">Unlock the Full Potential of</p>
        <div className="page4-flex">
          <div className="page4-left">
            <p className="page4-learnlynx">LearnLynx!</p>
            <p className="page4-one-content">
              Explore LearnLynx's flexible plans tailored for every educator!
              Choose from affordable packages, whether you're a solo teacher or
              part of a big institution. Find the perfect plan and start sharing
              your expertise today!
            </p>
            <button className="page4-btn">
              <p className="page4-btn-content">
                View Plans & Pricing<span className="page4-arrow">→</span>
              </p>
            </button>
          </div>
          <div>
            <img
              className="person-standing"
              src={personstanding}
              alt="two person standing"
            />
          </div>
        </div>
      </div>
      <div className="page5-container">
        <div className="page5-div1 page5-col">
          <div>
            <img src={teaching} alt="" />
          </div>
          <div className="page5-col2">
            <p className="page5-ready">
              Get <i>Ready</i> To Started
            </p>
            <p className="page5-dinner">
              After One Good Dinner Any One Can Forgive Anybody, Even One's Own
              Relations.
            </p>
            <button
              className="page5-order"
              onClick={() => {
                navigate("/all-courses");
              }}
            >
              Order Now <span className="page5-arrow">→</span>
            </button>
          </div>
        </div>
        <div className={`page5-div2 page5-col ${isInView ? "animate" : ""}`}>
          <p className="page5-learning">Try Learning Free</p>
          <p className="page5-on">
            On <span className="page5-mobile">Mobile App</span>
          </p>
          <img className="rabbitear" src={rabbitEar} alt="" />
          <img className="rabbitflower" src={rabbitflower} alt="" />
        </div>
      </div>
      <div className="page6-buttons">
        <div>
          <button className="page6-btn">
            <div className="page6button-col1">
              <div>
                <i className="fa-brands fa-google-play color"></i>
              </div>
              <div>
                <p className="page6-para">Get it on</p>
                <p className="page6-para page6-googleplay">Google Play</p>
              </div>
            </div>
          </button>
        </div>
        <div>
          <button className="page6-btn">
            <div className="page6button-col1">
              <div>
                <i className="fa-brands fa-apple color"></i>
              </div>
              <div>
                <p className="page6-para">Download On the</p>
                <p className="page6-para page6-appstore">App Store</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

// import "./HeroPlans.css";
// import personstanding from "../../../assets/two-person-standing.png";
// import teaching from "../../../assets/teaching.png.png";
// import rabbitEar from "../../../assets/rabbit-ear.png";
// import rabbitflower from "../../../assets/rabbit-flower.png";

// export default function HeroPlans() {
//   return (
//     <>
//       <div className="page4">
//         <p className="potential">Unlock the Full Potential of</p>
//         <div className="page4-flex">
//           <div>
//             <p className="page4-learnlynx">LearnLynx!</p>
//             <p className="page4-one-content">
//               Explore LearnLynx's flexible plans tailored for every educator!
//               Choose from affordable packages, whether you're a solo teacher or
//               part of a big institution. Find the perfect plan and start sharing
//               your expertise today!
//             </p>
//             <button className="page4-btn">
//               <p className="page4-btn-content">
//                 View Plans & Pricing<span className="page4-arrow">→</span>
//               </p>
//             </button>
//           </div>
//           <div>
//             <img
//               className="person-standing"
//               src={personstanding}
//               alt="two person standing"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="page5-container">
//         <div className="page5-div1 page5-col">
//           <div>
//             <img src={teaching} alt="" />
//           </div>
//           <div className="page5-col2">
//             <p className="page5-ready">
//               Get <i>Ready</i> To Started
//             </p>
//             <p className="page5-dinner">
//               After One Good Dinner Any One Can Forgive Anybody, Even One's Own
//               Relations.
//             </p>
//             <button className="page5-order">
//               Order Now <span className="page5-arrow">→</span>
//             </button>
//           </div>
//         </div>
//         <div className="page5-div2 page5-col">
//           <p className="page5-learning">Try Learning Free</p>
//           <p className="page5-on">
//             On <span className="page5-mobile">Mobile App</span>
//           </p>
//           <img className="rabbitear" src={rabbitEar} alt="" />
//           <img className="rabbitflower" src={rabbitflower} alt="" />
//         </div>
//       </div>
//       <div className="page6-buttons">
//         <div>
//           <button className="page6-btn">
//             <div className="page6button-col1">
//               <div>
//                 <i className="fa-brands fa-google-play color"></i>
//               </div>
//               <div>
//                 <p className="page6-para">Get it on</p>
//                 <p className="page6-para page6-googleplay">Google Play</p>
//               </div>
//             </div>
//           </button>
//         </div>
//         <div>
//           <button className="page6-btn">
//             <div className="page6button-col1">
//               <div>
//                 <i className="fa-brands fa-apple color"></i>
//               </div>
//               <div>
//                 <p className="page6-para">Download On the</p>
//                 <p className="page6-para page6-appstore">App Store</p>
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
