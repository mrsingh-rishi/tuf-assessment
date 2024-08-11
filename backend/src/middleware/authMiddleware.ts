import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/interface";

// Middleware function to handle authentication
export const authMiddleware = (
  req: AuthRequest, // Custom request object
  res: Response, // Express response object
  next: NextFunction // Next function to pass control to the next middleware
) => {
  // Retrieve the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and follows the format "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If not, send a 401 Unauthorized response
    res.status(401).json({ error: "No token provided" });
    return;
  }

  // Extract the token from the Authorization header
  // The token is expected to be in the format "Bearer <token>", so we split and take the second part
  const token = authHeader.split(" ")[1];

  // Verify the token using the JWT secret
  // `process.env.JWT_SECRET` should be replaced with your actual secret key or set as an environment variable
  jwt.verify(
    token,
    process.env.JWT_SECRET || "your_jwt_secret_key",
    (err, decoded) => {
      // If there is an error in token verification, send a 401 Unauthorized response
      if (err) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      // If the token is valid, attach the decoded token data to the request object
      // This allows subsequent middleware or route handlers to access user information from `req.user`
      req.user = decoded; // Ensure `req.user` is added to the Request interface

      // Pass control to the next middleware or route handler
      next();
    }
  );
};
