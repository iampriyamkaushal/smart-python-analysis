import { useNavigate } from "react-router-dom";

export default function CoursesAppPage() {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>📚</span>
        <div>
          <p>CURRICULUM</p>
          <h2>My Enrolled Courses</h2>
          <p>Your available course is Python Programming.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Python Programming</h2>
        <p style={{ color: "#8d96aa" }}>Build programming fundamentals through structured lessons and hands-on practice.</p>
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate("/courses")}>View Python Course →</button>
        </div>
      </div>
    </section>
  );
}
