function SearchBar({ value, onChange, field, onFieldChange }) {
  const fieldNames = {
    name: "Name",
    city: "City",
    company: "Company",
  };

  return (
    <div className="search-controls">
      <div className="search-field-select-wrap">
        <label htmlFor="student-search-field" className="search-label">
          Search by
        </label>
        <select
          id="student-search-field"
          className="search-field-select"
          value={field}
          onChange={(event) => onFieldChange(event.target.value)}
        >
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="company">Company</option>
        </select>
      </div>

      <div className="search-bar">
        <label htmlFor="student-search" className="search-label">
          Search students
        </label>
        <input
          id="student-search"
          type="search"
          className="search-input"
          placeholder={`Search by ${fieldNames[field]}...`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
