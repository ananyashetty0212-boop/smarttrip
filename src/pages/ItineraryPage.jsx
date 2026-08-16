import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Sparkles, 
  RefreshCw, 
  Edit3, 
  BookmarkCheck, 
  Play, 
  PieChart, 
  CloudSun, 
  Check, 
  Plus
} from 'lucide-react';

export const ItineraryPage = () => {
  const { activeTrip, navigateTo, setActiveTrip } = useTrip();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 1000);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      
      {/* Header Banner Spotlight */}
      <GlassCard style={{
        padding: '2.5rem',
        marginBottom: '2.5rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
        borderColor: 'rgba(6, 182, 212, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Badge variant="cyan">AI Synthetic Schedule</Badge>
              <Badge variant="emerald">Confidence 98.4%</Badge>
            </div>
            <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>{activeTrip.destination}</h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <span><Calendar style={{ width: '15px', height: '15px', color: '#06b6d4', display: 'inline', marginRight: '4px' }} /> {activeTrip.startDate} ({activeTrip.durationDays} Days)</span>
              <span><DollarSign style={{ width: '15px', height: '15px', color: '#10b981', display: 'inline', marginRight: '2px' }} /> Budget: ${activeTrip.totalAllocatedBudget} Total</span>
              <span><CloudSun style={{ width: '15px', height: '15px', color: '#f59e0b', display: 'inline', marginRight: '4px' }} /> {activeTrip.weatherForecast?.temp || '28°C'}</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button 
              className="btn-secondary btn-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 style={{ width: '15px', height: '15px' }} />
              <span>{isEditing ? 'Done Editing' : 'Edit Plan'}</span>
            </button>

            <button 
              className="btn-secondary btn-sm"
              onClick={handleRegenerate}
              disabled={isRegenerating}
            >
              <RefreshCw style={{ width: '15px', height: '15px' }} className={isRegenerating ? 'animate-spin' : ''} />
              <span>Regenerate</span>
            </button>

            <button 
              className="btn-outline-cyan btn-sm"
              onClick={handleSave}
            >
              <BookmarkCheck style={{ width: '15px', height: '15px' }} />
              <span>{savedSuccess ? 'Trip Saved!' : 'Save Trip'}</span>
            </button>

            <button 
              className="btn-primary btn-sm"
              onClick={() => navigateTo('during-trip')}
            >
              <Play style={{ width: '15px', height: '15px' }} />
              <span>Launch Live Trip</span>
            </button>
          </div>
        </div>

        {/* Preferences Quick Bar */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Preferences Applied:</span>
          <span className="badge badge-indigo">{activeTrip.travelStyle}</span>
          <span className="badge badge-amber">{activeTrip.foodPreference}</span>
          <span className="badge badge-cyan">{activeTrip.accommodationType}</span>
          <span className="badge badge-emerald">{activeTrip.transportationPreference}</span>
        </div>
      </GlassCard>

      {/* Main Layout: Itinerary Timeline & Quick Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }} className="grid-3">
        
        {/* Left Column: Day-by-Day Timeline */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Day-by-Day Travel Schedule</h2>
            <button className="btn-secondary btn-sm" onClick={() => navigateTo('budget')}>
              <PieChart style={{ width: '15px', height: '15px', color: '#10b981' }} /> View Budget Split
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {activeTrip.itinerary.map((dayPlan, dayIdx) => (
              <GlassCard key={dayPlan.day} style={{ padding: '1.75rem', position: 'relative' }}>
                
                {/* Day Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      background: 'var(--gradient-primary)',
                      color: '#fff',
                      fontWeight: 800,
                      padding: '0.4rem 0.85rem',
                      borderRadius: '10px',
                      fontSize: '0.9rem'
                    }}>
                      Day {dayPlan.day}
                    </div>
                    <h3 style={{ fontSize: '1.2rem' }}>{dayPlan.title}</h3>
                  </div>

                  <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                    Est. Day Cost: ${dayPlan.activities.reduce((acc, a) => acc + (a.cost || 0), 0)}
                  </span>
                </div>

                {/* Activities Timeline List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {dayPlan.activities.map((act) => (
                    <div 
                      key={act.id}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '1rem',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{
                          minWidth: '85px',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: '#06b6d4',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}>
                          <Clock style={{ width: '13px', height: '13px' }} /> {act.time}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', color: '#f8fafc' }}>{act.title}</h4>
                            <Badge variant={
                              act.category === 'Food' ? 'amber' :
                              act.category === 'Sightseeing' ? 'cyan' :
                              act.category === 'Accommodation' ? 'indigo' : 'emerald'
                            } style={{ fontSize: '0.65rem' }}>
                              {act.category || 'Activity'}
                            </Badge>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                            <MapPin style={{ width: '13px', height: '13px', color: '#6366f1' }} /> {act.location}
                          </p>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: act.cost > 0 ? '#10b981' : '#94a3b8' }}>
                          {act.cost > 0 ? `$${act.cost}` : 'Free'}
                        </span>
                        {isEditing && (
                          <div style={{ fontSize: '0.75rem', color: '#06b6d4', cursor: 'pointer', marginTop: '0.2rem' }}>
                            Edit Activity
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <button 
                    className="btn-secondary btn-sm" 
                    style={{ width: '100%', marginTop: '1rem', justifyContent: 'center', borderStyle: 'dashed' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Activity to Day {dayPlan.day}
                  </button>
                )}

              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: AI Insights & Quick Links */}
        <div>
          <GlassCard style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles style={{ width: '18px', height: '18px', color: '#06b6d4' }} /> AI Weather & Route Tips
            </h3>

            <div style={{ fontSize: '0.88rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                <strong style={{ color: '#06b6d4' }}>Optimal Weather Slot:</strong> Day 1 sunset at Fort Aguada has zero rain probability. Ideal for photography.
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <strong style={{ color: '#10b981' }}>Transit Optimization:</strong> Scooter rental in Sinquerim saves ~40% compared to airport taxis.
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#f8fafc' }}>Next Action Steps</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigateTo('during-trip')}>
                Start Live Trip Mode
              </button>
              <button className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigateTo('budget')}>
                Budget & Expense Tracker
              </button>
              <button className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigateTo('report')}>
                Preview Trip Report
              </button>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};
