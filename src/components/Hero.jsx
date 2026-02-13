// src/components/Hero.jsx
import React, { useState } from "react";

export default function Hero() {
  const [noPos, setNoPos] = useState({ top: "50%", left: "60%" });
  const [response, setResponse] = useState("");

  // Fonction pour déplacer le bouton No aléatoirement
  const moveNoButton = () => {
    const top = Math.random() * 70 + 10;  // top entre 10% et 80%
    const left = Math.random() * 70 + 10; // left entre 10% et 80%
    setNoPos({ top: `${top}%`, left: `${left}%` });
  };

  return (
    <section className="section home-section" style={{ position: "relative" }}>
      <h1>💖 Valentine For My Libuška 💖</h1>
      <h2>Libuška, will you be my Valentine?</h2>
      <h2>Libuško, budeš moje Valentýnka?</h2>

      <div style={{ marginTop: "50px" }}>
        <button
          className="gift-btn"
          onClick={() => setResponse("You clicked YES! 💖")}
          style={{ marginRight: "20px" }}
        >
          Yes
        </button>

        <button
          className="gift-btn"
          onMouseEnter={moveNoButton}
          style={{
            position: "absolute",
            top: noPos.top,
            left: noPos.left,
          }}
        >
          No
        </button>
      </div>

      {response && (
        <div className="gift-box" style={{ marginTop: "30px" }}>
          {response}
        </div>
      )}
    </section>
  );
}
