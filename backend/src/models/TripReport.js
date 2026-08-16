import mongoose from 'mongoose';

const tripReportSchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    summary: { type: String, required: true },
    days: { type: Number, default: 1 },
    totalPlannedBudget: { type: Number, required: true },
    totalActualExpense: { type: Number, required: true },
    placesVisited: { type: Number, default: 0 },
    ratings: { type: Number, default: 5 },
    recommendations: [{ type: String }]
  },
  { timestamps: true }
);

export const TripReport = mongoose.model('TripReport', tripReportSchema);
