import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import StudentCard from "./StudentCard";
import StudentTodos from "./StudentTodos";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function toStudent(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address.city,
    company: user.company.name,
  };
}

function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudents() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const users = await response.json();

        if (!controller.signal.aborted) {
          setStudents(users.map(toStudent));
          setStatus("success");
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Failed to load students:", err);
        setStatus("error");
      }
    }

    fetchStudents();

    return () => controller.abort();
  }, [retryCount]);

  function handleRetry() {
    setStatus("loading");
    setRetryCount((count) => count + 1);
  }

  const query = searchTerm.trim().toLowerCase();
  const cities = [...new Set(students.map((student) => student.city))].sort();
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student[searchField].toLowerCase().includes(query);
    const matchesCity = selectedCity === "" || student.city === selectedCity;
    return matchesSearch && matchesCity;
  });
  // Search the visible students, so the panel closes if its card is filtered out
  const selectedStudent = filteredStudents.find(
    (student) => student.id === selectedStudentId,
  );

  function clearFilters() {
    setSearchTerm("");
    setSelectedCity("");
  }

  function renderContent() {
    if (status === "loading") {
      return <Loader message="Loading students..." />;
    }

    if (status === "error") {
      return (
        <ErrorMessage
          message="We couldn't load the students. Please check your connection and try again."
          onRetry={handleRetry}
        />
      );
    }

    if (students.length === 0) {
      return <p className="empty-state">No students have been added yet.</p>;
    }

    return (
      <>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          field={searchField}
          onFieldChange={setSearchField}
        />

        <div
          className="city-filter"
          role="group"
          aria-labelledby="city-filter-label"
        >
          <span id="city-filter-label" className="filter-label">
            Filter by city
          </span>
          <div className="city-chips">
            <button
              type="button"
              className={`city-chip${selectedCity === "" ? " active" : ""}`}
              aria-pressed={selectedCity === ""}
              onClick={() => setSelectedCity("")}
            >
              All cities
            </button>
            {cities.map((city) => (
              <button
                type="button"
                className={`city-chip${selectedCity === city ? " active" : ""}`}
                aria-pressed={selectedCity === city}
                key={city}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <p>No students match the selected search and city filters.</p>
            <button
              type="button"
              className="button button-secondary"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="student-grid">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                email={student.email}
                city={student.city}
                company={student.company}
                selected={selectedStudentId === student.id}
                onSelect={() => setSelectedStudentId(student.id)}
              />
            ))}
          </div>
        )}

        {selectedStudent && (
          <StudentTodos
            key={selectedStudent.id}
            student={selectedStudent}
            onClose={() => setSelectedStudentId(null)}
          />
        )}
      </>
    );
  }

  return (
    <section id="students" className="dashboard">
      <div className="dashboard-heading">
        <h2>Students</h2>
        {status === "success" && students.length > 0 && (
          <p className="result-count">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        )}
      </div>

      {renderContent()}
    </section>
  );
}

export default StudentDashboard;
