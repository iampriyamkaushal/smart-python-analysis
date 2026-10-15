import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>That page is not here.</h1>
      <p>The link may be outdated, or the page may have moved.</p>
      <Link className="btn-primary" to="/dashboard/overview">Return to Dashboard</Link>
      <Link className="not-found-home" to="/">Go to home</Link>
    </main>
  );
}
