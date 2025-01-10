export default function CourseCards() {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-card-img" />
      <div className="course-card-content">
        <div>
          <div className="course-card-info">
            <span className="course-card-reviews">⭐ {reviews} Reviews</span>
            <span className="course-card-duration">⏰ {duration}</span>
          </div>
          <h3 className="course-card-title">{title}</h3>
        </div>
        <button className="course-card-button" onClick={handleViewCourse}>
          View Courses
        </button>
      </div>
    </div>
  );
}
