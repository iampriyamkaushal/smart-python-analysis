import { Link } from "react-router-dom";
import { useAuthChoice } from "../contexts/AuthChoiceContext";

export default function Footer() {
  const openAuthChoice = useAuthChoice();

  return (
    <footer className="footer">
      <div>
        <div className="footer-brand-line"><img src="/logo.png" alt="" /><h3>Smart Python Analysis</h3></div>
        <p>
          A practical, beginner-friendly place to learn Python programming. More technology courses are coming soon.
        </p>
        <small style={{ color: "#64748b", display: "block", marginTop: "12px" }}>
          © {new Date().getFullYear()} Smart Python Analysis (SPA). All rights reserved.
        </small>
      </div>

      <div>
        <h4>Curriculum & Verification</h4>
        <p><Link to="/courses">Course Details & Syllabus</Link></p>
        <p><Link to="/verify">Official Certificate Verification</Link></p>
        <p><Link to="/about">About SPA Academy</Link></p>
      </div>

      <div>
        <h4>Support & Account</h4>
        <p><Link to="/contact">Contact Support</Link></p>
        <p><button className="footer-auth-link" type="button" onClick={() => openAuthChoice("login")}>Login</button></p>
        <p><button className="footer-auth-link" type="button" onClick={() => openAuthChoice("register")}>Sign Up</button></p>
      </div>

      <div>
        <h4>Policies</h4>
        <p><Link to="/verify">Verify Certificate</Link></p>
        <p><Link to="/refund-policy">Refund Policy</Link></p>
        <p><Link to="/terms">Terms of Service</Link></p>
      </div>
    </footer>
  );
}
