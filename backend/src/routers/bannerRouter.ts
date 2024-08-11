import { Router } from "express";
import {
  getBanners,
  createBanner,
  getBannerById,
  updateBannerById,
} from "../controllers/bannerController";

const bannerRouter = Router();

// Route to get all banners
bannerRouter.get("/", getBanners);

// Route to create a new banner
bannerRouter.post("/", createBanner);

// Route to get a banner by ID
bannerRouter.get("/:id", getBannerById);

// Route to update a banner by ID
bannerRouter.put("/:id", updateBannerById);

export default bannerRouter;
