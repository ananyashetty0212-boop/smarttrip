import { Trip } from '../models/Trip.js';
import { Itinerary } from '../models/Itinerary.js';

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
export const createTrip = async (req, res, next) => {
  try {
    // Get the authenticated MongoDB user
    const userId = req.user?._id;

    // User must be authenticated
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    const {
      destination,
      startingLocation,
      startDate,
      endDate,
      duration,
      travelers,
      budget,
      currency,
      travelStyle,
      interests,
      foodPreference,
      accommodationPreference,
      transportationPreference
    } = req.body;

    // Validate required fields
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide destination, start date, and end date'
      });
    }

    // Make sure MongoDB is connected
    if (Trip.db?.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please try again later.'
      });
    }

    // Create the trip
    const trip = await Trip.create({
      userId,
      destination,
      startingLocation: startingLocation || '',
      startDate,
      endDate,
      duration: duration || 5,
      travelers: travelers || 1,
      budget: budget || 1000,
      currency: currency || 'USD',
      travelStyle: travelStyle || 'Adventure',
      interests: interests || [],
      foodPreference: foodPreference || 'Local',
      accommodationPreference:
        accommodationPreference || 'Resort',
      transportationPreference:
        transportationPreference || 'Public Transit',
      status: 'Upcoming'
    });

    console.log(
      `✅ Trip created successfully: ${trip._id} for user ${userId}`
    );

    // Create initial itinerary
    try {
      await Itinerary.create([
        {
          tripId: trip._id,
          day: 1,
          date: startDate,
          estimatedCost: Math.round((budget || 1000) * 0.2),
          activities: [
            {
              title: `Arrival in ${destination} & Check-in`,
              location: destination,
              category: 'Accommodation',
              estimatedCost: 100,
              completed: false
            },
            {
              title: 'Welcome Orientation & Local Dining',
              location: 'City Center',
              category: 'Food',
              estimatedCost: 40,
              completed: false
            }
          ]
        },
        {
          tripId: trip._id,
          day: 2,
          date: startDate,
          estimatedCost: Math.round((budget || 1000) * 0.25),
          activities: [
            {
              title: `Guided Highlight Tour (${travelStyle || 'Heritage'
                })`,
              location: 'Historical Quarter',
              category: 'Sightseeing',
              estimatedCost: 30,
              completed: false
            },
            {
              title: 'Local Evening Market',
              location: 'Main Street',
              category: 'Activities',
              estimatedCost: 20,
              completed: false
            }
          ]
        }
      ]);

      console.log(`✅ Initial itinerary created for trip ${trip._id}`);
    } catch (itineraryError) {
      // Trip is already saved, so don't fail the entire request
      console.error(
        '⚠️ Could not create initial itinerary:',
        itineraryError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip
    });
  } catch (error) {
    console.error('❌ Create Trip Error:', error.message);
    next(error);
  }
};


// @desc    Get user's trips
// @route   GET /api/trips
// @access  Private
export const getTrips = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    if (Trip.db?.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected'
      });
    }

    // Only return trips belonging to this user
    const trips = await Trip.find({
      userId
    }).sort({
      createdAt: -1
    });

    return res.json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    console.error('❌ Get Trips Error:', error.message);
    next(error);
  }
};


// @desc    Get single trip by ID
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    if (Trip.db?.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected'
      });
    }

    const trip = await Trip.findOne({
      _id: id,
      userId
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or unauthorized access'
      });
    }

    return res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('❌ Get Trip Error:', error.message);
    next(error);
  }
};


// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    if (Trip.db?.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected'
      });
    }

    const trip = await Trip.findOneAndUpdate(
      {
        _id: id,
        userId
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or unauthorized access'
      });
    }

    console.log(`✅ Trip updated: ${id}`);

    return res.json({
      success: true,
      message: 'Trip updated successfully',
      data: trip
    });
  } catch (error) {
    console.error('❌ Update Trip Error:', error.message);
    next(error);
  }
};


// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    if (Trip.db?.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected'
      });
    }

    const trip = await Trip.findOneAndDelete({
      _id: id,
      userId
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or unauthorized access'
      });
    }

    // Also remove itinerary associated with this trip
    try {
      await Itinerary.deleteMany({
        tripId: id
      });
    } catch (itineraryError) {
      console.error(
        '⚠️ Could not delete trip itinerary:',
        itineraryError.message
      );
    }

    console.log(`🗑️ Trip deleted: ${id}`);

    return res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete Trip Error:', error.message);
    next(error);
  }
};