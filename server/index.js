// Load environment variables from .env file
require("dotenv").config();

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
require("./database/client").checkConnection();

// Import the Express application from app/config.js
const app = require("./app/config");

// Add a root GET route
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

// Add a new GET route
app.get("/new-route", (req, res) => {
  res.send("Hello from the new route!");
});

// Get the port from the environment variables
const port = process.env.APP_PORT || 3300; // Ensure the server listens on port 3310

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
