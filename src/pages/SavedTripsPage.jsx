import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { 
  Bookmark, 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Trash2, 
  ExternalLink, 
  PlusCircle, 
  CloudSun,
  Sparkles
} from 'lucide-react';

export const SavedTripsPage = () => {
  const { savedTrips, setActiveTrip, navigateTo } = useTrip();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Upcoming', 'Active', 'Completed'];

  const filteredTrips = savedTrips.filter(trip => {
    const matchesTab = activeTab === 'All' || trip.status === activeTab;
    const matchesSearch = trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.travelStyle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSelectTrip = (trip) => {
    setActiveTrip(trip);
    navigateTo('itinerary');
  };

  return (
    <div className="page-wrapper animate-fade-in">
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <Badge variant="cyan" style={{ marginBottom: '0.4rem' }}>
            <Bookmark style={{ width: '12px', height: '12px' }} /> Travel History & Bucketlist
          </Badge>
          <h1 style={{ fontSize: '2.2rem' }}>Saved Trips ({savedTrips.length})</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Access all your past, active, and upcoming AI generated itineraries.
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => navigateTo('planner')}
        >
          <PlusCircle style={{ width: '18px', height: '18px' }} />
          <span>Plan New Journey</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard style={{ padding: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                  color: activeTab === tab ? '#06b6d4' : '#94a3b8',
                  border: activeTab === tab ? '1px solid #06b6d4' : '1px solid transparent',
                  borderRadius: '10px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: activeTab === tab ? 600 : 500,
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#94a3b8'
            }} />
            <input 
              type="text"
              className="form-control"
              placeholder="Search destination or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem', fontSize: '0.85rem' }}
            />
          </div>

        </div>
      </GlassCard>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <GlassCard style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '1rem' }}>No saved trips matching your search filter.</p>
          <button className="btn-outline-cyan btn-sm" onClick={() => { setSearchQuery(''); setActiveTab('All'); }}>
            Reset Filters
          </button>
        </GlassCard>
      ) : (
        <div className="grid-3">
          {filteredTrips.map((trip) => (
            <GlassCard key={trip.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <Badge variant={trip.status === 'Completed' ? 'emerald' : trip.status === 'Upcoming' ? 'indigo' : 'cyan'}>
                    {trip.status}
                  </Badge>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>${trip.totalAllocatedBudget}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', color: '#f8fafc' }}>{trip.destination}</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  {trip.travelStyle} • {trip.durationDays} Days
                </p>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  color: '#cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar style={{ width: '13px', height: '13px', color: '#06b6d4' }} /> {trip.startDate}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin style={{ width: '13px', height: '13px', color: '#6366f1' }} /> Departure: {trip.startingLocation}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleSelectTrip(trip)}
                >
                  <ExternalLink style={{ width: '14px', height: '14px' }} /> View Itinerary
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

    </div>
  );
};
