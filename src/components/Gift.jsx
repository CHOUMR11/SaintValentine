import { useState, useEffect } from "react";

export default function Gift() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <section className="section">
      <h2>A Special Gift for You / Speciální dárek pro tebe</h2>

      <button className="gift-btn" onClick={() => setOpen(true)}>
        🎁 Click to Open
      </button>

      {open && (
        <div className="gift-overlay">
          <div className="gift-modal">
            <span className="close-btn" onClick={() => setOpen(false)}>
              ✕
            </span>

            <h3>My Love Letter 💌</h3>

            <p>
              From the moment you came into my life,
              everything became softer, brighter, and more beautiful.
              <br /><br />
              Your smile is my favorite sunrise.
              Your voice is my favorite melody.
              And your heart… is my favorite home.
              <br /><br />
              I don’t just love you.
              I choose you.
              Today.
              Tomorrow.
              And forever. 💖
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
