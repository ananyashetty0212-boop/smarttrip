import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { 
  Sparkles, 
  MapPin, 
  Navigation, 
  Calendar, 
  Users, 
  DollarSign, 
  Compass, 
  Utensils, 
  Hotel, 
  Car, 
  Loader2, 
  ArrowRight,
  Zap
} from 'lucide-react';

export const CreateTripPage = () => {
  const { createNewTrip, isGenerating } = useTrip();

  const [formData, setFormData] = useState({
    destination: 'Goa, India',
    startingLocation: 'Mumbai',
    startDate: '2026-10-10',
    endDate: '2026-10-14',
    durationDays: 5,
    travelers: 2,
    budgetTier: 'Moderate',
    budgetAmount: 1000,
    travelStyle: 'Adventure & Culture',
    interests: ['Beaches', 'Seafood', 'Heritage Sites'],
    foodPreference: 'Seafood & Local Goan',
    accommodationType: 'Boutique Beach Resort',
    transportationPreference: 'Rental Scooter & Taxi'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      const updated = exists 
        ? prev.interests.filter(item => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTrip(formData);
  };

  const presetDestinations = ['Goa, India', 'Tokyo, Japan', 'Paris, France', 'Bali, Indonesia', 'Swiss Alps', 'Santorini, Greece'];
  const interestOptions = ['Beaches', 'Nightlife', 'Museums', 'Hiking', 'Seafood', 'Shopping', 'Yoga & Wellness', 'Photography'];

  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '900px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <Badge variant="cyan" style={{ marginBottom: '0.5rem' }}>
          <Sparkles style={{ width: '14px', height: '14px' }} /> AI Neural Engine 2.0
        </Badge>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Plan Your AI Travel Journey</h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Configure your travel preferences below. Our cloud AI will synthesize optimal day-by-day routes, cost estimates, and climate forecasts.
        </p>
      </div>

      {isGenerating ? (
        <GlassCard style={{ textAlign: 'center', padding: '5rem 2rem', borderColor: 'var(--accent-cyan)' }}>
          <div style={{ display: 'inline-flex', padding: '1.25rem', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', marginBottom: '1.5rem' }}>
            <Loader2 style={{ width: '48px', height: '48px', color: '#06b6d4' }} className="animate-spin" />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Synthesizing AI Itinerary...</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
            Analyzing multi-modal weather predictions, localized spot reviews, transit costs, and optimal timing for {formData.destination}...
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <Badge variant="indigo">Weather Sync</Badge>
            <Badge variant="emerald">Budget Calibration</Badge>
            <Badge variant="amber">Route Optimization</Badge>
          </div>
        </GlassCard>
      ) : (
        <GlassCard style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Destination & Starting Location */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                <MapPin style={{ width: '20px', height: '20px', color: '#06b6d4' }} /> Destination & Departure
              </h3>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <MapPin style={{ width: '15px', height: '15px' }} /> Target Destination
                  </label>
                  <input 
                    type="text" 
                    name="destination"
                    className="form-control"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Goa, Tokyo, Paris..."
                    required
                  />
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', alignSelf: 'center' }}>Popular:</span>
                    {presetDestinations.map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, destination: dest }))}
                        style={{
                          background: formData.destination === dest ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          color: formData.destination === dest ? '#06b6d4' : '#cbd5e1',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '6px',
                          padding: '0.15rem 0.5rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        {dest.split(',')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Navigation style={{ width: '15px', height: '15px' }} /> Starting Location
                  </label>
                  <input 
                    type="text" 
                    name="startingLocation"
                    className="form-control"
                    value={formData.startingLocation}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, Delhi, London..."
                    required
                  />
                </div>
              </div>
            </div>

            <hr style={{ borderColor: 'var(--border-subtle)', marginBottom: '2rem' }} />

            {/* Step 2: Dates, Duration & Travelers */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                <Calendar style={{ width: '20px', height: '20px', color: '#6366f1' }} /> Dates & Travelers
              </h3>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input 
                    type="date" 
                    name="startDate"
                    className="form-control"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Duration (Days)</label>
                  <input 
                    type="number" 
                    name="durationDays"
                    className="form-control"
                    value={formData.durationDays}
                    onChange={handleChange}
                    min="1"
                    max="30"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Users style={{ width: '15px', height: '15px' }} /> Number of Travelers
                  </label>
                  <select 
                    name="travelers"
                    className="form-control form-select"
                    value={formData.travelers}
                    onChange={handleChange}
                  >
                    <option value={1}>Solo Traveler (1)</option>
                    <option value={2}>Couple / Duo (2)</option>
                    <option value={3}>Small Group (3)</option>
                    <option value={4}>Family Group (4)</option>
                    <option value={6}>Large Tour Party (6+)</option>
                  </select>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: 'var(--border-subtle)', marginBottom: '2rem' }} />

            {/* Step 3: Budget & Preferences */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                <DollarSign style={{ width: '20px', height: '20px', color: '#10b981' }} /> Budget & Travel Preferences
              </h3>

              <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Total Estimated Budget ($ USD)</label>
                  <input 
                    type="number" 
                    name="budgetAmount"
                    className="form-control"
                    value={formData.budgetAmount}
                    onChange={handleChange}
                    placeholder="e.g. 1000"
                    step="50"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Travel Style</label>
                  <select 
                    name="travelStyle"
                    className="form-control form-select"
                    value={formData.travelStyle}
                    onChange={handleChange}
                  >
                    <option value="Adventure & Outdoor">Adventure & Outdoor</option>
                    <option value="Culture & Heritage">Culture & Heritage</option>
                    <option value="Relaxing Beach & Leisure">Relaxing Beach & Leisure</option>
                    <option value="Nightlife & Party">Nightlife & Party</option>
                    <option value="Luxury & Gourmet">Luxury & Gourmet</option>
                    <option value="Family Friendly">Family Friendly</option>
                  </select>
                </div>
              </div>

              {/* Specific Interests Checkboxes */}
              <div className="form-group">
                <label className="form-label">
                  <Compass style={{ width: '15px', height: '15px' }} /> Specific Interests & Highlights
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {interestOptions.map((interest) => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        style={{
                          background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          color: isSelected ? '#06b6d4' : '#cbd5e1',
                          border: isSelected ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.4rem 0.85rem',
                          fontSize: '0.85rem'
                        }}
                      >
                        {isSelected ? '✓ ' : '+ '}{interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <hr style={{ borderColor: 'var(--border-subtle)', marginBottom: '2rem' }} />

            {/* Step 4: Food, Accommodation & Transport */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                <Utensils style={{ width: '20px', height: '20px', color: '#f59e0b' }} /> Logistics & Dining
              </h3>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">
                    <Utensils style={{ width: '14px', height: '14px' }} /> Food Preference
                  </label>
                  <select 
                    name="foodPreference"
                    className="form-control form-select"
                    value={formData.foodPreference}
                    onChange={handleChange}
                  >
                    <option value="Seafood & Local Goan">Seafood & Local Specialties</option>
                    <option value="Vegetarian Only">Vegetarian Only</option>
                    <option value="Vegan & Plant-Based">Vegan & Plant-Based</option>
                    <option value="Halal Certified">Halal Certified</option>
                    <option value="Multi-Cuisine & International">Multi-Cuisine & International</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Hotel style={{ width: '14px', height: '14px' }} /> Accommodation
                  </label>
                  <select 
                    name="accommodationType"
                    className="form-control form-select"
                    value={formData.accommodationType}
                    onChange={handleChange}
                  >
                    <option value="Boutique Beach Resort">Boutique Beach Resort</option>
                    <option value="5-Star Luxury Hotel">5-Star Luxury Hotel</option>
                    <option value="Private Airbnb Villa">Private Airbnb Villa</option>
                    <option value="Budget Hostel / Guesthouse">Budget Hostel / Guesthouse</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Car style={{ width: '14px', height: '14px' }} /> Transportation
                  </label>
                  <select 
                    name="transportationPreference"
                    className="form-control form-select"
                    value={formData.transportationPreference}
                    onChange={handleChange}
                  >
                    <option value="Rental Scooter & Taxi">Rental Scooter & Taxi</option>
                    <option value="Private Car Chauffeur">Private Car Chauffeur</option>
                    <option value="Public Transit & Buses">Public Transit & Buses</option>
                    <option value="Self-Drive Rental SUV">Self-Drive Rental SUV</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <button 
              type="submit" 
              className="btn-primary" 
              style={{
                width: '100%',
                justify: 'center',
                padding: '1rem',
                fontSize: '1.1rem',
                borderRadius: '14px'
              }}
            >
              <Zap style={{ width: '22px', height: '22px' }} />
              <span>Generate My AI Itinerary</span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>

          </form>
        </GlassCard>
      )}

    </div>
  );
};
