import express from "express"
import { today_details } from "../controllers/dashboardController.js";


const router = express.Router()

router.post('/today', today_details)

export default router;