import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage({
  accountType = "python",
  nextPath = "",
  loginForm,
  setLoginForm,
  loginError,
  authNotice,
  onSubmit
}) {
  const [showPassword, setShowPassword] = useState(false);
  const internshipLogin = accountType === "internship";
  const nextQuery = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
  const registerPath = internshipLogin ? `/internships/register${nextQuery}` : "/register";

  return (
    <section className="page" style={{ minHeight: "65vh" }}>
      <div className="auth-container">
        <div className="auth-header">
          <h1>{internshipLogin ? "Internship Login" : "Welcome Back"}</h1>
          <p>{internshipLogin ? "Log in to access your internship tasks, resources, and certificate." : "Log in to continue learning Python Programming."}</p>
        </div>

        {authNotice && <div className="alert-box alert-info">{authNotice}</div>}
        {loginError && <div className="alert-box alert-error">{loginError}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. student@smartpythonanalysis.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <div className="password-label-row"><label>Password</label><Link to="/contact">Forgot password?</Link></div>
            <div className="password-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
              <button type="button" className="password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>◉</button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "14px", marginTop: "10px" }}
          >
            {internshipLogin ? "Log In to Internship Dashboard →" : "Log In to Python Workspace →"}
          </button>
        </form>

        {/* DEMO CREDENTIALS QUICK FILLER FOR EVALUATION */}
        {!internshipLogin && <div
          style={{
            marginTop: "20px",
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px dashed rgba(255,255,255,0.15)",
            textAlign: "center"
          }}
        >
          <small style={{ color: "#8d98b0", display: "block", marginBottom: "8px" }}>
            Sample Pre-registered Account:
          </small>
          <button
            type="button"
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(103, 234, 219, 0.12)",
              color: "#67eadb",
              fontSize: "12px",
              fontWeight: "700"
            }}
            onClick={() => {
              setLoginForm({
                email: "student@smartpythonanalysis.com",
                password: "Password123!"
              });
            }}
          >
            ⚡ Fill Sample Credentials
          </button>
        </div>}

        <p style={{ marginTop: "22px", textAlign: "center", color: "#8d98b0", fontSize: "14px" }}>
          Don't have an account yet?{" "}
          <Link
            to={registerPath}
            style={{ color: "#67eadb", fontWeight: "700", textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
