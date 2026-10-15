import { useNavigate } from "react-router-dom";

export default function PythonWorkspacePage({
  pythonCode,
  setPythonCode
}) {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>🐍</span>
        <div>
          <p>PYTHON PROGRAMMING</p>
          <h2>Python Practice Scratchpad</h2>
          <p>
            Draft Python code while you work through the course. Interactive code execution will be available in a future update.
          </p>
        </div>
      </div>

      <div className="workspace-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px"
          }}
        >
          <div>
            <h2>Practice Python Fundamentals</h2>
            <p style={{ color: "#8d96aa" }}>Try changing the name and greeting in this example.</p>
          </div>
          <button onClick={() => navigate("/courses")}>View Course Modules →</button>
        </div>

        <p style={{ color: "#8d96aa", marginBottom: "12px" }}>
          This scratchpad stores your text only while the page is open; it does not execute or save programs.
        </p>

        {/* CODE EDITOR */}
        <textarea
          value={pythonCode}
          onChange={(e) => setPythonCode(e.target.value)}
          aria-label="Python practice scratchpad"
          style={{
            width: "100%",
            minHeight: "180px",
            background: "#080c16",
            color: "#67eadb",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            lineHeight: "1.6"
          }}
        />

      </div>
    </section>
  );
}
