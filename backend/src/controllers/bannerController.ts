import { Request, Response } from "express";
import prisma from "../prisma/src/client";

/**
 * Get all banners from the database.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * Fetches all the banners from the database using Prisma's `findMany` method
 * and sends them as a JSON response. If an error occurs, a 500 status code
 * with an error message is sent back.
 */
export const getBanners = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all banners from the database
    const banners = await prisma.banner.findMany();
    // Send the fetched banners as a JSON response
    res.json(banners);
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    res.status(500).json({ error: "Failed to fetch banners" });
  }
};

/**
 * Create a new banner in the database.
 *
 * @param req - Express request object containing the banner data in the body.
 * @param res - Express response object.
 *
 * Extracts the `title` and `imageUrl` from the request body and creates a new banner
 * in the database using Prisma's `create` method. The created banner is then sent back
 * as a JSON response. If an error occurs, a 500 status code with an error message is sent back.
 */
export const createBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, imageUrl } = req.body; // Destructure title and imageUrl from the request body

  try {
    // Create a new banner in the database with the provided data
    const newBanner = await prisma.banner.create({
      data: { title, imageUrl },
    });
    // Send the created banner as a JSON response with a 201 status code
    res.status(201).json(newBanner);
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    res.status(500).json({ error: "Failed to create banner" });
  }
};

/**
 * Get a specific banner by its ID.
 *
 * @param req - Express request object containing the banner ID in the params.
 * @param res - Express response object.
 *
 * Extracts the `id` from the request parameters and fetches the corresponding banner
 * from the database using Prisma's `findUnique` method. If the banner is found, it is sent
 * back as a JSON response. If no banner is found, a 404 status code with an error message is sent.
 * If an error occurs during the process, a 500 status code with an error message is sent.
 */
export const getBannerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Extract the banner ID from the request parameters

  try {
    // Fetch the banner with the specified ID from the database
    const banner = await prisma.banner.findUnique({
      where: { id: parseInt(id, 10) }, // Convert the ID to a number
    });

    if (!banner) {
      // If no banner is found, send a 404 status code with an error message
      res.status(404).json({ error: "Banner not found" });
      return;
    }

    // Send the found banner as a JSON response
    res.json(banner);
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    res.status(500).json({ error: "Failed to fetch banner" });
  }
};

/**
 * Update a specific banner by its ID.
 *
 * @param req - Express request object containing the banner ID in the params and the update data in the body.
 * @param res - Express response object.
 *
 * Extracts the `id` from the request parameters and the `title` and `imageUrl` from the request body.
 * The banner with the specified ID is then updated in the database using Prisma's `update` method.
 * The updated banner is sent back as a JSON response. If an error occurs during the process,
 * a 500 status code with an error message is sent.
 */
export const updateBannerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Extract the banner ID from the request parameters
  const { title, imageUrl } = req.body; // Destructure title and imageUrl from the request body

  try {
    // Update the banner with the specified ID in the database
    const updatedBanner = await prisma.banner.update({
      where: { id: parseInt(id, 10) }, // Convert the ID to a number
      data: { title, imageUrl }, // Use the provided title and imageUrl for the update
    });

    // Send the updated banner as a JSON response
    res.json(updatedBanner);
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    res.status(500).json({ error: "Failed to update banner" });
  }
};
