import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="welcome-card">
        <div>
          <p className="small-title">YOUR PYTHON LEARNING SPACE</p>
          <h2>
            Learn Python <br />
            <span>One step at a time.</span>
          </h2>
          <p>
            Build programming fundamentals with structured lessons and practical coding exercises.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button onClick={() => navigate("/app/python")}>
              Open Python Workspace →
            </button>
          </div>
        </div>
        <div className="analysis-icon"><img src="/logo.png" alt="Smart Python Analysis logo" /></div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>🐍</span>
          <div>
            <small>Available Course</small>
            <h3>Python Programming</h3>
          </div>
        </div>

        <div className="stat-card">
          <span>📚</span>
          <div>
            <small>Course Modules</small>
            <h3>5 Modules</h3>
          </div>
        </div>

        <div className="stat-card">
          <span>🔒</span>
          <div>
            <small>Other Courses</small>
            <h3>Coming Soon</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Python Programming</h2>
          <p>Continue with the course or open the Python workspace to practice.</p>
          <div className="quick-actions">
            <button className="quick-action" onClick={() => navigate("/app/python")}>
              🐍 Open Python Workspace
            </button>
            <button className="quick-action" onClick={() => navigate("/courses")}>
              📚 View Course Modules
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Learning Path</h2>
          <div className="activity">
            <span>1</span>
            <div>
              <strong>Python Fundamentals</strong>
              <small>Start with syntax, variables, and data types.</small>
            </div>
          </div>
          <div className="activity">
            <span>2</span>
            <div>
              <strong>Practice and Problem Solving</strong>
              <small>Work through exercises and build your confidence.</small>
            </div>
          </div>
          <div className="activity">
            <span>🔒</span>
            <div>
              <strong>More Technology Courses</strong>
              <small>Coming soon.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
