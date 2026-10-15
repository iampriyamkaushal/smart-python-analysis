import { useNavigate } from "react-router-dom";
import { useAuthChoice } from "../contexts/AuthChoiceContext";

export default function HomePage({ currentUser, onSelectCourse }) {
  const navigate = useNavigate();
  const openAuthChoice = useAuthChoice();

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div>
          <span className="hero-tag">
            PYTHON PROGRAMMING • BEGINNER-FRIENDLY LEARNING
          </span>
          <h1>Smart Python Analysis</h1>
          <h2>Learn Python. Build Your Future.</h2>
          <p className="hero-desc">
            Learn Python step by step through clear lessons, practical coding exercises, and a supportive learning
            path designed for beginners.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/courses")}>
              Explore Courses →
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/verify")}
            >
              Verify a Certificate
            </button>
            {!currentUser ? (
              <button
                style={{
                  padding: "10px 18px",
                  border: "1px solid rgba(103, 234, 219, 0.3)",
                  borderRadius: "10px",
                  background: "rgba(103, 234, 219, 0.1)",
                  color: "#67eadb",
                  fontWeight: "700"
                }}
                onClick={() => openAuthChoice("login")}
              >
                Launch Workspace Demo ⚡
              </button>
            ) : (
              <button
                style={{
                  padding: "10px 18px",
                  border: "1px solid rgba(103, 234, 219, 0.3)",
                  borderRadius: "10px",
                  background: "rgba(103, 234, 219, 0.1)",
                  color: "#67eadb",
                  fontWeight: "700"
                }}
                onClick={() => navigate("/app/dashboard")}
              >
                Open Dashboard 🚀
              </button>
            )}
          </div>
        </div>

        {/* HERO INTERACTIVE PREVIEW */}
        <div className="hero-preview-box">
          <span className="preview-pill">● LIVE IN-BROWSER WORKSPACE</span>
          <h3 style={{ marginBottom: "12px", color: "#ffffff", fontSize: "18px" }}>
            Python Programming Basics
          </h3>
          <div
            style={{
              background: "#080c16",
              padding: "16px",
              borderRadius: "12px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#67eadb",
              lineHeight: "1.7",
              marginBottom: "16px"
            }}
          >
            <div>name = "Python learner"</div>
            <div>print(f"Hello, {'{'}name{'}'}!")</div>
            <div style={{ color: "#a5b4fc" }}># Your first Python program</div>
            <div style={{ color: "#f59e0b" }}>Output: Hello, Python learner!</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={{ padding: "12px", background: "#111829", borderRadius: "10px" }}>
              <small style={{ color: "#8d98b0" }}>Learning Path</small>
              <div style={{ fontWeight: "700", color: "#ffffff" }}>Python Fundamentals</div>
            </div>
            <div style={{ padding: "12px", background: "#111829", borderRadius: "10px" }}>
              <small style={{ color: "#8d98b0" }}>Course Status</small>
              <div style={{ fontWeight: "700", color: "#22c55e" }}>Available Now</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2>Why Choose Smart Python Analysis?</h2>
          <p>
            At Smart Python Analysis (SPA), we believe that learning programming should be simple, practical, and
            accessible to everyone. Our goal is to help learners build a strong foundation in Python programming
            through structured learning, hands-on practice, and continuous improvement.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🐍</div>
            <h3>1. Beginner-Friendly Learning</h3>
            <p>
              Our learning approach is designed to help beginners understand Python concepts step by step, starting
              with the fundamentals and gradually progressing to more advanced topics.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>2. Practical Coding Experience</h3>
            <p>
              We emphasize learning by doing. Through coding exercises, daily challenges, and practical examples,
              learners can apply their knowledge and improve their problem-solving skills.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>3. Structured Python Courses</h3>
            <p>
              Our Python learning content is organized into clear, manageable sections, helping students follow a
              learning path and develop their programming skills systematically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>4. Learning Resources</h3>
            <p>
              Access learning materials such as video lessons, notes, and coding practice resources designed to
              support your understanding of Python programming.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧩</div>
            <h3>5. Coding Practice and Challenges</h3>
            <p>
              Strengthen your logical thinking and programming confidence by practicing coding problems and
              completing challenges that encourage consistent learning.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>6. AI-Assisted Learning Support</h3>
            <p>
              AI-assisted learning support to clarify concepts and make practice more interactive is coming soon.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>7. Progress-Based Learning</h3>
            <p>
              Work through course sections, practice consistently, and track your learning progress as you move
              towards your goals.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>8. Course Completion Certificate</h3>
            <p>
              Learners who successfully complete the required course and assessment criteria can receive a course
              completion certificate in accordance with SPA's certification process.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>9. Skill Development for the Future</h3>
            <p>
              We aim to help learners develop programming knowledge, logical reasoning, and practical skills that
              can support their academic growth and future career opportunities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>10. Learn at Your Own Pace</h3>
            <p>
              Build your understanding step by step, revisit learning materials when needed, and develop your skills
              through consistent practice.
            </p>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: "40px" }}>
          <p>
            Start your Python journey with Smart Python Analysis and take the next step towards becoming a confident
            programmer.
          </p>
          <p><strong>Smart Python Analysis — Learn Today, Build Tomorrow.</strong></p>
        </div>
      </section>

      {/* FEATURED COURSES PREVIEW */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2>Python Programming Course</h2>
          <p>
            Python Programming is currently available. Additional technology courses will be announced soon.
          </p>
        </div>

        <div className="course-preview-grid">
          <div className="course-card-preview">
            <div>
              <span className="badge-tag" style={{ background: "rgba(0, 212, 255, 0.15)", color: "#00d4ff" }}>
                AVAILABLE NOW
              </span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "20px", color: "#ffffff" }}>
                Python Programming
              </h3>
              <p style={{ color: "#8d98b0", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                Learn Python fundamentals, practice problem-solving, and build confidence writing your own programs.
              </p>
            </div>
            <div>
              <button
                className="btn-secondary"
                style={{ width: "100%" }}
                onClick={() => {
                  onSelectCourse("python");
                  navigate("/courses");
                }}
              >
                View Course & Enroll →
              </button>
            </div>
          </div>

          <div className="course-card-preview">
            <div>
              <span className="badge-tag" style={{ background: "rgba(124, 92, 255, 0.15)", color: "#c084fc" }}>
                COMING SOON
              </span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "20px", color: "#ffffff" }}>
                Data Analysis & Visualization
              </h3>
              <p style={{ color: "#8d98b0", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                This learning track is planned for a future release. Python Programming is available now.
              </p>
            </div>
            <div>
              <button
                className="btn-secondary"
                style={{ width: "100%" }}
                type="button"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>

          <div className="course-card-preview">
            <div>
              <span className="badge-tag" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
                COMING SOON
              </span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "20px", color: "#ffffff" }}>
                Machine Learning
              </h3>
              <p style={{ color: "#8d98b0", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                This course will be introduced in a future learning update. Python Programming is available now.
              </p>
            </div>
            <div>
              <button
                className="btn-secondary"
                style={{ width: "100%" }}
                type="button"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="cta-banner">
          <div>
            <h2>Ready to Start Learning Python?</h2>
            <p>Join Smart Python Analysis and build your programming skills step by step.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => openAuthChoice("register")}>
              Create Free Account
            </button>
            <button className="btn-secondary" onClick={() => openAuthChoice("login")}>
              Login to Workspace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
