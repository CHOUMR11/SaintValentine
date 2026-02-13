export default function Navbar({ setCurrentPage }) {
  const links = [
    { label: "Home", page: "home" },
    { label: "About Me", page: "about-me" },
    { label: "Libuška", page: "about-libuska" },
    { label: "Photos", page: "photos" },
    { label: "Gift", page: "gift" },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-title">💖 Valentine For My Libuska 💖</h1>
        <div className="links">
          {links.map((link) => (
            <button
              key={link.page}
              className="nav-button"
              onClick={() => setCurrentPage(link.page)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
