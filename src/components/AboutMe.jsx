export default function AboutMe() {
  return (
    <section className="section">
      <h2>About Me / O mně</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <p>If love had a language, yours would be my heartbeat.
If time had a shape, every second would hold you.
You are the spark in my darkest nights,
The warmth that turns every moment bright.

With you, I’ve found the world I didn’t know I needed—
A place where hearts speak louder than words,
Where every glance, every smile, every touch
Says: “I am yours, endlessly and forever.”</p>
        <img src="/photo_me.jpg" alt="Me" style={{ borderRadius: "15px", width: "200px" }} />
      </div>
    </section>
  );
}
