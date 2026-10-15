
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend server is running",
  });
});

// Start the server only when this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Export the Express app for automated tests
module.exports = app;

