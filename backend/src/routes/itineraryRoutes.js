import express from 'express';
import { getItinerary, createItinerary, updateItinerary } from '../controllers/itineraryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/trips/:tripId/itinerary')
  .get(protect, getItinerary)
  .post(protect, createItinerary);

router.route('/itinerary/:id')
  .put(protect, updateItinerary);

export default router;
