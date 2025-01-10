import React, { useEffect, useState } from "react";
import "./Footer.css";
import logo from "../../assets/logo-learnlynx.png";

export default function Footer() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".foot");
      const footerTop = footer.getBoundingClientRect().top;
      const triggerHeight = window.innerHeight / 1.3; // Adjust this value as needed

      if (footerTop < triggerHeight) {
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
      <div className={`footer ${isInView ? "animate-footer" : ""}`}>
        <div className="foot">
          <div className="foot-div1">
            <div>
              <p className="foot-learnlynx">
                <img className="logo" src={logo} alt="LearnLynx" />
                LearnLynx
              </p>
              <div className="foot-left">
                <p className="foot-para">
                  Speed Up The Skill Acquisition Process By
                </p>
                <p className="foot-para">
                  Finding Unlimited Courses That Matches Your{" "}
                </p>
                <p className="foot-para">Niche.</p>
              </div>
            </div>
            <div>
              <table className="foot-table" cellSpacing="5" cellPadding="10">
                <tr>
                  <th className="foot-header">Company</th>
                  <th className="foot-header">Resources</th>
                  <th className="table-product foot-header">Product</th>
                </tr>
                <tr>
                  <td className="footer-td">About us</td>
                  <td className="footer-td">Blog</td>
                  <td className="footer-td">Pricing</td>
                </tr>
                <tr>
                  <td className="footer-td">Careers</td>
                  <td className="footer-td">Help Center</td>
                  <td className="footer-td">Enterprise</td>
                </tr>
                <tr>
                  <td className="footer-td">Press Kit</td>
                  <td className="footer-td">UX Research Guide</td>
                  <td className="footer-td">Integrate</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="foot-div2">
            <div>
              <p className="foot-para foot-rights">
                <i className="fa-regular fa-copyright"></i> &nbsp; LearnLynx
                2024 | All rights reserved.
              </p>
            </div>
            <div>
              <p>Terms & Privacy Policy</p>
            </div>
          </div>
        </div>
        <div className="footer-div"></div>
      </div>
    </>
  );
}

// import "./Footer.css";
// import logo from "../../assets/logo-learnlynx.png";

// export default function Footer() {
//   return (
//     <>
//       <div className="footer">
//         <div className="foot">
//           <div className="foot-div1">
//             <div>
//               <p className="foot-learnlynx">
//                 {" "}
//                 <img className="logo" src={logo} alt="" />
//                 LearnLynx
//               </p>
//               <div className="foot-left">
//                 <p className="foot-para">
//                   Speed Up The Skill Acquisition Process By
//                 </p>
//                 <p className="foot-para">
//                   Finding Unlimited Courses That Matches Your{" "}
//                 </p>
//                 <p className="foot-para">Niche.</p>
//               </div>
//             </div>
//             <div>
//               <table className="foot-table" cellSpacing="5" cellPadding="10">
//                 <tr>
//                   <th className="foot-header">Company</th>
//                   <th className="foot-header">Resources</th>
//                   <th className="table-product foot-header">Product</th>
//                 </tr>
//                 <tr>
//                   <td className="footer-td">About us</td>
//                   <td className="footer-td">Blog</td>
//                   <td className="footer-td">Pricing</td>
//                 </tr>
//                 <tr>
//                   <td className="footer-td">Careers</td>
//                   <td className="footer-td">Help Center</td>
//                   <td className="footer-td">Enterprise</td>
//                 </tr>
//                 <tr>
//                   <td className="footer-td">Press Kit</td>
//                   <td className="footer-td">UX Research Guide</td>
//                   <td className="footer-td">Integrate</td>
//                 </tr>
//               </table>
//             </div>
//           </div>
//           <div className="foot-div2">
//             <div>
//               <p className="foot-para foot-rights">
//                 <i className="fa-regular fa-copyright"></i> &nbsp; LearnLynx
//                 2024 | All rights reserved.
//               </p>
//             </div>
//             <div>
//               <p>Terms & Privacy Policy</p>
//             </div>
//           </div>
//         </div>
//         <div className="footer-div"></div>
//       </div>
//     </>
//   );
// }
