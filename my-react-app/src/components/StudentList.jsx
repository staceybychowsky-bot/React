const students = ["Aisha", "Ben", "Carlos", "Diana", "Ethan"];

function StudentList() {
  return (
    <div>
      <h2>Student List</h2>

      <div className="student-grid">
        {students.map((student) => (
          <div key={student} className="student-card">
            <span className="avatar">{student[0]}</span>
            <p>{student}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;
