export default function ProgressPage() {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>📈</span>
        <div>
          <p>PYTHON PROGRAMMING</p>
          <h2>My Progress</h2>
          <p>Your learning progress will appear here as you work through the course.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Python Programming</h2>
        <p style={{ color: "#cbd5e1", margin: "14px 0 20px" }}>
          Start learning with the available Python course. Progress tracking will be added as course modules become interactive.
        </p>
        <div>
          <button onClick={() => window.location.assign("/courses")}>View Course Modules →</button>
        </div>
      </div>
    </section>
  );
}
