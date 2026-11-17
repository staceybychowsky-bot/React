const departments = [
  {
    id: "d1",
    name: "Engineering",
    employees: [
      { id: "e1", name: "Priya", role: "Frontend Developer" },
      { id: "e2", name: "Marcus", role: "Backend Developer" },
    ],
  },
  {
    id: "d2",
    name: "Design",
    employees: [{ id: "e3", name: "Lena", role: "UI Designer" }],
  },
  { id: "d3", name: "Marketing", employees: [] },
];

function DepartmentList() {
  return (
    <div>
      <h2>Departments</h2>
      <div className="card-grid">
        {departments.map((department) => (
          <section className="department-card" key={department.id}>
            <h3>
              {department.name} ({department.employees.length})
            </h3>
            {department.employees.length > 0 ? (
              <ul>
                {department.employees.map((employee) => (
                  <li key={employee.id}>
                    {employee.name} — {employee.role}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No employees yet</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export default DepartmentList;
