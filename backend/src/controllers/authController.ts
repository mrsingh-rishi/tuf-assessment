import { Request, Response } from "express";
import prisma from "../prisma/src/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT Secret Key (Make sure to store this in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

/**
 * Controller for user signup
 *
 * @param req - Express request object containing user data (email, password) in the body
 * @param res - Express response object
 *
 * Handles user registration by hashing the password and storing the user in the database.
 * Returns a success message or an error if the signup fails.
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

/**
 * Controller for user login
 *
 * @param req - Express request object containing user credentials (email, password) in the body
 * @param res - Express response object
 *
 * Handles user authentication by verifying the password and generating a JWT token.
 * Returns the token and a success message or an error if authentication fails.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
