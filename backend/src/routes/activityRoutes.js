import express from 'express';
import { updateTripActivity } from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/trips/:tripId/activities/:id', protect, updateTripActivity);

export default router;
