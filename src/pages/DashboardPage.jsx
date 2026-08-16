import React from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Sparkles, 
  DollarSign, 
  Bookmark, 
  ArrowRight, 
  CloudSun, 
  Clock, 
  CheckCircle,
  Play
} from 'lucide-react';

export const DashboardPage = () => {
  const { user, navigateTo, activeTrip, savedTrips, setActiveTrip } = useTrip();

  return (
    <div className="page-wrapper animate-fade-in">
      
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--accent-cyan)',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.8rem' }}>Welcome back, {user.name}!</h1>
              <Badge variant="cyan" style={{ fontSize: '0.72rem' }}>{user.tier}</Badge>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
              Ready to plan your next journey or track your active trip in {activeTrip.destination}?
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn-primary btn-pulse-glow"
            onClick={() => navigateTo('planner')}
            style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
          >
            <PlusCircle style={{ width: '18px', height: '18px' }} />
            <span>Plan New Trip</span>
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigateTo('during-trip')}
          >
            <Play style={{ width: '16px', height: '16px', color: '#10b981' }} />
            <span>Launch Live Trip</span>
          </button>
        </div>
      </div>

      {/* Quick Statistics Grid */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        <ScrollReveal delay={0}>
          <GlassCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Total Trips Planned</span>
              <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                <MapPin style={{ width: '18px', height: '18px' }} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
              <AnimatedCounter end={savedTrips.length + 4} />
            </div>
            <div style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.25rem' }}>
              +2 trips created this month
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GlassCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Active / Upcoming</span>
              <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                <Calendar style={{ width: '18px', height: '18px' }} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>{activeTrip.destination.split(',')[0]}</div>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '0.25rem' }}>
              {activeTrip.startDate} • {activeTrip.durationDays} Days
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GlassCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Total Budget Allocated</span>
              <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                <DollarSign style={{ width: '18px', height: '18px' }} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
              <AnimatedCounter end={activeTrip.totalAllocatedBudget} prefix="$" />
            </div>
            <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '0.25rem' }}>
              Estimated cost: $725 (Optimized)
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <GlassCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>Saved Bucketlist</span>
              <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                <Bookmark style={{ width: '18px', height: '18px' }} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
              <AnimatedCounter end={6} suffix=" Places" />
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              Goa, Tokyo, Paris & more
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Main Section: Active Trip Spotlight & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.75rem', marginBottom: '3rem' }} className="grid-3">
        
        {/* Left: Active/Upcoming Trip Spotlight Card */}
        <ScrollReveal>
          <GlassCard style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Badge variant="cyan">Active Spotlight Trip</Badge>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>ID: {activeTrip.id}</span>
              </div>
              <button className="btn-outline-cyan btn-sm" onClick={() => navigateTo('itinerary')}>
                View Full Itinerary <ArrowRight style={{ width: '14px', height: '14px' }} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>{activeTrip.destination}</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {activeTrip.travelStyle} • {activeTrip.travelers} Travelers • Starting from {activeTrip.startingLocation}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dates</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>{activeTrip.startDate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Budget Tier</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#10b981' }}>${activeTrip.totalAllocatedBudget}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Weather Forecast</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <CloudSun style={{ width: '14px', height: '14px' }} /> {activeTrip.weatherForecast?.temp || '28°C'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn-primary btn-sm" onClick={() => navigateTo('during-trip')}>
                    Go to Live Trip Mode
                  </button>
                  <button className="btn-secondary btn-sm" onClick={() => navigateTo('budget')}>
                    View Budget Breakdown
                  </button>
                  <button className="btn-secondary btn-sm" onClick={() => navigateTo('report')}>
                    View Post-Trip Report
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Right: Recent Activity Timeline */}
        <ScrollReveal delay={150}>
          <GlassCard>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock style={{ width: '18px', height: '18px', color: '#06b6d4' }} /> Recent Activity
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.35rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', marginTop: '2px' }}>
                  <CheckCircle style={{ width: '14px', height: '14px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>Completed Aguada Fort Visit</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Today at 4:30 PM • Goa</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.35rem', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', marginTop: '2px' }}>
                  <Sparkles style={{ width: '14px', height: '14px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>AI Optimized Itinerary</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Yesterday • Synced weather & budget</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.35rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', marginTop: '2px' }}>
                  <DollarSign style={{ width: '14px', height: '14px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>Logged $35 Lunch Expense</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>2 days ago • Thalassa Restaurant</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

      </div>

      {/* Saved Destinations Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.4rem' }}>Saved & Recommended Destinations</h2>
          <button className="btn-outline-cyan btn-sm" onClick={() => navigateTo('saved-trips')}>
            View All Saved Trips ({savedTrips.length})
          </button>
        </div>

        <div className="grid-3">
          {savedTrips.map((trip, idx) => (
            <ScrollReveal key={trip.id} delay={idx * 100}>
              <GlassCard onClick={() => { setActiveTrip(trip); navigateTo('itinerary'); }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <Badge variant={trip.status === 'Completed' ? 'emerald' : 'cyan'} style={{ marginBottom: '0.4rem' }}>
                      {trip.status}
                    </Badge>
                    <h3 style={{ fontSize: '1.15rem' }}>{trip.destination}</h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>${trip.totalAllocatedBudget}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  {trip.travelStyle} • {trip.durationDays} Days • {trip.startDate}
                </p>

                <button className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  Open Itinerary
                </button>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

    </div>
  );
};
