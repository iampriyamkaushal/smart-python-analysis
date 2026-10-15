import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage({
  accountType = "python",
  nextPath = "",
  registerForm,
  setRegisterForm,
  registerError,
  onSubmit
}) {
  const [showPasswords, setShowPasswords] = useState(false);
  const internshipSignup = accountType === "internship";
  const nextQuery = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
  const loginPath = internshipSignup ? `/internships/login${nextQuery}` : "/login";

  return (
    <section className="page" style={{ minHeight: "65vh" }}>
      <div className="auth-container">
        <div className="auth-header">
          <h1>{internshipSignup ? "Create Internship Account" : "Create Student Account"}</h1>
          <p>{internshipSignup ? "Create a separate account for internship enrollment, projects, and tasks." : "Create your account to enroll in Python Programming and start learning."}</p>
        </div>

        {registerError && <div className="alert-box alert-error">{registerError}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Alex Morgan"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              className="form-control"
              placeholder="alex@example.com"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password (Min. 6 Characters) *</label>
            <div className="password-input-wrap">
              <input
                type={showPasswords ? "text" : "password"}
                className="form-control"
                placeholder="••••••••"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
              />
              <button type="button" className="password-toggle" aria-label={showPasswords ? "Hide passwords" : "Show passwords"} aria-pressed={showPasswords} onClick={() => setShowPasswords((visible) => !visible)}>◉</button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <div className="password-input-wrap">
              <input
                type={showPasswords ? "text" : "password"}
                className="form-control"
                placeholder="••••••••"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                required
              />
              <button type="button" className="password-toggle" aria-label={showPasswords ? "Hide passwords" : "Show passwords"} aria-pressed={showPasswords} onClick={() => setShowPasswords((visible) => !visible)}>◉</button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "14px", marginTop: "10px" }}
          >
            {internshipSignup ? "Create Internship Account →" : "Create Python Account →"}
          </button>
        </form>

        <p style={{ marginTop: "22px", textAlign: "center", color: "#8d98b0", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link
            to={loginPath}
            style={{ color: "#67eadb", fontWeight: "700", textDecoration: "none" }}
          >
            Log in here
          </Link>
        </p>
      </div>
    </section>
  );
}
