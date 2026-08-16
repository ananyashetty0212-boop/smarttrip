import { TripActivity } from '../models/TripActivity.js';
import { Itinerary } from '../models/Itinerary.js';

// @desc    Update trip activity completion status / notes / rating
// @route   PUT /api/trips/:tripId/activities/:id
export const updateTripActivity = async (req, res, next) => {
  try {
    const { tripId, id } = req.params;
    const { status, completed, notes, rating } = req.body;

    if (TripActivity.db?.readyState === 1) {
      let activityRecord = await TripActivity.findOne({ tripId, itineraryActivityId: id });
      if (!activityRecord) {
        activityRecord = new TripActivity({
          tripId,
          itineraryActivityId: id,
          status: completed ? 'Completed' : status || 'Pending',
          notes: notes || '',
          rating: rating || 0,
          completedAt: completed ? new Date() : null
        });
      } else {
        if (status) activityRecord.status = status;
        if (typeof completed === 'boolean') {
          activityRecord.status = completed ? 'Completed' : 'Pending';
          activityRecord.completedAt = completed ? new Date() : null;
        }
        if (notes !== undefined) activityRecord.notes = notes;
        if (rating !== undefined) activityRecord.rating = rating;
      }
      await activityRecord.save();

      // Also update completion state in Itinerary subdocument if present
      await Itinerary.updateOne(
        { tripId, 'activities._id': id },
        { $set: { 'activities.$.completed': completed } }
      );

      return res.json({ success: true, data: activityRecord });
    }

    return res.json({
      success: true,
      data: {
        tripId,
        itineraryActivityId: id,
        status: completed ? 'Completed' : 'Pending',
        notes: notes || '',
        rating: rating || 5
      }
    });
  } catch (error) {
    next(error);
  }
};
