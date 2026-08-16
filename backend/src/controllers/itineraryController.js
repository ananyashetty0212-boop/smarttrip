import { Itinerary } from '../models/Itinerary.js';

// @desc    Get itinerary for a trip
// @route   GET /api/trips/:tripId/itinerary
export const getItinerary = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    if (Itinerary.db?.readyState === 1) {
      const itineraries = await Itinerary.find({ tripId }).sort({ day: 1 });
      return res.json({ success: true, count: itineraries.length, data: itineraries });
    }

    return res.json({
      success: true,
      count: 2,
      data: [
        {
          _id: 'itin-day-1',
          tripId,
          day: 1,
          date: '2026-09-10',
          estimatedCost: 125,
          activities: [
            { title: 'Check-in at Beach Resort', location: 'Sinquerim', category: 'Accommodation', estimatedCost: 80, completed: true },
            { title: 'Lunch at Thalassa Greek Tavern', location: 'Vagator', category: 'Food', estimatedCost: 35, completed: true }
          ]
        },
        {
          _id: 'itin-day-2',
          tripId,
          day: 2,
          date: '2026-09-11',
          estimatedCost: 65,
          activities: [
            { title: 'Old Goa Portuguese Heritage Walk', location: 'Old Goa', category: 'Sightseeing', estimatedCost: 15, completed: false },
            { title: 'Spice Plantation Tour', location: 'Ponda', category: 'Activities', estimatedCost: 25, completed: false }
          ]
        }
      ]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create itinerary for a trip
// @route   POST /api/trips/:tripId/itinerary
export const createItinerary = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { day, date, activities, estimatedCost } = req.body;

    if (Itinerary.db?.readyState === 1) {
      const itinerary = await Itinerary.create({
        tripId,
        day: day || 1,
        date: date || new Date().toISOString().split('T')[0],
        activities: activities || [],
        estimatedCost: estimatedCost || 0
      });
      return res.status(201).json({ success: true, data: itinerary });
    }

    return res.status(201).json({
      success: true,
      data: { _id: `itin-${Date.now()}`, tripId, day: day || 1, activities: activities || [] }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an itinerary day
// @route   PUT /api/itinerary/:id
export const updateItinerary = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (Itinerary.db?.readyState === 1) {
      const updated = await Itinerary.findByIdAndUpdate(id, req.body, { new: true });
      return res.json({ success: true, data: updated });
    }

    return res.json({ success: true, data: { _id: id, ...req.body } });
  } catch (error) {
    next(error);
  }
};
