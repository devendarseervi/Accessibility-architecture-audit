
import { useEffect, useState } from "react";
import "./App.css";

const auditIssues = [
  {
    id: "A11Y-01",
    title: "Service category list semantics",
    wcag: "1.3.1 Info and Relationships (candidate)",
    severity: "Medium",
    status: "Open — structure unverified",
    impact:
      "Screen-reader users may receive incorrect list semantics.",
    evidence:
      "Lighthouse flagged #serviceByCategoryList, a UL element with role=listitem.",
    fix:
      "Inspect the DOM, remove the inappropriate listitem role from the UL, and verify its LI children.",
  },
  {
    id: "A11Y-02",
    title: "Footer text contrast",
    wcag: "1.4.3 Contrast (Minimum), Level AA (candidate)",
    severity: "Medium",
    status: "Open — ratios not captured",
    impact:
      "People with low vision may struggle to read affected text.",
    evidence:
      "Lighthouse flagged footer links and paragraphs using text-gray-300.",
    fix:
      "Measure foreground/background contrast and adjust it to WCAG AA requirements.",
  },
  {
    id: "A11Y-03",
    title: "Initiatives carousel keyboard access",
    wcag: "Manual WCAG validation required",
    severity: "Medium",
    status: "Open — keyboard test pending",
    impact:
      "Keyboard and screen-reader users may encounter focusable links hidden from assistive technologies.",
    evidence:
      "Lighthouse flagged links inside carousel slides marked aria-hidden=true.",
    fix:
      "Prevent inactive slides from receiving keyboard focus and verify active slide behavior.",
  },
  {
    id: "A11Y-04",
    title: "Footer and expandable control target size",
    wcag: "2.5.8 Target Size (Minimum), Level AA (candidate)",
    severity: "Low–Medium",
    status: "Needs verification",
    impact:
      "Touchscreen users and people with motor difficulties may struggle to activate controls.",
    evidence:
      "Lighthouse flagged footer links and an expandable button. Dimensions have not been measured.",
    fix:
      "Measure target sizes and spacing, then check applicable WCAG requirements and exceptions.",
  },
  {
    id: "A11Y-05",
    title: "Flagship service image alternatives",
    wcag: "Potential redundant alternative text",
    severity: "Low",
    status: "Needs verification",
    impact:
      "Some screen-reader users may hear duplicate descriptions.",
    evidence:
      "Lighthouse flagged four images whose alt text matches adjacent text. A WCAG failure has not been established.",
    fix:
      "Inspect each image and link; use empty alt text for decorative or redundant images, or meaningful alternative text where needed.",
  },
];

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.json();
      })
      .then((data) => setBackendStatus(data.message))
      .catch(() => setBackendStatus("Backend is unavailable"));
  }, []);

  return (
    <main>
      <header className="page-header">
        <p className="eyebrow">AUDIT WORKSPACE</p>
        <h1>Accessibility Audit Platform</h1>
        <p className="subtitle">
          Review findings, understand user impact, and track remediation.
        </p>
      </header>

      <section className="summary-card" aria-labelledby="summary-title">
        <div>
          <p className="card-label">DOCUMENTED FINDINGS</p>
          <h2 id="summary-title">{auditIssues.length}</h2>
          <p>Issues requiring review or verification</p>
        </div>
        <div className="backend-status">
          <span className="status-dot" aria-hidden="true" />
          <div>
            <strong>Backend health</strong>
            <p role="status">{backendStatus}</p>
          </div>
        </div>
      </section>

      <section className="issues-section" aria-labelledby="issues-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FINDINGS REGISTER</p>
            <h2 id="issues-title">Accessibility findings</h2>
          </div>
          <span className="issue-count">{auditIssues.length} findings</span>
        </div>

        <div className="table-wrapper">
          <table>
            <caption className="sr-only">
              Accessibility findings, severity, status, and details controls
            </caption>
            <thead>
              <tr>
                <th scope="col">Issue</th>
                <th scope="col">Finding</th>
                <th scope="col">Severity</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {auditIssues.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <span className="issue-id">{issue.id}</span>
                  </td>
                  <td>{issue.title}</td>
                  <td>
                    <span className={`severity severity-${issue.severity === "Low" ? "low" : issue.severity === "Medium" ? "medium" : "mixed"}`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td>{issue.status}</td>
                  <td>
                    <button
                      type="button"
                      className="details-button"
                      aria-expanded={selectedIssue === issue.id}
                      onClick={() =>
                        setSelectedIssue(
                          selectedIssue === issue.id ? null : issue.id
                        )
                      }
                    >
                      {selectedIssue === issue.id ? "Hide details" : "View details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedIssue && (
          <div className="issue-details" aria-live="polite">
            {auditIssues
              .filter((issue) => issue.id === selectedIssue)
              .map((issue) => (
                <article key={issue.id}>
                  <h3>
                    {issue.id}: {issue.title}
                  </h3>
                  <p><strong>WCAG reference:</strong> {issue.wcag}</p>
                  <p><strong>Evidence:</strong> {issue.evidence}</p>
                  <p><strong>User impact:</strong> {issue.impact}</p>
                  <p><strong>Recommended fix:</strong> {issue.fix}</p>
                  <p><strong>Status:</strong> {issue.status}</p>
                </article>
              ))}
          </div>
        )}
      </section>

      <footer className="page-footer">
        Findings are provisional until the required manual checks are completed.
      </footer>
    </main>
  );
}

export default App;
