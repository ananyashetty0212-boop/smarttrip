import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr || connStr.includes('<username>')) {
      console.warn('⚠️ MONGODB_URI is not configured in backend/.env. Database features will operate in mock fallback mode until Atlas URI is provided.');
      return false;
    }
    const conn = await mongoose.connect(connStr);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Operating backend API with graceful fallback data.');
    return false;
  }
};
