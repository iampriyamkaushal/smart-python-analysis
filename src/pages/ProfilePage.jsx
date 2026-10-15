export default function ProfilePage({ currentUser }) {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>👤</span>
        <div>
          <p>STUDENT ACCOUNT</p>
          <h2>Student Profile</h2>
          <p>Manage your account settings and student details.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Profile Details</h2>
        <div style={{ background: "#0d1322", borderRadius: "14px", padding: "22px", marginTop: "20px", border: "1px solid #1e293b", lineHeight: "2" }}>
          <p style={{ color: "#f1f5f9" }}>
            <strong>Full Name:</strong> {currentUser?.name}<br />
            <strong>Email Address:</strong> {currentUser?.email}<br />
            <strong>Enrolled Track:</strong> {currentUser?.enrolledTrack || "Python Programming"}<br />
            <strong>Student Status:</strong> <span style={{ color: "#22c55e" }}>Active Verified</span><br />
            <strong>Account ID:</strong> {currentUser?.id || "SPA-USR-8942"}
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => alert("Profile details up to date.")}>
            Update Profile
          </button>
        </div>
      </div>
    </section>
  );
}
