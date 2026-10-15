import { useNavigate } from "react-router-dom";

export default function CoursesPage({ selectedCourseTab, setSelectedCourseTab, onVerifyPreset }) {
  const navigate = useNavigate();
  const comingSoonCourses = {
    analysis: "Data Analysis & Exploration",
    cleaning: "Data Cleaning Studio",
    visualization: "Data Visualization Studio",
    ml: "Machine Learning"
  };

  if (selectedCourseTab !== "python") {
    return (
      <section className="page">
        <h1 className="page-title">{comingSoonCourses[selectedCourseTab] || "Course"}</h1>
        <p className="page-subtitle">Coming Soon. Python Programming is currently the only available course.</p>
        <button className="btn-primary" onClick={() => setSelectedCourseTab("python")}>
          View Python Programming →
        </button>
      </section>
    );
  }

  return (
    <section className="page">
      <h1 className="page-title">Course Details & Curriculum</h1>
      <p className="page-subtitle">
        Start with Python Programming. More technology courses will be announced as they become available.
      </p>

      {/* COURSE AVAILABILITY */}
      <div className="course-tabs-nav">
        <button
          className={`course-tab-btn ${selectedCourseTab === "python" ? "active" : ""}`}
          onClick={() => setSelectedCourseTab("python")}
        >
          🐍 Python Programming
        </button>
        <button
          className="course-tab-btn"
          type="button"
          disabled
        >
          🔒 Data Analysis &amp; Exploration · Coming Soon
        </button>
        <button
          className="course-tab-btn"
          type="button"
          disabled
        >
          🔒 Data Cleaning · Coming Soon
        </button>
        <button
          className="course-tab-btn"
          type="button"
          disabled
        >
          🔒 Data Visualization · Coming Soon
        </button>
        <button
          className="course-tab-btn"
          type="button"
          disabled
        >
          🔒 Machine Learning · Coming Soon
        </button>
      </div>

      {/* AVAILABLE COURSE */}
      {selectedCourseTab === "python" && (
        <div className="course-detail-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <span className="badge-tag" style={{ background: "rgba(0, 212, 255, 0.15)", color: "#00d4ff" }}>
              AVAILABLE NOW • PYTHON PROGRAMMING
            </span>
          </div>

          <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "12px" }}>
            Python Programming
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8", fontSize: "15px" }}>
            Build a strong foundation in Python, from writing your first program to using variables, data types,
            conditions, loops, functions, and core data structures through practical coding exercises.
          </p>

          <ul className="syllabus-list">
            <li><strong>Module 1:</strong> Getting Started with Python and Writing Your First Program</li>
            <li><strong>Module 2:</strong> Variables, Data Types, and Operators</li>
            <li><strong>Module 3:</strong> Conditional Statements and Loops</li>
            <li><strong>Module 4:</strong> Functions, Lists, Tuples, Dictionaries, and Sets</li>
            <li><strong>Module 5:</strong> Practice Problems and a Python Programming Project</li>
          </ul>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "24px" }}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Enroll in this Course →
            </button>
            <button
              className="btn-secondary"
              onClick={() => onVerifyPreset("SPA-2026-001")}
            >
              View Sample Certificate (SPA-2026-001)
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
