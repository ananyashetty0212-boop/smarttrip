import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'smarttrip_super_secret_jwt_key_2026';
  return jwt.sign({ id }, secret, { expiresIn: process.env.JWT_EXPIRES_IN || '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, travelPreferences } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    // Check if user exists (if DB connected)
    if (User.db?.readyState === 1) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }

      const user = await User.create({ name, email, password, travelPreferences });
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          travelPreferences: user.travelPreferences,
          token
        }
      });
    }

    // Fallback response if DB offline
    const mockId = `usr-${Date.now()}`;
    const token = generateToken(mockId);
    return res.status(201).json({
      success: true,
      data: { _id: mockId, name, email, travelPreferences: travelPreferences || {}, token }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (User.db?.readyState === 1) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            travelPreferences: user.travelPreferences,
            token
          }
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Fallback authentication response
    const mockId = `usr-alex-123`;
    const token = generateToken(mockId);
    return res.json({
      success: true,
      data: {
        _id: mockId,
        name: 'Alex Rivera',
        email: email,
        travelPreferences: { style: 'Adventure' },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    if (User.db?.readyState === 1 && req.user._id) {
      const user = await User.findById(req.user._id).select('-password');
      return res.json({ success: true, data: user });
    }
    return res.json({
      success: true,
      data: {
        _id: req.user?._id || 'usr-alex-123',
        name: req.user?.name || 'Alex Rivera',
        email: req.user?.email || 'alex.rivera@smarttrip.ai',
        travelPreferences: { style: 'Adventure & Heritage' }
      }
    });
  } catch (error) {
    next(error);
  }
};
