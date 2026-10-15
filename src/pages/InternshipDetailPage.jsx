import { Link, useParams } from "react-router-dom";
import { INTERNSHIPS } from "../data/internships";

export default function InternshipDetailPage() {
  const { id } = useParams();
  const internship = INTERNSHIPS.find((item) => item.id === id);

  if (!internship) {
    return (
      <section className="page internship-page">
        <div className="internship-empty-state">
          <h1>Internship not found</h1>
          <p>This program may have moved or is not available.</p>
          <Link className="btn-primary" to="/internships">Browse internships</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page internship-page internship-detail-page">
      <Link className="back-link" to="/internships">← All internships</Link>
      <div className="internship-detail-heading">
        <div className={`internship-detail-icon accent-${internship.accent}`}>{internship.icon}</div>
        <div>
          <div className="internship-meta">
            <span>{internship.category}</span>
            <span>{internship.duration}</span>
            <span>{internship.tag}</span>
          </div>
          <h1>{internship.title}</h1>
          <p>{internship.summary}</p>
          <span className="trust-badge">✓ Project-based learning · Certificate included</span>
        </div>
      </div>

      <div className="internship-detail-layout">
        <div className="internship-detail-content">
          <section className="detail-section">
            <h2>What you will learn</h2>
            <ul className="learning-list">
              {internship.learn.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="detail-section project-highlight">
            <span className="eyebrow">HANDS-ON OUTCOMES</span>
            <h2>Projects you will build</h2>
            <div className="project-list">
              {internship.projects.map((project, index) => (
                <div className="project-row" key={project}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{project}</strong>
                  <span aria-hidden="true">↗</span>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2>Curriculum</h2>
            <div className="curriculum-accordion">
              {internship.weeks.map((week, index) => (
                <details key={week.title} open={index === 0}>
                  <summary>{week.title}<span aria-hidden="true">+</span></summary>
                  <p>{week.details}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2>Tools and topics</h2>
            <div className="tech-stack-list tech-stack-large">
              {internship.stack.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </section>
        </div>

        <aside className="enrollment-card">
          <div className={`enrollment-card-art accent-${internship.accent}`}>
            <span>{internship.icon}</span>
            <small>{internship.duration} · Guided projects</small>
          </div>
          <div className="enrollment-card-content">
            <div className="internship-price enrollment-price">
              <strong>₹{internship.price.toLocaleString("en-IN")}</strong>
              <del>₹{internship.oldPrice.toLocaleString("en-IN")}</del>
            </div>
            <p className="price-note">One-time program fee</p>
            <Link className="btn-primary enrollment-button" to={`/checkout/${internship.id}`}>Enroll Now</Link>
            <p className="enrollment-includes">Program includes</p>
            <ul>
              <li>Verified certificate on completion</li>
              <li>Lifetime access to study materials</li>
              <li>Mentor support for project work</li>
            </ul>
            <small className="payment-note">Payment options will be shown at checkout.</small>
          </div>
        </aside>
      </div>
    </section>
  );
}
