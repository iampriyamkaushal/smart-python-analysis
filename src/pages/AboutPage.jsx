import { useNavigate } from "react-router-dom";
import priyamPhoto from "../assets/priyamphoto.jpeg";
import sauravPhoto from "../assets/sauravphoto.png";
import aarzooPhoto from "../assets/aarzoophoto.jpeg";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <section className="page">
      <h1 className="page-title about-page-heading"><img src="/logo.png" alt="" />Smart Python Analysis (SPA)</h1>
      <p className="page-subtitle">Learn • Practice • Analyze • Grow</p>

      <div className="workspace-card" style={{ padding: "35px", marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "14px", color: "#ffffff" }}>About Our Company</h2>
        <p style={{ color: "#cbd5e1", lineHeight: "1.8", marginBottom: "16px" }}>
          Smart Python Analysis (SPA) is an educational initiative dedicated to making programming education more
          accessible, practical, and engaging. Our goal is to help learners build strong technical foundations through
          structured courses, hands-on coding practice, and continuous learning.
        </p>
        <p style={{ color: "#cbd5e1", lineHeight: "1.8", marginBottom: "16px" }}>
          At SPA, we believe that learning programming is not just about understanding concepts; it is about applying
          knowledge, solving problems, and developing the confidence to create meaningful solutions. We aim to provide
          a supportive learning environment where students can strengthen their skills, explore new opportunities, and
          progress towards their professional goals.
        </p>
        <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
          Through our commitment to practical education, innovation, and continuous improvement, we aspire to build a
          learning platform that encourages curiosity, creativity, and technical excellence. Our mission is to empower
          learners with the knowledge, skills, and confidence they need to grow in the world of technology.
        </p>
      </div>

      <h2 className="page-title" style={{ fontSize: "30px" }}>Meet Our Leadership Team</h2>
      <p className="page-subtitle">The People Behind SPA</p>
      <p className="page-subtitle" style={{ marginTop: "-20px" }}>
        Our leadership team brings together a shared vision, collaborative decision-making, and a commitment to
        building and developing Smart Python Analysis. Each member contributes to the organization's growth through
        their respective responsibilities and dedication.
      </p>
      <div className="features-grid" style={{ marginBottom: "40px" }}>
        <div className="feature-card">
          <img className="leadership-photo" src={priyamPhoto} alt="Priyam Kaushal" />
          <h3>Priyam Kaushal</h3>
          <p style={{ marginBottom: "12px" }}>Co-Founder &amp; Chief Executive Officer (CEO)</p>
          <p style={{ marginBottom: "12px" }}>
            As Co-Founder and CEO, Priyam Kaushal shares the responsibility of shaping the company's vision, strategic
            direction, and long-term development. His focus is on building an effective educational platform, exploring
            opportunities for growth, and supporting initiatives that enhance the learning experience.
          </p>
          <p style={{ marginBottom: "12px" }}>
            He believes in practical knowledge, continuous improvement, and accessible technical education. Through
            collaboration and forward-thinking ideas, he aims to help learners develop valuable programming skills and
            prepare for future opportunities in technology.
          </p>
          <p><strong>Contact:</strong> +91-8002809608</p>
        </div>

        <div className="feature-card">
          <img className="leadership-photo" src={sauravPhoto} alt="Saurav Sharma" />
          <h3>Saurav Sharma</h3>
          <p style={{ marginBottom: "12px" }}>Co-Founder &amp; Chief Executive Officer (CEO)</p>
          <p style={{ marginBottom: "12px" }}>
            As Co-Founder and CEO, Saurav Sharma is an equal partner in the company's vision, leadership, and strategic
            decision-making. He shares responsibility for guiding the organization's development and contributing to
            its long-term objectives.
          </p>
          <p style={{ marginBottom: "12px" }}>
            With a focus on teamwork, planning, and continuous progress, he aims to help build a structured and
            learner-focused educational platform. His contribution supports SPA's commitment to practical learning,
            skill development, and meaningful educational opportunities for aspiring technology professionals.
          </p>
          <p><strong>Contact:</strong> +91-7856898920</p>
        </div>

        <div className="feature-card">
          <img className="leadership-photo" src={aarzooPhoto} alt="Aarzoo Kumari" />
          <h3>Aarzoo Kumari</h3>
          <p style={{ marginBottom: "12px" }}>Senior Manager</p>
          <p style={{ marginBottom: "12px" }}>
            Aarzoo Kumari serves as Senior Manager at Smart Python Analysis, holding a key management position within
            the organization's leadership structure. Working within the framework established by the Co-Founders, she
            contributes to managerial coordination, team collaboration, and the effective execution of responsibilities.
          </p>
          <p style={{ marginBottom: "12px" }}>
            Through coordination, communication, and a commitment to shared objectives, she supports the smooth
            functioning and continued development of the organization, helping create an organized, productive, and
            growth-oriented working environment.
          </p>
          <p><strong>Contact:</strong> +91-6200257255</p>
        </div>
      </div>

      <div className="features-grid" style={{ marginBottom: "40px" }}>
        <div className="feature-card">
          <div className="feature-icon">🔭</div>
          <h3>Our Vision</h3>
          <p>
            To create an accessible and engaging learning environment where individuals can develop practical
            programming skills, strengthen their problem-solving abilities, and prepare for opportunities in the
            evolving technology industry.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            Our mission is to make programming education structured, practical, and learner-focused. We aim to encourage
            continuous learning, hands-on experience, and skill development so that students can transform their
            knowledge into meaningful capabilities.
          </p>
        </div>
      </div>

      <h2 className="page-title" style={{ fontSize: "30px" }}>Our Core Values</h2>
      <div className="features-grid" style={{ marginBottom: "40px" }}>
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Learning</h3>
          <p>We believe that continuous learning is the foundation of personal and professional growth.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>Innovation</h3>
          <p>We encourage creative thinking, new ideas, and the exploration of better ways to learn and solve problems.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Collaboration</h3>
          <p>We value teamwork, mutual respect, and shared responsibility in achieving our goals.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✓</div>
          <h3>Integrity</h3>
          <p>We aim to maintain honesty, transparency, and responsibility in our work and professional relationships.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Excellence</h3>
          <p>We strive for continuous improvement in our educational content, learning experience, and organizational practices.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌱</div>
          <h3>Growth</h3>
          <p>We believe that consistent effort, practical experience, and a willingness to improve help individuals reach their potential.</p>
        </div>
      </div>

      <div className="workspace-card" style={{ padding: "35px" }}>
        <h2 style={{ marginBottom: "14px", color: "#ffffff" }}>A Message From Our Team</h2>
        <p style={{ color: "#cbd5e1", lineHeight: "1.8", marginBottom: "16px" }}>
          At Smart Python Analysis, we believe that every learner deserves the opportunity to explore technology,
          develop practical skills, and build confidence through education. Our journey is guided by a shared vision of
          creating meaningful learning experiences and encouraging students to keep moving forward.
        </p>
        <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
          As a team, we value collaboration, responsibility, and continuous improvement. We are committed to developing
          SPA step by step, strengthening our educational approach, and building a platform that supports learners
          throughout their programming journey.
        </p>
        <h3 style={{ color: "#ffffff", marginTop: "20px" }}>Smart Python Analysis — Learn Today, Build Tomorrow.</h3>

        <div style={{ marginTop: "25px" }}>
          <button className="btn-primary" onClick={() => navigate("/courses")}>
            Explore Our Courses →
          </button>
        </div>
      </div>
    </section>
  );
}
