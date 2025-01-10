import { useState } from "react";
import "./Filter.css";

const Filters = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const filters = [
    {
      name: "Ratings",
      options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    },
    {
      name: "Price",
      options: ["Free", " ₹100-₹500", "₹500-₹1000", "₹1000-₹2000", "₹2000+"],
    },
    {
      name: "Categories",
      options: [
        "Web Development",
        "Data Science",
        "AI/ML",
        "Design",
        "Marketing",
      ],
    },
    { name: "Teachers", options: ["A", "J", "B", "S"] },
    { name: "Level", options: ["Beginner", "Intermediate", "Advanced"] },
  ];

  return (
    <div className="filters-container">
      <h2>Filters</h2>
      <div className="filters-list">
        {filters.map((filter, index) => (
          <div key={index} className="filter-item">
            <button
              className="filter-button"
              onClick={() => toggleDropdown(index)}
            >
              <span>{filter.name}</span>
              <span className={openDropdown === index ? "arrow open" : "arrow"}>
                {openDropdown === index ? "⮝" : "⮟"}
              </span>
            </button>
            {openDropdown === index && (
              <div className="dropdown-content">
                <ul>
                  {filter.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
