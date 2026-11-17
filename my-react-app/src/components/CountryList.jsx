const countries = [
  { id: 1, name: "Brazil", capital: "Brasília", flag: "🇧🇷" },
  { id: 2, name: "Canada", capital: "Ottawa", flag: "🇨🇦" },
  { id: 3, name: "Japan", capital: "Tokyo", flag: "🇯🇵" },
  { id: 4, name: "Kenya", capital: "Nairobi", flag: "🇰🇪" },
  { id: 5, name: "Mexico", capital: "Mexico City", flag: "🇲🇽" },
  { id: 6, name: "Norway", capital: "Oslo", flag: "🇳🇴" },
];

function CountryList() {
  return (
    <div className="card">
      <h2>Countries ({countries.length})</h2>

      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            {country.flag} {country.name}: {country.capital}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;


