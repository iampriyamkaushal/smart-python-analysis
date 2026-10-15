import { Link, NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", to: "/app/dashboard" },
    { id: "python", label: "Python Workspace", icon: "🐍", to: "/app/python" },
    { id: "courses", label: "My Courses", icon: "📚", to: "/app/courses" },
    { id: "progress", label: "My Progress", icon: "📈", to: "/app/progress" },
    { id: "certificates", label: "My Certificates", icon: "🎓", to: "/app/certificates" },
    { id: "profile", label: "Profile", icon: "👤", to: "/app/profile" },
    { id: "settings", label: "Settings", icon: "⚙️", to: "/app/settings" }
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand">
        <img src="/logo.png" alt="" />
        <div>
          <strong>Smart Python</strong>
          <small>Analysis Studio</small>
        </div>
      </div>

      <Link
        to="/"
        className="back-to-public-btn"
        title="Return to the public portal"
      >
        <span>←</span>
        <span>Public Website</span>
      </Link>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <button className="logout-button" onClick={onLogout}>
        <span>🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}
