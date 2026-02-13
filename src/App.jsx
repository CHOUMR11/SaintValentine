import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import "./index.css";

export default function App() {
  const [hearts, setHearts] = useState([]);
  const [giftOpen, setGiftOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  // Playlist finale : 2 pistes locales + toutes les autres en URL directe royalty-free
  const playlist = [
    { title: "Ed Sheeran - Perfect", src: "/Ed Sheeran - Perfect.mp3" },
    { title: "Love Me Like You Do", src: "/love-me-like-you-do.mp3" }, // gardé local
    { title: "All of Me - John Legend", src: "/All of Me - John Legend.mp3" }, // gardé local

    
   
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef(null);
  const playerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const dragOffset = useRef({ x: 0, y: 0 });

  // Générer cœurs flottants
  useEffect(() => {
    const heartsArray = Array.from({ length: 99 }).map((_, i) => ({
      id: i,
      left: Math.random() * window.innerWidth,
      size: 15 + Math.random() * 99,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
    setHearts(heartsArray);
  }, []);

  // Contrôle audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, volume]);

  // Auto next quand une piste se termine
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnd = () => {
      setCurrentTrackIndex((prev) =>
        prev < playlist.length - 1 ? prev + 1 : 0
      );
    };
    audio.addEventListener("ended", handleEnd);
    return () => audio.removeEventListener("ended", handleEnd);
  }, [playlist.length]);

  // Contrôles volume
  const volumeUp = () => setVolume((prev) => Math.min(1, prev + 0.1));
  const volumeDown = () => setVolume((prev) => Math.max(0, prev - 0.1));

  // Logique draggable
  const handleMouseDown = (e) => {
    if (!playerRef.current) return;
    setIsDragging(true);
    const rect = playerRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev < playlist.length - 1 ? prev + 1 : 0
    );
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev > 0 ? prev - 1 : playlist.length - 1
    );
  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />

      {/* Movable Music Player */}
      <div
        ref={playerRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
          background: "rgba(0,0,0,0.5)",
          padding: "8px 12px",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <span
          style={{
            minWidth: "140px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {playlist[currentTrackIndex].title}
        </span>

        <button
          onClick={prevTrack}
          style={{ background: "none", border: "none", color: "white", fontSize: "18px", cursor: "pointer" }}
        >
          ⏮
        </button>

        <button
          onClick={togglePlay}
          style={{
            background: "rgba(255,255,255,0.3)",
            border: "none",
            color: "white",
            padding: "6px 14px",
            borderRadius: "999px",
            cursor: "pointer",
            minWidth: "70px",
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={nextTrack}
          style={{ background: "none", border: "none", color: "white", fontSize: "18px", cursor: "pointer" }}
        >
          ⏭
        </button>

        <button
          onClick={volumeDown}
          title="Quieter"
          style={{ background: "none", border: "none", color: "white", fontSize: "18px", cursor: "pointer" }}
        >
          −
        </button>

        <button
          onClick={volumeUp}
          title="Louder"
          style={{ background: "none", border: "none", color: "white", fontSize: "18px", cursor: "pointer" }}
        >
          +
        </button>
      </div>

      <audio ref={audioRef} src={playlist[currentTrackIndex].src} />

      {/* Liste complète de la playlist (fixe à droite) */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          top: "80px",
          width: "280px",
          maxHeight: "70vh",
          overflowY: "auto",
          background: "rgba(0, 0, 0, 0.65)",
          borderRadius: "12px",
          padding: "12px",
          color: "white",
          zIndex: 999,
          fontSize: "13px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center", color: "#ff69b4" }}>
          Playlist 💕
        </h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {playlist.map((track, index) => (
            <li
              key={index}
              onClick={() => {
                setCurrentTrackIndex(index);
                setIsPlaying(true);
              }}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                background:
                  currentTrackIndex === index ? "rgba(255, 105, 180, 0.4)" : "transparent",
                borderRadius: "8px",
                marginBottom: "4px",
                transition: "background 0.2s",
              }}
            >
              {track.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Cœurs flottants */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        ></div>
      ))}

      {/* Pages */}
      {currentPage === "home" && <Hero />}

      {currentPage === "about-me" && (
        <section className="section">
          <h2>About Me / O mně</h2>
          <p>
            I like you and I am grateful for every moment with you. If love had a language, yours
            would be my heartbeat. If time had a shape, every second would hold you. You are the
            spark in my darkest nights, The warmth that turns every moment bright. With you, I’ve
            found the world I didn’t know I needed— A place where hearts speak louder than words,
            Where every glance, every smile, every touch Says: “I am yours, endlessly and forever.”
          </p>
        </section>
      )}

      {currentPage === "about-libuska" && (
        <section className="section">
          <h2>About Libuška / O Libušce</h2>
          <p>
            💖 A Poem for Libuška 💖
            <br />
            In the quiet of the night, your name whispers to my heart,
            <br />
            A gentle breeze that lingers, yet never departs.
            <br />
            Your eyes, two stars that guide my wandering soul,
            <br />
            Your smile, a fire that makes my broken pieces whole.
            <br /><br />
            Every heartbeat sings a song only you can hear,
            <br />
            Every breath I take carries your essence near.
            <br />
            Time may fade, and seasons may drift apart,
            <br />
            But you are the rhythm, the pulse of my heart.
            <br /><br />
            If I could gather all the worlds and skies above,
            <br />
            I’d wrap them in a verse to tell you of my love.
            <br />
            For in you, I’ve found what poets spend a lifetime to seek,
            <br />
            A love so endless, so fierce, so tender, yet uniquely mystique.
          </p>
        </section>
      )}

      {currentPage === "photos" && (
        <section className="section">
          <h2>Our Photos / Naše fotografie</h2>
          <div className="photos-grid">
            <img src="/photo1.jpg" alt="Photo 1" />
            <img src="/photo2.jpg" alt="Photo 2" />
          </div>
        </section>
      )}

      {currentPage === "gift" && (
        <section className="section">
          <h2>A Special Gift for You / Speciální dárek pro tebe</h2>
          <button className="gift-btn" onClick={() => setGiftOpen(true)}>
            🎁 Click to Open
          </button>
          {giftOpen && (
            <div className="gift-overlay">
              <div className="gift-modal">
                <span className="close-btn" onClick={() => setGiftOpen(false)}>
                  ✕
                </span>
                <h3>My Love Letter 💌</h3>
                <p>
                  From the moment you came into my life,
                  <br />
                  everything became softer, brighter, and more beautiful.
                  <br /><br />
                  Your smile is my favorite sunrise.
                  <br />
                  Your voice is my favorite melody.
                  <br />
                  And your heart is my favorite home.
                  <br /><br />
                  I choose you.
                  <br />
                  Today.
                  <br />
                  Tomorrow.
                  <br />
                  Forever. 💖
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      <Footer />
    </div>
  );
}