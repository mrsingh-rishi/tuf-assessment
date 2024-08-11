import { Router } from "express";
import { login, signup } from "../controllers/authController";

// Create a new instance of the Express Router
const authRouter = Router();

/**
 * @route POST /signup
 * @desc Handles user registration
 *
 * This route is responsible for registering new users. When a POST request is
 * made to this route with a JSON body containing `email`, `password`, and optionally
 * other user details, the signup controller function is called to create a new user
 * in the database. The password is hashed before storing to ensure security.
 *
 * On successful registration, a success message and the newly created user’s
 * information are returned. If the email is already in use, a `409 Conflict`
 * error is returned. If there’s an issue processing the request, a `500 Internal
 * Server Error` is returned.
 *
 * @access Public
 *
 * @example
 * POST /signup
 * Request Body: { "email": "newuser@example.com", "password": "securepassword" }
 * Response: { "message": "Signup successful", "user": { "id": 1, "email": "newuser@example.com" } }
 */
authRouter.post("/signup", signup);

/**
 * @route POST /login
 * @desc Handles user login
 *
 * This route is responsible for user authentication. When a POST request is
 * made to this route with a JSON body containing `email` and `password`,
 * the login controller function is called to verify the credentials. If
 * the credentials are valid, a JWT token is generated and returned to the
 * user. This token can be used for authenticating future requests.
 *
 * If the credentials are incorrect, a `401 Unauthorized` error is returned.
 * If there is an issue processing the request, a `500 Internal Server Error`
 * is returned.
 *
 * @access Public
 *
 * @example
 * POST /login
 * Request Body: { "email": "user@example.com", "password": "password123" }
 * Response: { "message": "Login successful", "token": "jwt_token_here" }
 */
authRouter.post("/login", login);

// Export the authRouter instance to be used in the main application
export default authRouter;
