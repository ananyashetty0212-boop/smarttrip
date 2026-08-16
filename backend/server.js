import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

import healthRoute from './src/routes/healthRoute.js';
import authRoutes from './src/routes/authRoutes.js';
import tripRoutes from './src/routes/tripRoutes.js';
import itineraryRoutes from './src/routes/itineraryRoutes.js';
import expenseRoutes from './src/routes/expenseRoutes.js';
import activityRoutes from './src/routes/activityRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import reportRoutes from './src/routes/reportRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

const app = express();

// Enable CORS & JSON Body Parser
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Register REST API Routes
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api', itineraryRoutes);
app.use('/api', expenseRoutes);
app.use('/api', activityRoutes);
app.use('/api', reviewRoutes);
app.use('/api', reportRoutes);
app.use('/api/users', userRoutes);

// Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SmartTrip Express Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📡 Health Endpoint: http://localhost:${PORT}/api/health`);
});
