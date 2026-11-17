function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StudentCard({ name, email, city, company, selected, onSelect }) {
  return (
    <article className={`student-card${selected ? " selected" : ""}`}>
      <div className="student-card-header">
        <span className="student-avatar">{getInitials(name)}</span>
        <h3 className="student-name">{name}</h3>
      </div>

      <ul className="student-details">
        <li>
          <span className="detail-label">Email</span>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          <span className="detail-label">City</span>
          {city}
        </li>
        <li>
          <span className="detail-label">Company</span>
          {company}
        </li>
      </ul>

      <button
        type="button"
        className="button button-secondary view-todos-button"
        aria-pressed={selected}
        onClick={onSelect}
      >
        View todos
      </button>
    </article>
  );
}

export default StudentCard;
