const students = [
  { id: 101, name: "Aisha Khan", age: 20, course: "Computer Science", city: "Chicago" },
  { id: 102, name: "Ben Ortiz", age: 22, course: "Graphic Design", city: "Denver" },
  { id: 103, name: "Carlos Mendes", age: 19, course: "Business", city: "Austin" },
  { id: 104, name: "Diana Lee", age: 21, course: "Nursing", city: "Seattle" },
  { id: 105, name: "Ethan Brooks", age: 23, course: "Computer Science", city: "Boston" },
];

function StudentInfo() {
  const averageAge = students.reduce((sum, student) => sum + student.age, 0) / students.length;

  return (
    <div>
      <h2>Student Information</h2>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>{student.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Average age: {averageAge}</p>
    </div>
  );
}

export default StudentInfo;


