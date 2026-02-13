import { useState, useEffect } from "react";

export default function Photos() {
  const photos = [
    { src: "/photo1.jpg", alt: "Photo 1" },
    { src: "/photo2.jpg", alt: "Photo 2" },
    { src: "/chat_screenshot.png", alt: "Chat Screenshot" },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedPhoto ? "hidden" : "auto";
  }, [selectedPhoto]);

  return (
    <section className="section">
      <h2>Our Photos / Naše fotografie</h2>

      <div className="photos-grid">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo.src}
            alt={photo.alt}
            onClick={() => setSelectedPhoto(photo.src)}
            className="photo-item"
          />
        ))}
      </div>

      {selectedPhoto && (
        <div className="fullscreen" onClick={() => setSelectedPhoto(null)}>
          <span className="close-btn">✕</span>
          <img src={selectedPhoto} alt="Fullscreen" />
        </div>
      )}
    </section>
  );
}
