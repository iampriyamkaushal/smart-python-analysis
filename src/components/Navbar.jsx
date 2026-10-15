import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthChoice } from "../contexts/AuthChoiceContext";

export default function Navbar({ currentUser, onLogout, mode = "python" }) {
  const navigate = useNavigate();
  const openAuthChoice = useAuthChoice();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const internshipMode = mode === "internship";
  const dashboardPath = internshipMode ? "/dashboard/overview" : "/app/dashboard";
  const profilePath = internshipMode ? "/dashboard/profile" : "/app/profile";
  const dashboardLabel = internshipMode ? "My Internship Dashboard" : "My Python Dashboard";

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="" />
        Smart Python Analysis
      </Link>

      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
          Contact
        </NavLink>
        <NavLink to="/internships" className={({ isActive }) => (isActive ? "active" : "")}>
          Internships
        </NavLink>
      </nav>

      <div className="auth-buttons">
        {currentUser ? (
          <div className="profile-menu-wrap">
            <button
              className="profile-menu-trigger"
              type="button"
              aria-expanded={profileMenuOpen}
              aria-label={`Open ${currentUser.name}'s account menu`}
              onClick={() => setProfileMenuOpen((isOpen) => !isOpen)}
            >
              <span className="profile-avatar">{currentUser.name?.slice(0, 1).toUpperCase() || "S"}</span>
              <span>{currentUser.name}</span>
              <span aria-hidden="true">⌄</span>
            </button>
            {profileMenuOpen && (
              <div className="profile-menu">
                <button type="button" onClick={() => { setProfileMenuOpen(false); navigate(dashboardPath); }}>
                  {dashboardLabel}
                </button>
                <button type="button" onClick={() => { setProfileMenuOpen(false); navigate(profilePath); }}>
                  Profile
                </button>
                <button type="button" onClick={() => { setProfileMenuOpen(false); onLogout(); }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button type="button" className="btn-secondary" onClick={() => openAuthChoice("login")}>
              Login
            </button>
            <button type="button" className="btn-primary" onClick={() => openAuthChoice("register")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
