import { useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { INTERNSHIPS } from "../data/internships";

export default function InternshipCheckoutPage({ currentUser, notify }) {
  const { id } = useParams();
  const location = useLocation();
  const internship = INTERNSHIPS.find((item) => item.id === id);
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    whatsapp: "",
    college: "",
    degree: "",
    year: ""
  });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  if (!internship) {
    return <section className="page"><h1 className="page-title">Program not found</h1><Link to="/internships">Browse internships</Link></section>;
  }

  if (!currentUser) {
    const nextPath = `${location.pathname}${location.search}`;
    return <Navigate to={`/internships/login?next=${encodeURIComponent(nextPath)}`} replace />;
  }

  const updateField = (event) => setForm((values) => ({ ...values, [event.target.name]: event.target.value }));
  const handleCheckout = async (event) => {
    event.preventDefault();
    setPaymentMessage("");
    setPaymentLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setPaymentLoading(false);
    const message = "Payment setup is not connected yet. No charge was made.";
    setPaymentMessage(message);
    notify(message, "error");
  };

  return (
    <section className="page checkout-page">
      <Link className="back-link" to={`/internships/${internship.id}`}>← Back to program</Link>
      <div className="checkout-heading"><span className="eyebrow">SECURE ENROLLMENT</span><h1 className="page-title">Complete your details</h1><p className="page-subtitle">Your information will be used for program updates and your certificate.</p></div>
      <div className="checkout-layout">
        <form className="checkout-form workspace-card" onSubmit={handleCheckout}>
          <h2>Student details</h2>
          <div className="checkout-form-grid">
            <label>Full name<input name="name" autoComplete="name" value={form.name} onChange={updateField} required /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} required /></label>
            <label>WhatsApp number<input name="whatsapp" type="tel" autoComplete="tel" placeholder="+91 00000 00000" value={form.whatsapp} onChange={updateField} required /></label>
            <label>College name<input name="college" autoComplete="organization" value={form.college} onChange={updateField} required /></label>
            <label>Degree<input name="degree" placeholder="e.g. B.Tech Computer Science" value={form.degree} onChange={updateField} required /></label>
            <label>Current year<select name="year" value={form.year} onChange={updateField} required><option value="">Select year</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Graduate</option><option>Other</option></select></label>
          </div>
          {paymentMessage && <div className="payment-error" role="alert">{paymentMessage}</div>}
          <button className="btn-primary checkout-submit" type="submit" disabled={paymentLoading}>
            {paymentLoading ? <><span className="button-spinner" aria-hidden="true" />Connecting to payment provider…</> : "Proceed to Pay"}
          </button>
          <p className="checkout-disclaimer">Payment is not enabled yet. Your information is not submitted to a payment provider and no charge will be made.</p>
        </form>
        <aside className="checkout-summary workspace-card">
          <span className="eyebrow">ORDER SUMMARY</span>
          <h2>{internship.title}</h2>
          <p>{internship.duration} · Guided project track</p>
          <div className="checkout-summary-line"><span>Program fee</span><strong>₹{internship.price.toLocaleString("en-IN")}</strong></div>
          <div className="checkout-summary-line checkout-total"><span>Total</span><strong>₹{internship.price.toLocaleString("en-IN")}</strong></div>
          <ul><li>Project-based curriculum</li><li>Study materials</li><li>Certificate on completion</li></ul>
          <Link to={`/internships/${internship.id}`} className="text-action">Review program details</Link>
        </aside>
      </div>
    </section>
  );
}
