const navLinks = [
  { id: "dashboard", label: "Dashboard", href: "#top" },
  { id: "students", label: "Students", href: "#students" },
  { id: "about", label: "About", href: "#about" },
];

function Header() {
  return (
    <header id="top" className="header">
      <div className="header-inner">
        <h1 className="logo">🎓 Student Management Dashboard</h1>

        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
