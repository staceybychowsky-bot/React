function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StudentCard({ name, email, city, company }) {
  return (
    <article className="student-card">
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
    </article>
  );
}

export default StudentCard;

