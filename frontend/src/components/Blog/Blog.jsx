import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Added for routing
import { Users, Award, Target, BookOpen, Zap } from "lucide-react";
import "./Blog.css";
import team1 from "./images/team1.jpg";
import team2 from "./images/team2.jpg";
import team3 from "./images/team3.jpg";
import team4 from "./images/team4.jpg";
import team5 from "./images/team5.jpg";

const TeamMember = ({ name, role, image, description, linkedin, twitter }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="team-member-card"
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)} // Changed event to onMouseEnter
      onMouseLeave={() => setIsHovered(false)} // Changed event to onMouseLeave
    >
      <div className="member-image-container">
        <img src={image} alt={name} className="member-image" />
        {isHovered && (
          <motion.div
            className="member-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="social-links">
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </motion.div>
        )}
      </div>
      <div className="member-details">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <AnimatePresence>
          {isHovered && (
            <motion.p
              className="description"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const teamMembers = [
    {
      name: "Love Maluja",
      role: "Backend Lead & Project Manager",
      image: `${team2}`,
      //   description: "Backend Lead & Project Manager",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Kashish Mukheja",
      role: "Frontend Developer",
      image: `${team4}`,
      //   description: "",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Manan Bhasin",
      role: "Backend Lead",
      image: `${team3}`,
      //   description: "",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Navdeep Kaur",
      role: "UI/UX Designer & Frontend Developer",
      image: `${team1}`,
      //   description: "",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Mitul Dwivedi",
      role: "Frontend Developer",
      image: `${team5}`,
      //   description: "",
      linkedin: "#",
      twitter: "#",
    },
  ];

  const handleExploreClick = () => {
    window.scrollTo({ behavior: "smooth" }, 0, 0);
  };

  return (
    <div className="learnlynx-about-page">
      <motion.header
        className="about-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-content">
          <motion.h1
            className="main-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            About LearnLynx
          </motion.h1>
          <motion.p
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Revolutionizing Education, One Click at a Time
          </motion.p>
        </div>
      </motion.header>

      <motion.section
        className="mission-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mission-grid">
          <div className="mission-item">
            <Target size={48} color="#f9c365" />
            <h3>Our Vision</h3>
            <p>
              To democratize high-quality education through innovative
              technology and personalized learning experiences.
            </p>
          </div>
          <div className="mission-item">
            <BookOpen size={48} color="#f9c365" />
            <h3>Our Approach</h3>
            <p>
              Combining cutting-edge AI, adaptive learning algorithms, and
              human-centric design to create transformative educational
              platforms.
            </p>
          </div>
          <div className="mission-item">
            <Zap size={48} color="#f9c365" />
            <h3>Our Promise</h3>
            <p>
              Empowering learners of all backgrounds to unlock their full
              potential through accessible, engaging, and intelligent learning
              solutions.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="team-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-header">
          <Users size={36} color="#f9c365" />
          <h2>Meet Our Extraordinary Team</h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <Award size={48} color="#f9c365" />
          <h2>Join Our Learning Revolution</h2>
          <p>
            Be part of a community that's redefining education for the digital
            age.
          </p>
          <Link to="/all-courses">
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreClick} // Added scroll to top
            >
              Explore Our Platform
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Blog;

// import React from "react";
// import "./Blog.css";
// import team1 from "./images/team1.jpg";
// import team2 from "./images/team2.jpg";
// import team3 from "./images/team3.jpg";
// import team4 from "./images/team4.jpg";
// import team5 from "./images/team5.jpg";

// const teamMembers = [
//   { name: "Manan Bhasin", role: "Frontend Developer", img: team1 },
//   { name: "Kashish Gupta", role: "UI/UX Designer", img: team2 },
//   { name: "Love Sharma", role: "Backend Developer", img: team3 },
//   { name: "Ananya Verma", role: "Project Manager", img: team4 },
//   { name: "Arjun Mehta", role: "QA Engineer", img: team5 },
// ];

// function Blog() {
//   return (
//     <div className="about-us-container">
//       <h1 className="about-us-title">Meet Our Amazing Team!</h1>
//       <div className="team-section">
//         {teamMembers.map((member, index) => (
//           <div className="team-card" key={index}>
//             <div className="team-image">
//               <img src={member.img} alt={member.name} />
//             </div>
//             <div className="team-details">
//               <h2 className="team-name">{member.name}</h2>
//               <p className="team-role">{member.role}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Blog;
