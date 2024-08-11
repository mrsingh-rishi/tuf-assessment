import { Router } from "express"; // Import the Router class from Express
import userRouter from "./userRouter"; // Import the user-related routes
import loginRouter from "./loginRouter"; // Import the login-related routes
import bannerRouter from "./bannerRouter"; // Import the banner-related routes

// Create a new router instance
const router = Router();

// Register the userRouter to handle routes prefixed with "/users"
router.use("/users", userRouter);

// Register the loginRouter to handle routes prefixed with "/login"
router.use("/auth", loginRouter);

// Register the bannerRouter to handle routes prefixed with "/banners"
router.use("/banners", bannerRouter);

// Export the configured router to be used in the main application file
export default router;
