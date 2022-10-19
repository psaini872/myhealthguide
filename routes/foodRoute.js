import express from "express";

import {
  getFoodByDate,
  postFoodByDate,
  updateFoodByDate,
} from "../controllers/foodControllers.js";

const router = express.Router();
router.route("/").post(postFoodByDate);
router.route("/:id").get(getFoodByDate);

export default router;
