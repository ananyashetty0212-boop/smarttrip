import mongoose from 'mongoose';

const activitySubSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  startTime: { type: String, default: '' },
  endTime: { type: String, default: '' },
  category: { type: String, default: 'Sightseeing' },
  estimatedCost: { type: Number, default: 0 },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
});

const itinerarySchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
    day: { type: Number, required: true },
    date: { type: String, default: '' },
    activities: [activitySubSchema],
    estimatedCost: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Itinerary = mongoose.model('Itinerary', itinerarySchema);
