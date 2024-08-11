import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
} from "../controllers/userController";

const userRouter = Router();

/**
 * @route GET /users
 * @desc Retrieves a list of all users
 * @access Public
 *
 * This route calls the `getUsers` controller function to fetch all user records
 * from the database. The response is a JSON array of user objects.
 */
userRouter.get("/", getUsers);

/**
 * @route POST /users
 * @desc Creates a new user
 * @access Public
 *
 * This route calls the `createUser` controller function to create a new user
 * record in the database. The request body must include `email`, `password`,
 * and `name`. The response includes the newly created user object.
 */
userRouter.post("/", createUser);

/**
 * @route GET /users/:id
 * @desc Retrieves a user by ID
 * @access Public
 *
 * This route calls the `getUserById` controller function to fetch a specific
 * user record from the database using the user ID provided in the URL path.
 * If the user is found, their data is returned; otherwise, a `404 Not Found`
 * error is sent.
 *
 * @param {number} id - The ID of the user to retrieve
 */
userRouter.get("/:id", getUserById);

/**
 * @route PUT /users/:id
 * @desc Updates a user by ID
 * @access Public
 *
 * This route calls the `updateUserById` controller function to update an
 * existing user's information in the database. The user ID is provided in
 * the URL path, and the request body may include fields to update such as
 * `email`, `password`, and `name`. The response includes the updated user
 * object, or a `404 Not Found` error if the user does not exist.
 *
 * @param {number} id - The ID of the user to update
 */
userRouter.put("/:id", updateUserById);

export default userRouter;
