function CourseCard({ course }) {
  return (
    <div className="course-card">
      <span className={`level-badge level-${course.level.toLowerCase()}`}>
        {course.level}
      </span>
      <h3>{course.title}</h3>
      <p>👩‍🏫 {course.instructor}</p>
      <p>⏱️ {course.duration}</p>
    </div>
  );
}

export default CourseCard;
