import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useOutletContext } from "react-router-dom";

const TASKS_KEY_PREFIX = "spa_internship_tasks_";
const DEFAULT_TASKS = [
  { id: "week-1", title: "Week 1 · Project setup and planning", instructions: "Create your project repository and share a short README describing the problem and your plan.", status: "Pending", submission: "", mentorComment: "" },
  { id: "week-2", title: "Week 2 · Build the core experience", instructions: "Share a live preview or repository link showing the main project flow and responsive layout.", status: "Pending", submission: "", mentorComment: "" },
  { id: "week-3", title: "Week 3 · Complete and present your project", instructions: "Submit your finished project link with a short summary of what you built and learned.", status: "Pending", submission: "", mentorComment: "" }
];

const RESOURCES = [
  { id: "python-video", topic: "Python fundamentals: variables and functions", type: "Video", action: "Watch Now", videoId: "kqtD5dpn9C8" },
  { id: "python-docs", topic: "Python language tutorial", type: "PDF", action: "Download", notes: ["Start with expressions and variables.", "Use if statements to make decisions.", "Use for and while loops to repeat work.", "Group reusable steps into functions.", "Practice with lists, dictionaries, and strings."] },
  { id: "git-guide", topic: "GitHub project submission guide", type: "PDF", action: "Download", notes: ["Create a repository for your project.", "Write a README with setup steps and a short project description.", "Commit meaningful changes as you work.", "Check that shared links are public or accessible to your mentor.", "Submit a live deployment or repository URL in your task card."] }
];

function DashboardSidebar({ open, onNavigate }) {
  const items = [
    { to: "/dashboard/overview", label: "Overview", icon: "◫" },
    { to: "/dashboard/tasks", label: "My Tasks", icon: "✓" },
    { to: "/dashboard/resources", label: "Resources", icon: "▤" },
    { to: "/dashboard/certificate", label: "Certificate", icon: "◇" }
  ];

  return (
    <aside className={`internship-dashboard-sidebar ${open ? "is-open" : ""}`}>
      <Link className="dashboard-sidebar-brand" to="/dashboard/overview" onClick={onNavigate}>
        <img src="/logo.png" alt="" /><strong>Internship Hub</strong>
      </Link>
      <nav aria-label="Student dashboard">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={onNavigate} className={({ isActive }) => isActive ? "active" : ""}>
            <span aria-hidden="true">{item.icon}</span>{item.label}
          </NavLink>
        ))}
      </nav>
      <Link className="dashboard-sidebar-back" to="/internships">← Browse programs</Link>
    </aside>
  );
}

export function InternshipDashboardLayout({ currentUser, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(`${TASKS_KEY_PREFIX}${currentUser.id}`);
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });
  useEffect(() => {
    localStorage.setItem(`${TASKS_KEY_PREFIX}${currentUser.id}`, JSON.stringify(tasks));
  }, [currentUser.id, tasks]);

  const notify = (message, type = "success") => window.dispatchEvent(
    new CustomEvent("spa-toast", { detail: { message, type } })
  );

  return (
    <div className="internship-dashboard-shell">
      <DashboardSidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <main className="internship-dashboard-main">
        <header className="internship-dashboard-topbar">
          <button className="dashboard-menu-toggle" type="button" aria-label="Toggle dashboard menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>☰</button>
          <div>
            <span className="eyebrow">STUDENT DASHBOARD</span>
            <h1>Welcome, {currentUser.name?.split(" ")[0] || "Learner"}</h1>
          </div>
          <button className="dashboard-logout" type="button" onClick={onLogout}>Log out</button>
        </header>
        <Outlet context={{ currentUser, tasks, setTasks, notify }} />
      </main>
    </div>
  );
}

function useDashboardData() {
  return useOutletContext();
}

export function InternshipOverviewPage() {
  const { currentUser, tasks } = useDashboardData();
  const completed = tasks.filter((task) => task.status === "Approved").length;
  const progress = Math.round((completed / tasks.length) * 100);
  const currentTask = tasks.find((task) => task.status !== "Approved");

  return (
    <section className="internship-dashboard-page">
      <div className="dashboard-welcome-band">
        <div><span className="eyebrow">YOUR INTERNSHIP JOURNEY</span><h2>Hi {currentUser.name?.split(" ")[0] || "there"}, ready to build?</h2><p>Keep moving through your weekly projects. Share your work when each task is ready for review.</p></div>
        <span className="welcome-mark" aria-hidden="true">✳</span>
      </div>
      <div className="student-overview-grid">
        <div className="student-progress-panel">
          <div className="progress-ring" style={{ "--progress": `${progress}%` }} role="img" aria-label={`${progress}% tasks complete`}><span>{progress}%</span></div>
          <div><span className="eyebrow">TASK PROGRESS</span><h2>{completed} of {tasks.length} approved</h2><p>Tasks are marked complete after mentor approval.</p></div>
        </div>
        <div className="student-current-module">
          <span className="eyebrow">CURRENT STATUS</span>
          <h2>{currentTask ? currentTask.title : "All tasks approved"}</h2>
          <p>{currentTask ? "Continue your project and submit a link for review." : "Your internship tasks are complete."}</p>
          <Link className="btn-primary" to={currentTask ? "/dashboard/tasks" : "/dashboard/certificate"}>{currentTask ? "Resume Learning →" : "View Certificate →"}</Link>
        </div>
      </div>
      <div className="dashboard-next-step">
        <div><span className="eyebrow">NEXT STEP</span><h2>Build something you can share</h2><p>Open your task list, review the instructions, and submit a live project or repository link.</p></div>
        <Link to="/dashboard/tasks">View my tasks →</Link>
      </div>
    </section>
  );
}

function Celebration() {
  return <div className="task-celebration" aria-label="Task approved"><strong>Task approved. Great work!</strong>{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--particle": index }} />)}</div>;
}

export function InternshipTasksPage() {
  const { tasks, setTasks, notify } = useDashboardData();
  const [submissions, setSubmissions] = useState(() => Object.fromEntries(tasks.map((task) => [task.id, task.submission || ""])));
  const [celebrate, setCelebrate] = useState(false);
  const approvedCount = useRef(tasks.filter((task) => task.status === "Approved").length);

  useEffect(() => {
    const nextCount = tasks.filter((task) => task.status === "Approved").length;
    if (nextCount > approvedCount.current) {
      setCelebrate(true);
      const timer = window.setTimeout(() => setCelebrate(false), 2800);
      approvedCount.current = nextCount;
      return () => window.clearTimeout(timer);
    }
    approvedCount.current = nextCount;
  }, [tasks]);

  const submitTask = (task) => {
    const value = (submissions[task.id] || "").trim();
    let parsedUrl;
    try { parsedUrl = new URL(value); } catch { parsedUrl = null; }
    if (!parsedUrl || !["http:", "https:"].includes(parsedUrl.protocol)) {
      notify("Enter a valid live project or GitHub URL.", "error");
      return;
    }
    setTasks((items) => items.map((item) => item.id === task.id ? { ...item, submission: value, status: "Under Review", mentorComment: "" } : item));
    notify("Task submitted for review.", "success");
  };

  return (
    <section className="internship-dashboard-page">
      <div className="dashboard-page-heading"><div><span className="eyebrow">PROJECT WORK</span><h2>My Tasks</h2><p>Submit a live project or repository link for mentor review.</p></div><span className="task-count">{tasks.length} weekly tasks</span></div>
      {celebrate && <Celebration />}
      <div className="student-task-list">
        {tasks.map((task, index) => (
          <article className="student-task-card" key={task.id}>
            <div className="task-card-heading"><div><span className="task-week">WEEK {index + 1}</span><h3>{task.title}</h3></div><span className={`task-status status-${task.status.toLowerCase().replaceAll(" ", "-")}`}>{task.status}</span></div>
            <p>{task.instructions}</p>
            {task.status === "Changes Required" && task.mentorComment && <div className="mentor-feedback"><strong>Mentor feedback</strong><p>{task.mentorComment}</p></div>}
            <div className="task-submit-row">
              <input aria-label={`Project URL for ${task.title}`} type="url" placeholder="https://github.com/you/project or live link" value={submissions[task.id] || ""} onChange={(event) => setSubmissions((value) => ({ ...value, [task.id]: event.target.value }))} disabled={task.status === "Approved"} />
              <button className="btn-primary" type="button" onClick={() => submitTask(task)} disabled={task.status === "Approved"}>Submit task</button>
            </div>
            {task.submission && <a className="submitted-link" href={task.submission} target="_blank" rel="noreferrer">View submitted project ↗</a>}
          </article>
        ))}
      </div>
    </section>
  );
}

export function InternshipResourcesPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const downloadGuide = async (resource) => {
    const { jsPDF } = await import("jspdf");
    const document = new jsPDF();
    document.setFontSize(18);
    document.text(resource.topic, 18, 24, { maxWidth: 175 });
    document.setFontSize(11);
    document.text("Smart Python Analysis · Internship Resource", 18, 38);
    resource.notes.forEach((note, index) => {
      const lines = document.splitTextToSize(`${index + 1}. ${note}`, 175);
      document.text(lines, 18, 58 + index * 20);
    });
    document.save(`${resource.id}.pdf`);
    window.dispatchEvent(new CustomEvent("spa-toast", { detail: { message: "Study guide downloaded." } }));
  };

  return (
    <section className="internship-dashboard-page">
      <div className="dashboard-page-heading"><div><span className="eyebrow">LEARNING LIBRARY</span><h2>Resources</h2><p>Reference material for your project work.</p></div></div>
      <div className="resource-table-wrap"><table className="resource-table"><thead><tr><th>Topic name</th><th>Type</th><th>Action</th></tr></thead><tbody>
        {RESOURCES.map((resource) => <tr key={resource.id}><td><strong>{resource.topic}</strong></td><td><span className="resource-type">{resource.type}</span></td><td>{resource.type === "Video" ? <button type="button" className="text-action" onClick={() => setActiveVideo(resource)}>Watch Now ↗</button> : <button type="button" className="text-action" onClick={() => downloadGuide(resource)}>{resource.action} ↓</button>}</td></tr>)}
      </tbody></table></div>
      {activeVideo && <div className="video-modal-backdrop" role="presentation" onClick={() => setActiveVideo(null)}><section className="video-modal" role="dialog" aria-modal="true" aria-labelledby="resource-video-title" onClick={(event) => event.stopPropagation()}><div className="video-modal-heading"><h2 id="resource-video-title">{activeVideo.topic}</h2><button type="button" aria-label="Close video" onClick={() => setActiveVideo(null)}>×</button></div><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}`} title={activeVideo.topic} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></section></div>}
    </section>
  );
}

export function InternshipCertificatePage() {
  const { currentUser, tasks, notify } = useDashboardData();
  const complete = tasks.length > 0 && tasks.every((task) => task.status === "Approved");
  const shareCertificate = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };
  const downloadCertificate = async () => {
    const { jsPDF } = await import("jspdf");
    const document = new jsPDF({ orientation: "landscape" });
    document.setDrawColor(50, 126, 117);
    document.setLineWidth(2);
    document.rect(12, 12, 273, 186);
    document.setFont("times", "normal");
    document.setTextColor(25, 75, 72);
    document.setFontSize(16);
    document.text("SMART PYTHON ANALYSIS", 148.5, 48, { align: "center" });
    document.setFontSize(30);
    document.text("Certificate of Completion", 148.5, 78, { align: "center" });
    document.setFontSize(15);
    document.text("This certificate is presented to", 148.5, 101, { align: "center" });
    document.setFontSize(25);
    document.text(currentUser.name, 148.5, 122, { align: "center" });
    document.setFontSize(14);
    document.text("for successfully completing the internship program.", 148.5, 144, { align: "center" });
    document.text(`SPA - ${new Date().getFullYear()}`, 148.5, 168, { align: "center" });
    document.save("spa-internship-certificate.pdf");
    notify("Certificate PDF downloaded.");
  };

  return (
    <section className="internship-dashboard-page">
      <div className="dashboard-page-heading"><div><span className="eyebrow">COMPLETION RECOGNITION</span><h2>Your Certificate</h2><p>Certificate access unlocks after every task is approved.</p></div></div>
      {!complete ? <div className="certificate-locked-state"><div className="certificate-blur" aria-hidden="true"><span>SMART PYTHON ANALYSIS</span><strong>Certificate of Completion</strong><small>{currentUser.name}</small></div><div className="certificate-lock-message"><span aria-hidden="true">🔒</span><h3>Certificate locked</h3><p>Complete 100% of your tasks to unlock your verified certificate.</p><Link className="btn-primary" to="/dashboard/tasks">Review my tasks</Link></div></div> : <div className="certificate-ready-state"><div className="internship-certificate" id="internship-certificate"><span className="eyebrow">SMART PYTHON ANALYSIS</span><h3>Certificate of Completion</h3><p>This certificate is presented to</p><strong>{currentUser.name}</strong><p>for successfully completing the internship program.</p><span>SPA - {new Date().getFullYear()}</span></div><div className="certificate-actions"><button className="btn-primary" type="button" onClick={downloadCertificate}>Download PDF</button><button className="btn-secondary" type="button" onClick={shareCertificate}>Share on LinkedIn</button></div></div>}
    </section>
  );
}

export function InternshipProfilePage({ currentUser }) {
  return (
    <section className="internship-dashboard-page">
      <div className="dashboard-page-heading">
        <div><span className="eyebrow">INTERNSHIP ACCOUNT</span><h2>Profile</h2><p>Your internship account details.</p></div>
      </div>
      <div className="workspace-card internship-profile-card">
        <p><strong>Full name</strong><span>{currentUser?.name}</span></p>
        <p><strong>Email address</strong><span>{currentUser?.email}</span></p>
        <p><strong>Account type</strong><span>Internship Learner</span></p>
      </div>
    </section>
  );
}
