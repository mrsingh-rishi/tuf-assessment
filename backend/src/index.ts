import express from "express"; // Import the Express library
import cors from "cors"; // Import the CORS middleware for handling cross-origin requests
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import router from "./routers"; // Import the router that contains all the route handlers

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

// Define the port on which the server will listen
// Use the PORT environment variable if defined, otherwise default to 8000
const port = process.env.PORT || 8000;

// Enable CORS (Cross-Origin Resource Sharing) for all origins
app.use(cors());

// Parse incoming JSON requests and make the data available in req.body
app.use(express.json());

// Register the router for handling routes under the path "/api/v1/"
app.use("/api/v1/", router);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server starts successfully
  console.log(`Server is running on port ${port}`);
});
