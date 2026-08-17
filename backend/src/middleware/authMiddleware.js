import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET =
  process.env.JWT_SECRET || 'smarttrip_super_secret_jwt_key_2026';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }

    // Check Bearer format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid authorization format'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, empty token'
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token payload'
      });
    }

    // Try to find the user in MongoDB
    let user = null;

    try {
      user = await User.findById(decoded.id).select('-password');
    } catch (dbError) {
      console.warn(
        'User lookup failed, using decoded JWT user:',
        dbError.message
      );
    }

    // If user exists, attach it
    if (user) {
      req.user = user;
    } else {
      // Fallback to JWT information
      req.user = {
        _id: decoded.id,
        name: decoded.name || 'SmartTrip User',
        email: decoded.email || ''
      };
    }

    // Continue to controller
    next();

  } catch (error) {
    console.error('AUTH MIDDLEWARE ERROR:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};