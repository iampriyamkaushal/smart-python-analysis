import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom";
import "./App.css";

import {
  SAMPLE_STUDENT_CSV,
  SAMPLE_DIRTY_CSV,
  CERTIFICATES_DATABASE,
  DEFAULT_USERS
} from "./data/mockData";

import {
  detectColumnType,
  computeColumnStats,
  analyzeQuality
} from "./utils/analysisHelpers";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ToastViewport from "./components/ToastViewport";
import AuthPurposeModal from "./components/AuthPurposeModal";
import { AuthChoiceContext } from "./contexts/AuthChoiceContext";

// Public Pages
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VerifyPage from "./pages/VerifyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Authenticated Pages
import DashboardPage from "./pages/DashboardPage";
import PythonWorkspacePage from "./pages/PythonWorkspacePage";
import CoursesAppPage from "./pages/CoursesAppPage";
import ProgressPage from "./pages/ProgressPage";
import CertificatesPage from "./pages/CertificatesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import InternshipsPage from "./pages/InternshipsPage";
import InternshipDetailPage from "./pages/InternshipDetailPage";
import InternshipCheckoutPage from "./pages/InternshipCheckoutPage";
import LegalPage from "./pages/LegalPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  InternshipDashboardLayout,
  InternshipOverviewPage,
  InternshipTasksPage,
  InternshipResourcesPage,
  InternshipCertificatePage,
  InternshipProfilePage
} from "./pages/InternshipDashboardPage";

// ====================================================
// ROUTE GUARDS & LAYOUT WRAPPERS
// ====================================================

function PublicLayout({ currentUser, internshipCurrentUser, onLogout, onInternshipLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [authChoice, setAuthChoice] = useState(null);
  const internshipMode = location.pathname.startsWith("/internships") || location.pathname.startsWith("/checkout/");

  const chooseAuthPurpose = (purpose) => {
    const actionPath = authChoice === "register" ? "register" : "login";
    setAuthChoice(null);
    navigate(purpose === "internship" ? `/internships/${actionPath}` : `/${actionPath}`);
  };

  return (
    <AuthChoiceContext.Provider value={setAuthChoice}>
      <div className="app">
        <Navbar
          mode={internshipMode ? "internship" : "python"}
          currentUser={internshipMode ? internshipCurrentUser : currentUser}
          onLogout={internshipMode ? onInternshipLogout : onLogout}
        />
        <main>
          <Outlet />
        </main>
        <Footer />
        {authChoice && (
          <AuthPurposeModal
            action={authChoice}
            onClose={() => setAuthChoice(null)}
            onChoose={chooseAuthPurpose}
          />
        )}
      </div>
    </AuthChoiceContext.Provider>
  );
}

function ProtectedRoute({ currentUser, loginPath = "/login", children }) {
  if (!currentUser) {
    return <Navigate to={loginPath} replace />;
  }
  return children;
}

function ComingSoonPage({ title }) {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>🔒</span>
        <div>
          <p>COMING SOON</p>
          <h2>{title}</h2>
          <p>Python Programming is currently available. More learning tools and technology courses are on the way.</p>
        </div>
      </div>
    </section>
  );
}

function AppLayout({ currentUser, onLogout }) {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.includes("python")) return "Python Programming Workspace";
    if (pathname.includes("dataset")) return "Coming Soon";
    if (pathname.includes("cleaning")) return "Coming Soon";
    if (pathname.includes("visualization")) return "Coming Soon";
    if (pathname.includes("ml")) return "Coming Soon";
    if (pathname.includes("insights")) return "Coming Soon";
    if (pathname.includes("reports")) return "Coming Soon";
    if (pathname.includes("courses")) return "Enrolled Course Modules";
    if (pathname.includes("progress")) return "Learning Progress & Milestones";
    if (pathname.includes("certificates")) return "Earned Verified Certificates";
    if (pathname.includes("profile")) return "Student Profile";
    if (pathname.includes("settings")) return "Workspace Preferences";
    return "Dashboard Overview";
  };

  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} />
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>AUTHENTICATED APPLICATION</p>
            <h1>{getPageTitle(location.pathname)}</h1>
          </div>

          <div className="profile-badge">
            <span>{currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : "SP"}</span>
            <div>
              <strong>{currentUser.name}</strong>
              <small>● {currentUser.role || "Verified Student"}</small>
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

// ====================================================
// MAIN APP COMPONENT
// ====================================================

function App() {
  const notify = (message, type = "success") => window.dispatchEvent(
    new CustomEvent("spa-toast", { detail: { message, type } })
  );

  // --------------------------------------------------
  // 1. AUTHENTICATION & USER STORE STATE
  // --------------------------------------------------
  // Purge any stale legacy boolean lock
  useEffect(() => {
    localStorage.removeItem("spa_loggedIn");
  }, []);

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const saved = localStorage.getItem("spa_users_db");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_USERS;
  });

  useEffect(() => {
    localStorage.setItem("spa_users_db", JSON.stringify(usersDb));
  }, [usersDb]);

  const [internshipUsersDb, setInternshipUsersDb] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("spa_internship_users_db") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("spa_internship_users_db", JSON.stringify(internshipUsersDb));
  }, [internshipUsersDb]);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem("spa_session_token");
      const user = localStorage.getItem("spa_current_user");
      if (token && user) {
        return { ...JSON.parse(user), enrolledTrack: "Python Programming" };
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [internshipCurrentUser, setInternshipCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem("spa_internship_session_token");
      const user = localStorage.getItem("spa_internship_current_user");
      return token && user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const [authNotice, setAuthNotice] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLoginSubmit = (e, navigate) => {
    e.preventDefault();
    setLoginError("");
    const { email, password } = loginForm;

    if (!email.trim() || !password) {
      setLoginError("Please enter both email address and password.");
      notify("Please enter both email address and password.", "error");
      return;
    }

    const found = usersDb.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      setLoginError("No account found with this email address. Please register first.");
      notify("No account found with this email address. Please sign up first.", "error");
      return;
    }

    if (found.password !== password) {
      setLoginError("Incorrect password. Please verify your credentials and try again.");
      notify("Incorrect password. Please try again.", "error");
      return;
    }

    // Success
    const token = `spa_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const activeUser = { ...found, enrolledTrack: "Python Programming" };
    localStorage.setItem("spa_session_token", token);
    localStorage.setItem("spa_current_user", JSON.stringify(activeUser));
    setCurrentUser(activeUser);
    setAuthNotice("");
    notify("Welcome back.");
    navigate("/app/dashboard");
  };

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [registerError, setRegisterError] = useState("");

  const handleRegisterSubmit = (e, navigate) => {
    e.preventDefault();
    setRegisterError("");
    const { name, email, password, confirmPassword } = registerForm;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setRegisterError("All fields are required.");
      notify("Please complete all required fields.", "error");
      return;
    }

    if (name.trim().length < 2) {
      setRegisterError("Full name must be at least 2 characters long.");
      notify("Full name must be at least 2 characters long.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setRegisterError("Please enter a valid email address.");
      notify("Please enter a valid email address.", "error");
      return;
    }

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      notify("Password must be at least 6 characters long.", "error");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match. Please re-enter.");
      notify("Passwords do not match.", "error");
      return;
    }

    const existing = usersDb.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existing) {
      setRegisterError("An account with this email address already exists. Please login instead.");
      notify("An account with this email already exists. Please log in.", "error");
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      role: "Active Learner",
      enrolledTrack: "Python Programming"
    };

    const updatedUsers = [...usersDb, newUser];
    setUsersDb(updatedUsers);

    const token = `spa_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("spa_session_token", token);
    localStorage.setItem("spa_current_user", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setAuthNotice("");
    notify("Your account is ready.");
    navigate("/app/dashboard");
  };

  const [internshipLoginForm, setInternshipLoginForm] = useState({ email: "", password: "" });
  const [internshipLoginError, setInternshipLoginError] = useState("");
  const [internshipRegisterForm, setInternshipRegisterForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [internshipRegisterError, setInternshipRegisterError] = useState("");

  const handleInternshipLoginSubmit = (event, navigate, nextPath) => {
    event.preventDefault();
    setInternshipLoginError("");
    const { email, password } = internshipLoginForm;
    const found = internshipUsersDb.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());

    if (!email.trim() || !password || !found || found.password !== password) {
      const message = !found ? "No internship account found. Please sign up for internships." : "Incorrect email or password.";
      setInternshipLoginError(message);
      notify(message, "error");
      return;
    }

    const user = { ...found, accountType: "internship" };
    localStorage.setItem("spa_internship_session_token", `internship_${Date.now()}`);
    localStorage.setItem("spa_internship_current_user", JSON.stringify(user));
    setInternshipCurrentUser(user);
    notify("Internship account signed in.");
    navigate(nextPath?.startsWith("/checkout/") ? nextPath : "/dashboard/overview");
  };

  const handleInternshipRegisterSubmit = (event, navigate, nextPath) => {
    event.preventDefault();
    setInternshipRegisterError("");
    const { name, email, password, confirmPassword } = internshipRegisterForm;
    const emailAddress = email.trim().toLowerCase();
    const existing = internshipUsersDb.some((user) => user.email.toLowerCase() === emailAddress);
    let error = "";

    if (!name.trim() || !emailAddress || !password || !confirmPassword) error = "All fields are required.";
    else if (name.trim().length < 2) error = "Full name must be at least 2 characters long.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) error = "Please enter a valid email address.";
    else if (password.length < 6) error = "Password must be at least 6 characters long.";
    else if (password !== confirmPassword) error = "Passwords do not match.";
    else if (existing) error = "An internship account with this email already exists. Please log in.";

    if (error) {
      setInternshipRegisterError(error);
      notify(error, "error");
      return;
    }

    const user = {
      id: `intern-${Date.now()}`,
      name: name.trim(),
      email: emailAddress,
      password,
      role: "Internship Learner",
      accountType: "internship"
    };
    setInternshipUsersDb((users) => [...users, user]);
    localStorage.setItem("spa_internship_session_token", `internship_${Date.now()}`);
    localStorage.setItem("spa_internship_current_user", JSON.stringify(user));
    setInternshipCurrentUser(user);
    notify("Your internship account is ready.");
    navigate(nextPath?.startsWith("/checkout/") ? nextPath : "/dashboard/overview");
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem("spa_session_token");
    localStorage.removeItem("spa_current_user");
    setCurrentUser(null);
    setAuthNotice("You have logged out successfully.");
    notify("You have logged out successfully.");
    if (navigate) navigate("/");
  };

  const handleInternshipLogout = (navigate) => {
    if (navigate) navigate("/internships");
    localStorage.removeItem("spa_internship_session_token");
    localStorage.removeItem("spa_internship_current_user");
    setInternshipCurrentUser(null);
    notify("You have logged out of your internship account.");
  };

  // --------------------------------------------------
  // 2. CERTIFICATE VERIFICATION ENGINE
  // --------------------------------------------------
  const [certificateInput, setCertificateInput] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const verifyCertificate = (idToCheck) => {
    const target = (idToCheck || certificateInput).trim().toUpperCase();
    if (!target) {
      setVerificationResult(null);
      return;
    }

    const match = CERTIFICATES_DATABASE.find((c) => c.id.toUpperCase() === target);
    if (match) {
      setVerificationResult({
        valid: true,
        data: match
      });
    } else {
      setVerificationResult({
        valid: false,
        searchedId: target,
        message: "Certificate not found or invalid. This certificate identifier does not exist in the official Smart Python Analysis database registry."
      });
    }
  };

  const handleVerifyPreset = (id, navigate) => {
    setCertificateInput(id);
    verifyCertificate(id);
    if (navigate) navigate("/verify");
  };

  const [selectedCourseTab, setSelectedCourseTab] = useState("python");

  // --------------------------------------------------
  // 3. DATA PIPELINE STATE (AUTHENTICATED WORKSPACE)
  // --------------------------------------------------
  const [selectedFile, setSelectedFile] = useState({ name: "sample_data.csv", size: 109 });
  const [previewData, setPreviewData] = useState(() => {
    return SAMPLE_STUDENT_CSV.split(/\r?\n/)
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(",").map((c) => c.trim()));
  });
  const [rawBackupData, setRawBackupData] = useState(() => {
    return SAMPLE_STUDENT_CSV.split(/\r?\n/)
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(",").map((c) => c.trim()));
  });

  const [cleaningDone, setCleaningDone] = useState(false);
  const [cleaningMessage, setCleaningMessage] = useState("");
  const [beforeStats, setBeforeStats] = useState(null);

  const [analysisDone, setAnalysisDone] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [pythonCode, setPythonCode] = useState(
`# Try changing the name and greeting.
name = "Python learner"
print("Hello,", name)`
  );

  const [chartType, setChartType] = useState("bar");
  const [datasetSearchTerm, setDatasetSearchTerm] = useState("");

  const parseCSVText = (text, fileName = "dataset.csv") => {
    const rows = text
      .split(/\r?\n/)
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(",").map((c) => c.trim()));

    if (rows.length === 0) return;

    setSelectedFile({ name: fileName, size: text.length });
    setPreviewData(rows);
    setRawBackupData(rows);
    setAnalysisDone(false);
    setAnalysisResult(null);
    setCleaningDone(false);
    setCleaningMessage("");
    setBeforeStats(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      parseCSVText(text, file.name);
    };
    reader.readAsText(file);
  };

  const loadSampleDataset = () => {
    parseCSVText(SAMPLE_STUDENT_CSV, "sample_data.csv");
  };

  const loadDirtyDataset = () => {
    parseCSVText(SAMPLE_DIRTY_CSV, "sample_with_issues.csv");
  };

  const captureBeforeStats = () => {
    if (!beforeStats && previewData.length > 0) {
      const q = analyzeQuality(previewData[0], previewData.slice(1));
      setBeforeStats({
        rows: previewData.length - 1,
        missing: q.totalMissing,
        duplicates: q.duplicateRowsCount,
        completeness: q.completeness
      });
    }
  };

  const removeDuplicates = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a dataset first.");
      return;
    }
    captureBeforeStats();
    const headers = previewData[0];
    const rows = previewData.slice(1);
    const uniqueRows = rows.filter(
      (row, index, self) =>
        index === self.findIndex((item) => JSON.stringify(item) === JSON.stringify(row))
    );
    const duplicateCount = rows.length - uniqueRows.length;
    setPreviewData([headers, ...uniqueRows]);
    setCleaningDone(true);
    setCleaningMessage(
      duplicateCount === 0
        ? "No duplicate rows found in dataset."
        : `Removed ${duplicateCount} duplicate row(s) successfully.`
    );
    setAnalysisDone(false);
  };

  const removeRowsWithMissing = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a dataset first.");
      return;
    }
    captureBeforeStats();
    const headers = previewData[0];
    const rows = previewData.slice(1);
    const cleanRows = rows.filter((row) =>
      row.every(
        (cell) =>
          cell !== undefined &&
          cell !== null &&
          cell.trim() !== "" &&
          cell !== "N/A" &&
          cell !== "null"
      )
    );
    const droppedCount = rows.length - cleanRows.length;
    setPreviewData([headers, ...cleanRows]);
    setCleaningDone(true);
    setCleaningMessage(
      droppedCount === 0
        ? "No missing cells found. All rows preserved."
        : `Dropped ${droppedCount} row(s) containing missing values.`
    );
    setAnalysisDone(false);
  };

  const fillMissingValues = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a dataset first.");
      return;
    }
    captureBeforeStats();
    const headers = previewData[0];
    const rows = previewData.slice(1);

    const colMeans = headers.map((_, colIdx) => {
      const nums = rows
        .map((r) => Number(r[colIdx]))
        .filter((n) => !isNaN(n) && r[colIdx] !== "" && r[colIdx] !== "N/A");
      if (nums.length === 0) return null;
      return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
    });

    let filledCount = 0;
    const cleanedRows = rows.map((row) => {
      return row.map((cell, colIdx) => {
        if (
          cell === undefined ||
          cell === null ||
          cell.trim() === "" ||
          cell === "N/A" ||
          cell === "null"
        ) {
          filledCount++;
          return colMeans[colIdx] !== null ? colMeans[colIdx] : "N/A";
        }
        return cell.trim();
      });
    });

    setPreviewData([headers, ...cleanedRows]);
    setCleaningDone(true);
    setCleaningMessage(
      filledCount === 0
        ? "No missing cells found to fill."
        : `Imputed ${filledCount} missing value(s) with column arithmetic mean.`
    );
    setAnalysisDone(false);
  };

  const resetToOriginal = () => {
    if (rawBackupData.length > 0) {
      setPreviewData(rawBackupData);
      setCleaningDone(false);
      setCleaningMessage("Dataset restored to initial unmodified state.");
      setBeforeStats(null);
      setAnalysisDone(false);
      setAnalysisResult(null);
    }
  };

  const runAnalysis = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a CSV dataset first.");
      return;
    }

    const headers = previewData[0].map((item) => item.trim());
    const rows = previewData.slice(1);

    let marksIndex = headers.findIndex(
      (item) => item.toLowerCase() === "marks" || item.toLowerCase().includes("score")
    );

    if (marksIndex === -1) {
      for (let c = 0; c < headers.length; c++) {
        const isNum = rows.some((r) => !isNaN(Number(r[c])) && r[c] !== "" && r[c] !== "N/A");
        if (isNum && c !== 0) {
          marksIndex = c;
          break;
        }
      }
    }

    if (marksIndex === -1) {
      marksIndex = 2 < headers.length ? 2 : 1;
    }

    const validRows = rows.filter(
      (row) => !isNaN(Number(row[marksIndex])) && row[marksIndex] !== "N/A" && row[marksIndex] !== ""
    );
    const marks = validRows.map((row) => Number(row[marksIndex]));

    if (marks.length === 0) {
      alert("No numeric values found in the target column.");
      return;
    }

    const total = marks.reduce((sum, value) => sum + value, 0);
    const average = total / marks.length;
    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);
    const highestIndex = validRows.findIndex((row) => Number(row[marksIndex]) === highest);
    const topStudent = highestIndex !== -1 ? validRows[highestIndex][0] : "Unknown";
    const targetColumnName = headers[marksIndex] || "Marks";

    const descriptiveStats = {};
    headers.forEach((h, idx) => {
      const stats = computeColumnStats(rows.map((r) => r[idx]));
      if (stats) descriptiveStats[h] = stats;
    });

    setAnalysisResult({
      rows: rows.length,
      columns: headers.length,
      headers: headers,
      marksColumn: targetColumnName,
      marksIndex: marksIndex,
      average: average.toFixed(2),
      highest: highest,
      lowest: lowest,
      topStudent: topStudent,
      descriptiveStats: descriptiveStats,
      chartData: validRows.map((row) => ({
        name: row[0],
        marks: Number(row[marksIndex])
      }))
    });

    setAnalysisDone(true);
  };

  // Helper variables for Dataset metadata
  const datasetHeaders = previewData[0] || [];
  const datasetRows = previewData.slice(1);
  const activeQuality = analyzeQuality(datasetHeaders, datasetRows);

  const columnTypes = datasetHeaders.map((h, idx) => {
    return {
      name: h,
      type: detectColumnType(datasetRows.map((r) => r[idx])),
      missingCount: activeQuality.missingByCol[h] || 0,
      missingPct:
        datasetRows.length > 0
          ? (((activeQuality.missingByCol[h] || 0) / datasetRows.length) * 100).toFixed(1)
          : "0.0",
      stats: computeColumnStats(datasetRows.map((r) => r[idx]))
    };
  });

  const filteredPreviewRows = datasetRows.filter((row) => {
    if (!datasetSearchTerm.trim()) return true;
    return row.some((cell) =>
      String(cell).toLowerCase().includes(datasetSearchTerm.toLowerCase())
    );
  });

  const activeMarksColIndex =
    analysisResult?.marksIndex ??
    (datasetHeaders.findIndex((h) => h.toLowerCase() === "marks") !== -1
      ? datasetHeaders.findIndex((h) => h.toLowerCase() === "marks")
      : 2);

  return (
    <BrowserRouter>
      <AppRoutes
        currentUser={currentUser}
        internshipCurrentUser={internshipCurrentUser}
        notify={notify}
        onLogout={handleLogout}
        selectedCourseTab={selectedCourseTab}
        setSelectedCourseTab={setSelectedCourseTab}
        certificateInput={certificateInput}
        setCertificateInput={setCertificateInput}
        verificationResult={verificationResult}
        verifyCertificate={verifyCertificate}
        handleVerifyPreset={handleVerifyPreset}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        loginError={loginError}
        authNotice={authNotice}
        handleLoginSubmit={handleLoginSubmit}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        registerError={registerError}
        handleRegisterSubmit={handleRegisterSubmit}
        internshipLoginForm={internshipLoginForm}
        setInternshipLoginForm={setInternshipLoginForm}
        internshipLoginError={internshipLoginError}
        handleInternshipLoginSubmit={handleInternshipLoginSubmit}
        internshipRegisterForm={internshipRegisterForm}
        setInternshipRegisterForm={setInternshipRegisterForm}
        internshipRegisterError={internshipRegisterError}
        handleInternshipRegisterSubmit={handleInternshipRegisterSubmit}
        onInternshipLogout={handleInternshipLogout}
        datasetRows={datasetRows}
        datasetHeaders={datasetHeaders}
        activeQuality={activeQuality}
        selectedFile={selectedFile}
        analysisDone={analysisDone}
        analysisResult={analysisResult}
        pythonCode={pythonCode}
        setPythonCode={setPythonCode}
        runAnalysis={runAnalysis}
        columnTypes={columnTypes}
        filteredPreviewRows={filteredPreviewRows}
        datasetSearchTerm={datasetSearchTerm}
        setDatasetSearchTerm={setDatasetSearchTerm}
        handleFileUpload={handleFileUpload}
        loadSampleDataset={loadSampleDataset}
        loadDirtyDataset={loadDirtyDataset}
        cleaningDone={cleaningDone}
        cleaningMessage={cleaningMessage}
        beforeStats={beforeStats}
        removeDuplicates={removeDuplicates}
        fillMissingValues={fillMissingValues}
        removeRowsWithMissing={removeRowsWithMissing}
        resetToOriginal={resetToOriginal}
        activeMarksColIndex={activeMarksColIndex}
        chartType={chartType}
        setChartType={setChartType}
      />
    </BrowserRouter>
  );
}

// Inner routes component with hook access
function AppRoutes(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = new URLSearchParams(location.search).get("next");

  return (
    <>
    <Routes>
      {/* ----------------------------------------------------
          PART 1: PUBLIC WEBSITE (DEFAULT FOR ALL VISITORS)
          ---------------------------------------------------- */}
      <Route
        element={
          <PublicLayout
            currentUser={props.currentUser}
            internshipCurrentUser={props.internshipCurrentUser}
            onLogout={() => props.onLogout(navigate)}
            onInternshipLogout={() => props.onInternshipLogout(navigate)}
          />
        }
      >
        <Route
          index
          element={
            <HomePage
              currentUser={props.currentUser}
              onSelectCourse={props.setSelectedCourseTab}
            />
          }
        />
        <Route
          path="courses"
          element={
            <CoursesPage
              selectedCourseTab={props.selectedCourseTab}
              setSelectedCourseTab={props.setSelectedCourseTab}
              onVerifyPreset={(id) => props.handleVerifyPreset(id, navigate)}
            />
          }
        />
        <Route path="course-details" element={<Navigate to="/courses" replace />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="internships" element={<InternshipsPage />} />
        <Route path="internships/:id" element={<InternshipDetailPage />} />
        <Route path="checkout/:id" element={<InternshipCheckoutPage currentUser={props.internshipCurrentUser} notify={props.notify} />} />
        <Route path="refund-policy" element={<LegalPage />} />
        <Route path="terms" element={<LegalPage />} />
        <Route
          path="verify"
          element={
            <VerifyPage
              certificateInput={props.certificateInput}
              setCertificateInput={props.setCertificateInput}
              verificationResult={props.verificationResult}
              onVerify={props.verifyCertificate}
            />
          }
        />
        <Route path="certificate" element={<Navigate to="/verify" replace />} />
        <Route
          path="login"
          element={
            <LoginPage
              loginForm={props.loginForm}
              setLoginForm={props.setLoginForm}
              loginError={props.loginError}
              authNotice={props.authNotice}
              onSubmit={(e) => props.handleLoginSubmit(e, navigate)}
            />
          }
        />
        <Route
          path="register"
          element={
            <RegisterPage
              registerForm={props.registerForm}
              setRegisterForm={props.setRegisterForm}
              registerError={props.registerError}
              onSubmit={(e) => props.handleRegisterSubmit(e, navigate)}
            />
          }
        />
        <Route
          path="internships/login"
          element={
            <LoginPage
              accountType="internship"
              nextPath={nextPath}
              loginForm={props.internshipLoginForm}
              setLoginForm={props.setInternshipLoginForm}
              loginError={props.internshipLoginError}
              authNotice=""
              onSubmit={(event) => props.handleInternshipLoginSubmit(event, navigate, nextPath)}
            />
          }
        />
        <Route
          path="internships/register"
          element={
            <RegisterPage
              accountType="internship"
              nextPath={nextPath}
              registerForm={props.internshipRegisterForm}
              setRegisterForm={props.setInternshipRegisterForm}
              registerError={props.internshipRegisterError}
              onSubmit={(event) => props.handleInternshipRegisterSubmit(event, navigate, nextPath)}
            />
          }
        />
      </Route>

      <Route
        path="dashboard"
        element={
          <ProtectedRoute
            currentUser={props.internshipCurrentUser}
            loginPath={`/internships/login?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`}
          >
            <InternshipDashboardLayout
              currentUser={props.internshipCurrentUser}
              onLogout={() => props.onInternshipLogout(navigate)}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<InternshipOverviewPage />} />
        <Route path="tasks" element={<InternshipTasksPage />} />
        <Route path="resources" element={<InternshipResourcesPage />} />
        <Route path="certificate" element={<InternshipCertificatePage />} />
        <Route path="profile" element={<InternshipProfilePage currentUser={props.internshipCurrentUser} />} />
      </Route>

      {/* ----------------------------------------------------
          PART 2: AUTHENTICATED APPLICATION (PROTECTED)
          ---------------------------------------------------- */}
      <Route
        path="app"
        element={
          <ProtectedRoute currentUser={props.currentUser}>
            <AppLayout
              currentUser={props.currentUser}
              onLogout={() => props.onLogout(navigate)}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <DashboardPage />
          }
        />
        <Route
          path="python"
          element={
            <PythonWorkspacePage
              pythonCode={props.pythonCode}
              setPythonCode={props.setPythonCode}
            />
          }
        />
        <Route path="dataset" element={<ComingSoonPage title="Dataset Tools" />} />
        <Route path="cleaning" element={<ComingSoonPage title="Data Cleaning" />} />
        <Route path="visualization" element={<ComingSoonPage title="Data Visualization" />} />
        <Route path="ml" element={<ComingSoonPage title="Machine Learning" />} />
        <Route path="insights" element={<ComingSoonPage title="Smart Insights" />} />
        <Route path="reports" element={<ComingSoonPage title="Reports" />} />
        <Route path="courses" element={<CoursesAppPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route
          path="certificates"
          element={
            <CertificatesPage
              currentUser={props.currentUser}
              onVerifyShortcut={(id) => props.handleVerifyPreset(id, navigate)}
            />
          }
        />
        <Route path="profile" element={<ProfilePage currentUser={props.currentUser} />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* CATCH-ALL REDIRECT TO HOME */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <ToastViewport />
    </>
  );
}

export default App;
