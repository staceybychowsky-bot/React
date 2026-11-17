function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StudentCard({ name, email, city, company, selected, onClick }) {
  function handleKeyDown(event) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <article
      className={`student-card${selected ? " selected" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`Show todos for ${name}`}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className="student-card-header">
        <span className="student-avatar">{getInitials(name)}</span>
        <h3 className="student-name">{name}</h3>
      </div>

      <ul className="student-details">
        <li>
          <span className="detail-label">Email</span>
          <a href={`mailto:${email}`} onClick={(event) => event.stopPropagation()}>
            {email}
          </a>
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
    </article>
  );
}

export default StudentCard;
