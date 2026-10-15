import { Link, useLocation } from "react-router-dom";

export default function LegalPage() {
  const { pathname } = useLocation();
  const isRefund = pathname === "/refund-policy";
  const title = isRefund ? "Refund Policy" : "Terms of Service";

  return (
    <section className="page legal-page">
      <span className="eyebrow">SMART PYTHON ANALYSIS</span>
      <h1 className="page-title">{title}</h1>
      <div className="workspace-card legal-notice">
        <p className="legal-status">Policy publication pending</p>
        <p>
          {isRefund
            ? "Internship payments are not enabled yet. A complete refund policy, including eligibility, timelines, and the request process, will be published before checkout is activated. No payment should be made until then."
            : "Internship enrollment and payments are not enabled yet. The complete terms covering account use, program access, intellectual property, certificates, and support will be published before enrollment opens."}
        </p>
        <p>For questions, please contact the Smart Python Analysis team before relying on a program or payment promise.</p>
        <Link className="text-action" to="/contact">Contact SPA →</Link>
      </div>
    </section>
  );
}
