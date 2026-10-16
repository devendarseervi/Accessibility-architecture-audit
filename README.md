# Accessibility Audit & Project Foundation

## Overview

This repository contains an accessibility audit of the National Portal of India Services page and the foundation for a full-stack web application.

**Current audit target:** [National Portal of India – Services](https://www.india.gov.in/services)

**Original target:** https://services.india.gov.in/ (unavailable during the audit)

The project documents observed accessibility concerns, supporting evidence, and recommended improvements. Findings are classified according to the evidence collected; items that have not been fully verified remain provisional.

## Objectives

- Conduct a Lighthouse accessibility audit.
- Investigate accessibility concerns through browser and keyboard checks.
- Record findings, evidence, potential user impact, and recommended fixes.
- Establish a maintainable React and Express project structure.
- Document the application architecture and local setup.
- Add automated tests for the frontend and backend.

## Repository Structure

- `client/` — React frontend built with Vite.
- `server/` — Express backend and API health endpoint.
- `docs/` — Accessibility audit CSV, architecture documentation, and supporting evidence.
- `tests/` — Reserved for additional project-level tests.

## Accessibility Audit

The audit findings are recorded in [`docs/accessibility-audit.csv`](docs/accessibility-audit.csv).

The audit currently documents five findings:

- **A11Y-01:** ARIA role compatibility in the service category list.
- **A11Y-02:** Potential footer text contrast issue.
- **A11Y-03:** Keyboard-focusable links inside hidden carousel content.
- **A11Y-04:** Potentially undersized footer targets.
- **A11Y-05:** Linked images with alternative text matching their link text.

These findings have supporting observations, but some require further verification. They should not be interpreted as confirmed WCAG violations or fixes unless the evidence establishes that conclusion.

## Local Setup

### Prerequisites

- Node.js and npm.
- Git.

### Backend

Open a terminal and run:

```powershell
cd server
npm install
npm start
```

The backend runs on port `5000` by default.

Health endpoint: http://localhost:5000/api/health

### Frontend

Open a second terminal and run:

```powershell
cd client
npm install
npm run dev
```

Vite displays the local development URL in the terminal, usually http://localhost:5173.

## Testing and Quality Checks

Run the backend tests:

```powershell
cd server
npm test
```

Run the frontend tests:

```powershell
cd client
npm test -- --run
```

Run the frontend lint check:

```powershell
cd client
npm run lint
```

Create a production build:

```powershell
cd client
npm run build
```

Run each command from the relevant directory.

## Architecture

See [`docs/architecture.md`](docs/architecture.md) for the frontend/backend structure, request flow, and development details.

## Current Status

- [x] Set up the repository and Git.
- [x] Create the React/Vite frontend.
- [x] Create the Express backend and health endpoint.
- [x] Add frontend and backend automated tests.
- [x] Document the project architecture.
- [x] Record five accessibility audit findings.
- [x] Collect and document supporting observations.
- [ ] Complete verification of provisional accessibility findings.
- [ ] Complete final project-wide review and validation.

## Scope and Limitations

This project documents an audit and a full-stack application foundation. Recording an accessibility finding does not mean the external website has been modified or that the issue has been fixed. Findings remain provisional when additional verification is needed.
