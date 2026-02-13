export default function Footer() {
  const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(6px)",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
    zIndex: 1000,
    fontFamily: "'Dancing Script', cursive",
    color: "#ff4d6d",
    fontSize: "18px",
  };

  return (
    <footer style={footerStyle}>
      💖 Made with love from Oussama for Libuška 💖
    </footer>
  );
}
