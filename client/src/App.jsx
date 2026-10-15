
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.json();
      })
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setStatus("Backend is unavailable");
      });
  }, []);

  return (
    <main>
      <h1>Accessibility Audit Platform</h1>
      <p>Frontend and backend connection test</p>

      <section>
        <h2>Backend Health</h2>
        <p role="status">{status}</p>
      </section>
    </main>
  );
}

export default App;
