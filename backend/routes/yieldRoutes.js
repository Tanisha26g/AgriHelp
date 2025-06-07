// routes/yieldRoutes.js
import express from 'express';
import {submitCrop} from '../controllers/yieldController.js'

const router = express.Router();

router.post('/submit-crop', submitCrop);

export default router;
