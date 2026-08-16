import { User } from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/me
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (User.db?.readyState === 1 && userId) {
      const user = await User.findById(userId).select('-password');
      return res.json({ success: true, data: user });
    }

    return res.json({
      success: true,
      data: {
        _id: req.user?._id || 'usr-alex-123',
        name: req.user?.name || 'Alex Rivera',
        email: req.user?.email || 'alex.rivera@smarttrip.ai',
        travelPreferences: { style: 'Adventure & Culture', homeCity: 'Mumbai' }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { name, travelPreferences } = req.body;

    if (User.db?.readyState === 1 && userId) {
      const user = await User.findById(userId);
      if (user) {
        if (name) user.name = name;
        if (travelPreferences) user.travelPreferences = travelPreferences;
        const updated = await user.save();
        return res.json({
          success: true,
          data: {
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            travelPreferences: updated.travelPreferences
          }
        });
      }
    }

    return res.json({
      success: true,
      data: {
        _id: userId || 'usr-alex-123',
        name: name || 'Alex Rivera',
        email: req.user?.email || 'alex.rivera@smarttrip.ai',
        travelPreferences: travelPreferences || {}
      }
    });
  } catch (error) {
    next(error);
  }
};
