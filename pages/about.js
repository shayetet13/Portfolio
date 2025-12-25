import SEOHead from "../components/SEOHead";
import JsonLd from "../components/JsonLd";

export default function About() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nid",
    url: "https://devnid.xyz",
    sameAs: [
      "https://github.com/your-github",
      "https://linkedin.com/in/your-linkedin",
    ],
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "Tech Company",
    },
    knowsAbout: [
      "Software Development",
      "System Design",
      "Docker",
      "Next.js",
      "Microservices",
      "Cloud Computing",
      "การเขียนโปรแกรม",
      "การพัฒนาเว็บ",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your University",
    },
  };

  return (
    <>
      <SEOHead
        title="เกี่ยวกับ Nid - Software Developer และ Technical Writer | devnid.xyz"
        description="ประสบการณ์และความเชี่ยวชาญของ Nid ในด้าน Software Development, System Design, Docker, Next.js และเทคโนโลยีสมัยใหม่อื่นๆ พร้อมแชร์ความรู้ผ่านบทความภาษาไทย"
        url="https://devnid.xyz/about"
        type="profile"
        keywords="Nid, software developer thailand, เกี่ยวกับผู้เขียน, โปรแกรมเมอร์ไทย, นักพัฒนาซอฟต์แวร์"
      />
      <JsonLd data={personSchema} />

      <div className="about-container">
        <article className="about-content">
          <header className="about-header">
            <h1>เกี่ยวกับ Nid</h1>
            <p className="subtitle">Software Developer & Technical Writer</p>
          </header>

          <section className="intro-section">
            <h2>👋 สวัสดีครับ</h2>
            <p>
              ผมชื่อ <strong>Kao</strong> เป็น Software Developer
              ที่มีความหลงใหลในการพัฒนาระบบ
              และการแชร์ความรู้ผ่านการเขียนบทความทางเทคนิค
              บล็อก(เว็ป)นี้เกิดขึ้นจากความต้องการ
              ที่จะบันทึกและแบ่งปันประสบการณ์ที่ได้เรียนรู้มาในสายงาน Software
              Development
            </p>
          </section>

          <section className="expertise-section">
            <h2>🚀 ความเชี่ยวชาญ</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>System Design & Architecture</h3>
                <ul>
                  <li>การออกแบบระบบขนาดใหญ่</li>
                  <li>Microservices Architecture</li>
                  <li>Distributed Systems</li>
                  <li>Load Balancing & Scaling</li>
                </ul>
              </div>

              <div className="skill-category">
                <h3>Container & Cloud Technology</h3>
                <ul>
                  <li>Docker & Container Orchestration</li>
                  <li>Kubernetes</li>
                  <li>AWS, Google Cloud, Azure</li>
                  <li>Infrastructure as Code (IaC)</li>
                </ul>
              </div>

              <div className="skill-category">
                <h3>Web Development</h3>
                <ul>
                  <li>Next.js, React, Vue.js</li>
                  <li>Node.js, Express</li>
                  <li>RESTful API, GraphQL</li>
                  <li>TypeScript, JavaScript</li>
                </ul>
              </div>

              <div className="skill-category">
                <h3>DevOps & Tools</h3>
                <ul>
                  <li>CI/CD Pipelines</li>
                  <li>Git, GitHub Actions</li>
                  <li>Monitoring & Logging</li>
                  <li>Database Design</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="experience-section">
            <h2>💼 ประสบการณ์</h2>
            <p>
              มีประสบการณ์ในการพัฒนา Software มาหลายปี ได้ทำงานกับทีมต่างๆ
              ในการสร้างระบบ ที่มีผู้ใช้งานจำนวนมาก ได้เรียนรู้จากปัญหาจริงในการ
              Scale และ Maintain ระบบขนาดใหญ่ ตั้งแต่การจัดการ Traffic สูง
              ไปจนถึงการออกแบบ Database ที่มีประสิทธิภาพ
            </p>
          </section>

          <section className="blog-mission-section">
            <h2>📝 เป้าหมายของบล็อก</h2>
            <div className="mission-content">
              <p>
                บล็อก <strong>devnid.xyz</strong> เกิดขึ้นจากความต้องการที่จะ:
              </p>
              <ul>
                <li>
                  <strong>แชร์ประสบการณ์จริง</strong> -
                  จากการทำงานในโปรเจกต์จริง
                </li>
                <li>
                  <strong>อธิบายแนวคิดซับซ้อน</strong> -
                  ให้เข้าใจง่ายด้วยภาษาไทย
                </li>
                <li>
                  <strong>รวบรวมความรู้</strong> - ที่กระจัดกระจายในแหล่งต่างๆ
                </li>
                <li>
                  <strong>สร้างชุมชน</strong> - ของนักพัฒนาไทยที่แชร์ความรู้กัน
                </li>
              </ul>
            </div>
          </section>

          <section className="contact-section">
            <h2>📞 ติดต่อ</h2>
            <p>หากมีคำถามหรือต้องการสนทนาเรื่องเทคนิค สามารถติดต่อได้ผ่าน:</p>
            <div className="contact-links">
              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="icon">🐙</span>
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <a href="mailto:your-email@example.com" className="contact-link">
                <span className="icon">📧</span>
                <span>Email</span>
              </a>
            </div>
          </section>
        </article>
      </div>

      <style jsx>{`
        .about-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.7;
        }

        .about-content {
          color: #333;
        }

        .about-header {
          text-align: center;
          margin-bottom: 50px;
          padding-bottom: 30px;
          border-bottom: 2px solid #f0f0f0;
        }

        .about-header h1 {
          font-size: 3em;
          margin-bottom: 15px;
          color: #2c3e50;
          font-weight: 700;
        }

        .subtitle {
          font-size: 1.3em;
          color: #7f8c8d;
          margin: 0;
          font-weight: 400;
        }

        section {
          margin-bottom: 50px;
        }

        section h2 {
          color: #2c3e50;
          font-size: 1.8em;
          margin-bottom: 25px;
          padding-bottom: 10px;
          border-bottom: 3px solid #3498db;
          display: inline-block;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .skill-category {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 12px;
          border-left: 4px solid #3498db;
        }

        .skill-category h3 {
          margin-bottom: 15px;
          color: #2c3e50;
          font-size: 1.2em;
        }

        .skill-category ul {
          list-style: none;
          padding: 0;
        }

        .skill-category li {
          padding: 8px 0;
          color: #555;
          position: relative;
          padding-left: 20px;
        }

        .skill-category li:before {
          content: "▸";
          color: #3498db;
          position: absolute;
          left: 0;
        }

        .mission-content ul {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-top: 15px;
        }

        .contact-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 25px;
          background: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .contact-link:hover {
          background: #2980b9;
          transform: translateY(-2px);
        }

        .icon {
          font-size: 1.2em;
        }

        @media (max-width: 768px) {
          .about-container {
            padding: 20px 15px;
          }

          .about-header h1 {
            font-size: 2.2em;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .contact-links {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
