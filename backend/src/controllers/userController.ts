import { Request, Response } from "express";
import prisma from "../prisma/src/client";

/**
 * @route GET /users
 * @desc Retrieves a list of all users
 *
 * This route fetches all users from the database. It uses Prisma to query
 * the `user` model and returns a list of user records in JSON format.
 *
 * If the retrieval is successful, the users are returned with a `200 OK` status.
 * If there is an error, a `500 Internal Server Error` is returned.
 *
 * @access Public
 *
 * @example
 * GET /users
 * Response: [ { "id": 1, "email": "user@example.com", "name": "John Doe" }, ... ]
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * @route POST /users
 * @desc Creates a new user
 *
 * This route allows for the creation of a new user. The request should
 * include `email`, `password`, and `name` in the JSON body. The password
 * should be hashed before being stored in the database to ensure security.
 *
 * If the user is created successfully, a `201 Created` status and the new
 * user’s data are returned. If there is an error during user creation,
 * a `500 Internal Server Error` is returned.
 *
 * @access Public
 *
 * @example
 * POST /users
 * Request Body: { "email": "newuser@example.com", "password": "securepassword", "name": "Jane Doe" }
 * Response: { "id": 2, "email": "newuser@example.com", "name": "Jane Doe" }
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { email, password, name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

/**
 * @route GET /users/:id
 * @desc Retrieves a user by ID
 *
 * This route fetches a specific user from the database using the user ID
 * provided in the URL path parameter. The ID should be a valid integer.
 *
 * If the user is found, their data is returned with a `200 OK` status.
 * If no user is found with the given ID, a `404 Not Found` status is returned.
 * If there is an error during the retrieval process, a `500 Internal Server Error` is returned.
 *
 * @access Public
 *
 * @param {number} id - The ID of the user to retrieve
 *
 * @example
 * GET /users/1
 * Response: { "id": 1, "email": "user@example.com", "name": "John Doe" }
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

/**
 * @route PUT /users/:id
 * @desc Updates a user by ID
 *
 * This route allows for updating an existing user's information. The user ID
 * should be provided in the URL path parameter. The request body should include
 * any fields to be updated (e.g., `email`, `password`, `name`).
 *
 * If the user is updated successfully, the updated user’s data is returned
 * with a `200 OK` status. If no user is found with the given ID, a `404 Not Found`
 * status is returned. If there is an error during the update process, a
 * `500 Internal Server Error` is returned.
 *
 * @access Public
 *
 * @param {number} id - The ID of the user to update
 * @param {object} body - The fields to update in the user record
 *
 * @example
 * PUT /users/1
 * Request Body: { "email": "updateduser@example.com", "name": "John Doe Updated" }
 * Response: { "id": 1, "email": "updateduser@example.com", "name": "John Doe Updated" }
 */
export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { email, password, name } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { email, password, name },
    });

    res.json(updatedUser);
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma error code for record not found
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
};
