function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="student-search" className="search-label">
        Search students
      </label>
      <input
        id="student-search"
        type="search"
        className="search-input"
        placeholder="Type a student name..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;

