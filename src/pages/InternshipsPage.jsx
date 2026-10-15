import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INTERNSHIPS } from "../data/internships";

const CATEGORIES = ["All categories", "Tech", "Non-Tech", "Design"];

function InternshipSkeleton() {
  return (
    <div className="internship-card internship-skeleton-card" aria-hidden="true">
      <div className="skeleton internship-skeleton-image" />
      <div className="internship-card-body">
        <div className="skeleton internship-skeleton-line short" />
        <div className="skeleton internship-skeleton-line title" />
        <div className="skeleton internship-skeleton-line" />
        <div className="skeleton internship-skeleton-line medium" />
        <div className="skeleton internship-skeleton-action" />
      </div>
    </div>
  );
}

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredInternships = INTERNSHIPS.filter((internship) => {
    const matchesCategory = category === "All categories" || internship.category === category;
    const searchableText = `${internship.title} ${internship.summary} ${internship.stack.join(" ")}`.toLowerCase();
    return matchesCategory && searchableText.includes(search.toLowerCase().trim());
  });

  return (
    <section className="page internship-page">
      <div className="internship-hero">
        <div className="internship-hero-copy">
          <span className="eyebrow">SMART PYTHON ANALYSIS · CAREER PROGRAMS</span>
          <h1>Build Real-World Projects. Get Certified.</h1>
          <p>Choose a guided internship track, practice with projects, and build work you can share.</p>
        </div>
        <div className="internship-hero-art" aria-hidden="true">
          <img className="internship-hero-logo" src="/logo.png" alt="Smart Python Analysis logo" />
          <div className="hero-art-lines">
            <span>Build with purpose.</span>
            <span>Learn by doing.</span>
            <span>Share what you make.</span>
          </div>
        </div>
      </div>

      <div className="internship-toolbar">
        <label className="internship-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search internships or skills"
            aria-label="Search internships or skills"
          />
        </label>
        <label className="internship-category">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="internship-results-heading">
        <div>
          <h2>Explore Internships</h2>
          <p>{loading ? "Loading programs" : `${filteredInternships.length} programs`}</p>
        </div>
      </div>

      <div className="internship-grid">
        {loading ? Array.from({ length: 4 }, (_, index) => <InternshipSkeleton key={index} />) :
          filteredInternships.map((internship) => (
            <article className="internship-card" key={internship.id}>
              <div className={`internship-card-art accent-${internship.accent}`}>
                <span className="internship-card-icon">{internship.icon}</span>
                <span className="internship-tag">{internship.tag}</span>
              </div>
              <div className="internship-card-body">
                <div className="internship-meta">
                  <span>{internship.category}</span>
                  <span>{internship.duration}</span>
                </div>
                <h3>{internship.title}</h3>
                <p>{internship.summary}</p>
                <div className="tech-stack-list" aria-label="Tools and skills">
                  {internship.stack.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
                <div className="internship-card-footer">
                  <div className="internship-price">
                    <strong>₹{internship.price.toLocaleString("en-IN")}</strong>
                    <del>₹{internship.oldPrice.toLocaleString("en-IN")}</del>
                  </div>
                  <Link className="btn-primary" to={`/internships/${internship.id}`}>View Details</Link>
                </div>
              </div>
            </article>
          ))}
      </div>
      {!loading && filteredInternships.length === 0 && (
        <div className="internship-empty-state">No internships match your search. Try another keyword or category.</div>
      )}
    </section>
  );
}