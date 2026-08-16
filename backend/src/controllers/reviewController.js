import { Review } from '../models/Review.js';

// @desc    Get reviews for a trip
// @route   GET /api/trips/:tripId/reviews
export const getReviews = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user?._id;

    if (Review.db?.readyState === 1 && userId) {
      const reviews = await Review.find({ tripId, userId }).sort({ createdAt: -1 });
      return res.json({ success: true, count: reviews.length, data: reviews });
    }

    return res.json({
      success: true,
      data: [
        { _id: 'rev-1', tripId, placeName: 'Thalassa Restaurant', rating: 5, comment: 'Incredible Goan sunset and fresh seafood!' },
        { _id: 'rev-2', tripId, placeName: 'Aguada Fort', rating: 5, comment: 'Historical lighthouse architecture with sea views.' }
      ]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a review for a place
// @route   POST /api/trips/:tripId/reviews
export const createReview = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user?._id || 'usr-alex-123';
    const { placeName, rating, comment } = req.body;

    if (!placeName || !rating) {
      return res.status(400).json({ success: false, message: 'Please provide place name and rating' });
    }

    if (Review.db?.readyState === 1) {
      const review = await Review.create({
        tripId,
        userId,
        placeName,
        rating: parseInt(rating),
        comment: comment || ''
      });
      return res.status(201).json({ success: true, data: review });
    }

    return res.status(201).json({
      success: true,
      data: { _id: `rev-${Date.now()}`, tripId, userId, placeName, rating: parseInt(rating), comment: comment || '' }
    });
  } catch (error) {
    next(error);
  }
};
