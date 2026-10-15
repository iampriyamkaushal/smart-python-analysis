import { useNavigate } from "react-router-dom";

export default function CertificatesPage({ currentUser, onVerifyShortcut }) {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>🎓</span>
        <div>
          <p>VERIFIED CREDENTIALS</p>
          <h2>My Certificates</h2>
          <p>Official verified certificates earned through Smart Python Analysis.</p>
        </div>
      </div>

      <div className="workspace-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <h2>🎓 Python Programming</h2>
          <span style={{ padding: "6px 14px", borderRadius: "20px", background: "rgba(34, 197, 94, 0.15)", color: "#22c55e", fontWeight: "700", fontSize: "13px" }}>
            Status: VALID
          </span>
        </div>
        <p style={{ color: "#8d96aa", marginTop: "6px" }}>
          Certificate ID: <strong style={{ color: "#00d4ff" }}>SPA-2026-001</strong>
        </p>

        <div style={{ marginTop: "20px", padding: "20px", borderRadius: "14px", border: "1px dashed rgba(255,255,255,0.2)", background: "#0c1325", lineHeight: "1.8" }}>
          <p style={{ margin: "0", color: "#f8fafc" }}>
            <strong>Student Name:</strong> {currentUser?.name || "Demo Student"}<br />
            <strong>Course Name:</strong> Python Programming<br />
            <strong>Issue Date:</strong> 15 September 2026<br />
            <strong>Issued By:</strong> Smart Python Analysis Academy<br />
            <strong>Verification Status:</strong> <span style={{ color: "#22c55e" }}>VALID & RECOGNIZED</span>
          </p>
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button onClick={() => alert("Downloading official certificate PDF...")}>
            📥 Download Certificate
          </button>
          <button
            style={{ background: "#1f293d", color: "#a5b4fc" }}
            onClick={() => {
              if (onVerifyShortcut) {
                onVerifyShortcut("SPA-2026-001");
              } else {
                navigate("/verify");
              }
            }}
          >
            🔍 Verify in Public Registry
          </button>
        </div>
      </div>
    </section>
  );
}
