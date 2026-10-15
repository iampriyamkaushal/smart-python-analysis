import { useEffect } from "react";

export default function AuthPurposeModal({ action, onClose, onChoose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const actionLabel = action === "register" ? "Sign Up" : "Log In";

  return (
    <div className="auth-choice-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="auth-choice-modal" role="dialog" aria-modal="true" aria-labelledby="auth-choice-title">
        <button className="auth-choice-close" type="button" aria-label="Close" onClick={onClose}>×</button>
        <span className="eyebrow">SMART PYTHON ANALYSIS</span>
        <h2 id="auth-choice-title">Which program are you here for?</h2>
        <p>Choose your program to continue to the right account.</p>
        <div className="auth-choice-options">
          <button type="button" onClick={() => onChoose("python")}>
            <span className="auth-choice-icon">Py</span>
            <span><strong>Python Programming</strong><small>Courses, practice, and progress</small></span>
            <span className="auth-choice-arrow" aria-hidden="true">→</span>
          </button>
          <button type="button" onClick={() => onChoose("internship")}>
            <span className="auth-choice-icon internship-choice-icon">IN</span>
            <span><strong>Internship</strong><small>Projects, tasks, and certificates</small></span>
            <span className="auth-choice-arrow" aria-hidden="true">→</span>
          </button>
        </div>
        <p className="auth-choice-action">Continue to {actionLabel}</p>
      </section>
    </div>
  );
}
