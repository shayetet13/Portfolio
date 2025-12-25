import { useState, useEffect } from "react";

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Extract headings from content
    const headingElements = document.querySelectorAll("h2, h3, h4");
    const headingList = Array.from(headingElements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setHeadings(headingList);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
        threshold: 0.1,
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="table-of-contents">
      <h3>📋 สารบัญ</h3>
      <nav>
        <ul>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`toc-item level-${heading.level} ${
                activeId === heading.id ? "active" : ""
              }`}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="toc-link"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .table-of-contents {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
          position: sticky;
          top: 20px;
        }

        .table-of-contents h3 {
          margin: 0 0 15px 0;
          color: #495057;
          font-size: 1.1em;
        }

        .table-of-contents ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toc-item {
          margin-bottom: 8px;
        }

        .toc-item.level-2 {
          padding-left: 0;
        }

        .toc-item.level-3 {
          padding-left: 20px;
        }

        .toc-item.level-4 {
          padding-left: 40px;
        }

        .toc-link {
          background: none;
          border: none;
          color: #6c757d;
          text-decoration: none;
          font-size: 0.9em;
          cursor: pointer;
          padding: 5px 0;
          display: block;
          width: 100%;
          text-align: left;
          transition: color 0.2s ease;
        }

        .toc-link:hover {
          color: #007bff;
        }

        .toc-item.active .toc-link {
          color: #007bff;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .table-of-contents {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default TableOfContents;
