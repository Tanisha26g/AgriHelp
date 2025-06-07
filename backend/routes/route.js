import express from "express";
import { getLeafImagePrediction } from "../controllers/ImageController.js";

const router = express.Router();

router.post('/leaf',getLeafImagePrediction);

export default router;