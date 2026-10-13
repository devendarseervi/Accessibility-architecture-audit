
const express = require("express");

const app = express();
const PORT = 5000;

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
