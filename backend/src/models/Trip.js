import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    destination: { type: String, required: true },
    startingLocation: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    duration: { type: Number, required: true },
    travelers: { type: Number, default: 1 },
    budget: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    travelStyle: { type: String, default: 'Adventure' },
    interests: [{ type: String }],
    foodPreference: { type: String, default: 'Local' },
    accommodationPreference: { type: String, default: 'Resort' },
    transportationPreference: { type: String, default: 'Public Transit' },
    status: { type: String, enum: ['Upcoming', 'Active', 'Completed', 'Draft'], default: 'Upcoming' }
  },
  { timestamps: true }
);

export const Trip = mongoose.model('Trip', tripSchema);
