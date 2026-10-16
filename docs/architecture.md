# Project Architecture

## 1. Overview

This repository contains a full-stack application foundation and an accessibility audit of the National Portal of India Services website.

The application uses React and Vite for the frontend and Node.js with Express for the backend. The repository separates application code, documentation, and tests to keep responsibilities clear and maintenance manageable.

The original target URL, `https://services.india.gov.in/`, was unavailable for the audit. The replacement National Portal of India Services page, `https://www.india.gov.in/services`, is the current audit target.

## 2. Repository Structure

```text
internship_project/
├── client/                  # React and Vite frontend
│   └── src/                 # UI and frontend tests
├── server/                  # Express backend and API tests
├── docs/                    # Audit report and documentation
│   ├── accessibility-audit.csv
│   ├── architecture.md
│   └── evidence/
├── tests/                   # Root-level test resources, if applicable
├── .gitignore
└── README.md
```

## 3. Technology Stack

- **Frontend:** React, Vite, JavaScript, and CSS
- **Backend:** Node.js and Express
- **API communication:** HTTP requests
- **Testing:** Vitest and React Testing Library on the frontend; Node.js test runner and Supertest on the backend
- **Version control:** Git and GitHub

## 4. Component Responsibilities

### Client

The client contains the React user interface. The current dashboard displays accessibility audit findings and allows users to expand finding details. It also requests the backend health endpoint to display the backend's status.

### Server

The server uses Express to expose API endpoints. The current `GET /api/health` endpoint returns a JSON response indicating that the backend is running.

### Docs

The `docs/` directory contains the accessibility audit CSV, architecture documentation, and supporting evidence.

### Tests

Frontend tests verify dashboard rendering, backend-status handling, and the display of finding details. Backend tests verify the health endpoint response.

## 5. Boundaries and Data Flow

The client is responsible for presentation and user interaction. The server handles API requests and returns responses. The client communicates with the backend through HTTP endpoints instead of accessing server internals directly.

Current request flow:

1. A user opens the frontend dashboard.
2. The client requests `GET /api/health`.
3. The Express server returns a JSON response.
4. The client displays the backend connection status.

Accessibility findings are currently defined in the frontend and documented separately in `docs/accessibility-audit.csv`. They are not yet loaded dynamically from the backend.

## 6. Local Setup

### Prerequisites

- Git
- Node.js LTS
- npm

### Start the backend

Open a terminal:

```powershell
cd server
npm install
npm start
```

The backend runs at `http://localhost:5000`.

Health endpoint: `http://localhost:5000/api/health`

### Start the frontend

Open a second terminal:

```powershell
cd client
npm install
npm run dev
```

Vite displays the local frontend URL in the terminal, usually `http://localhost:5173`.

### Run tests and checks

Run backend tests from the `server/` directory:

```powershell
npm test
```

Run frontend tests from the `client/` directory:

```powershell
npm test -- --run --reporter=verbose --maxWorkers=1
```

Run frontend linting and build checks from the `client/` directory:

```powershell
npm run lint
npm run build
```

## 7. First Vertical Feature Slice

The first vertical feature slice connects the frontend dashboard to the backend health endpoint.

It includes:

1. A React dashboard.
2. An Express health endpoint.
3. An HTTP request from the client to the server.
4. A visible backend status in the interface.
5. Automated tests for the endpoint and dashboard behavior.

## 8. Current Status

- Frontend dashboard implemented.
- Backend health endpoint implemented.
- Client-server communication implemented for backend health status.
- Frontend and backend tests implemented.
- Frontend lint and production build checks pass.
- Accessibility findings documented in `docs/accessibility-audit.csv`.
- Manual verification of the recorded accessibility findings remains necessary where noted in the audit.

The audit records Lighthouse findings; they should not be treated as fully verified WCAG violations until the relevant DOM, keyboard behavior, contrast ratios, and target dimensions have been checked.
