import mongoose from 'mongoose';

const tripActivitySchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
    itineraryActivityId: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Skipped'], default: 'Pending' },
    notes: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

export const TripActivity = mongoose.model('TripActivity', tripActivitySchema);
