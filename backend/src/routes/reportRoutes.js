import express from 'express';
import { getReport, createReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/trips/:tripId/report')
  .get(protect, getReport)
  .post(protect, createReport);

export default router;
