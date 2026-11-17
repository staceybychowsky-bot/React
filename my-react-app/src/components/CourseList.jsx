import CourseCard from "./CourseCard";

const courses = [
  { id: "c1", title: "React Fundamentals", instructor: "Maya Patel", duration: "6 weeks", level: "Beginner" },
  { id: "c2", title: "Advanced JavaScript", instructor: "Leo Carter", duration: "8 weeks", level: "Advanced" },
  { id: "c3", title: "CSS Layouts", instructor: "Nina Romero", duration: "4 weeks", level: "Beginner" },
  { id: "c4", title: "Building APIs", instructor: "Sam Okafor", duration: "6 weeks", level: "Intermediate" },
];

function CourseList() {
  return (
    <div>
      <h2>Available Courses</h2>

      <div className="card-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
