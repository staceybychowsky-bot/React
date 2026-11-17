import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import StudentCard from "./StudentCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Turn an API user into the shape our app uses
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
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Calculated during render, never stored in state
  const query = searchTerm.trim().toLowerCase();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(query)
  );

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
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <p>No students match "{searchTerm}".</p>
            <button
              className="button button-secondary"
              onClick={() => setSearchTerm("")}
            >
              Clear search
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
              />
            ))}
          </div>
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

