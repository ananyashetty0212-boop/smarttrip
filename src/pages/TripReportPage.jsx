import React from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { 
  FileText, 
  Printer, 
  Download, 
  DollarSign, 
  PieChart, 
  MapPin, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Compass,
  Camera,
  Award
} from 'lucide-react';

export const TripReportPage = () => {
  const { activeTrip, navigateTo } = useTrip();

  const handleGeneratePDF = () => {
    window.print();
  };

  const totalSpent = (activeTrip.budgetBreakdown || []).reduce((acc, b) => acc + (b.spent || 0), 0);
  const plannedBudget = activeTrip.totalAllocatedBudget || 800;
  const savings = plannedBudget - totalSpent;

  return (
    <div className="page-wrapper animate-fade-in">
      
      {/* Header Banner & PDF Export Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <Badge variant="cyan" style={{ marginBottom: '0.4rem' }}>
            <Award style={{ width: '12px', height: '12px' }} /> Automated Post-Trip Executive Summary
          </Badge>
          <h1 style={{ fontSize: '2.2rem' }}>AI Trip Report — {activeTrip.destination}</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Completed Travel Analytics & Comprehensive Financial Breakdown
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn-primary no-print"
            onClick={handleGeneratePDF}
            style={{ padding: '0.85rem 1.6rem' }}
          >
            <Printer style={{ width: '18px', height: '18px' }} />
            <span>Generate PDF Report</span>
          </button>
        </div>
      </div>

      {/* Main Print Container Wrapper */}
      <div className="print-container">
        
        {/* Executive Summary Stats */}
        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          <GlassCard>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Total Expenditure</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>${totalSpent}</div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>Planned: ${plannedBudget}</div>
          </GlassCard>

          <GlassCard>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Budget Variance</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: savings >= 0 ? '#06b6d4' : '#f43f5e' }}>
              {savings >= 0 ? `+$${savings} Saved` : `-$${Math.abs(savings)} Over`}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '0.2rem' }}>
              {savings >= 0 ? 'Optimal Cost Control' : 'Exceeded Allocation'}
            </div>
          </GlassCard>

          <GlassCard>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Gems & Places Visited</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc' }}>
              {(activeTrip.itinerary || []).reduce((acc, d) => acc + (d.activities || []).length, 0)} Locations
            </div>
            <div style={{ fontSize: '0.78rem', color: '#f59e0b', marginTop: '0.2rem' }}>Average Rating: 4.8 / 5</div>
          </GlassCard>
        </div>

        {/* AI Insight Summary Card */}
        <GlassCard style={{ marginBottom: '2.5rem', padding: '2rem', borderColor: 'rgba(6, 182, 212, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Sparkles style={{ width: '22px', height: '22px', color: '#06b6d4' }} />
            <h2 style={{ fontSize: '1.4rem' }}>AI Synthesis & Travel Insights</h2>
          </div>
          
          <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Your 5-day journey to {activeTrip.destination} maintained exceptional time efficiency and budget accuracy. 
            By leveraging rental scooters and localized seafood shacks, you achieved a <strong>{Math.round((savings / plannedBudget) * 100)}% budget saving</strong> while exploring 100% of planned cultural heritage landmarks.
          </p>

          <div className="grid-2">
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <strong style={{ color: '#10b981', fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                ✓ Financial Highlight
              </strong>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Accommodation costs came in $20 under estimate due to early resort check-in benefits.</span>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <strong style={{ color: '#06b6d4', fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                ★ Highest Rated Highlight
              </strong>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Thalassa Restaurant Sunset & Aguada Fort heritage tour earned top 5-star ratings.</span>
            </div>
          </div>
        </GlassCard>

        {/* Planned vs Actual Budget Breakdown Table */}
        <GlassCard style={{ marginBottom: '2.5rem', padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Planned vs Actual Category Breakdown</h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Planned ($)</th>
                  <th style={{ padding: '0.75rem' }}>Actual Spent ($)</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {(activeTrip.budgetBreakdown || []).map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#f8fafc' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{item.category}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>${item.estimated}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#10b981' }}>${item.spent}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <Badge variant={item.spent > item.estimated ? 'rose' : 'emerald'} style={{ fontSize: '0.7rem' }}>
                        {item.spent > item.estimated ? 'Exceeded' : 'Within Budget'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Photo Gallery Grid */}
        <GlassCard style={{ marginBottom: '2.5rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Camera style={{ width: '20px', height: '20px', color: '#f43f5e' }} />
            <h2 style={{ fontSize: '1.4rem' }}>Captured Memory Gallery</h2>
          </div>

          <div className="grid-3">
            {(activeTrip.photos || []).map((photo) => (
              <div key={photo.id} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={photo.url} alt={photo.caption} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '0.65rem', background: 'rgba(15, 23, 42, 0.9)', fontSize: '0.82rem', color: '#cbd5e1' }}>
                  {photo.caption}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Future Travel Recommendations */}
        <GlassCard style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Compass style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
            <h2 style={{ fontSize: '1.4rem' }}>AI Recommended Future Trips</h2>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Based on your high satisfaction with coastal culture and culinary heritage in {activeTrip.destination}:
          </p>

          <div className="grid-2">
            <GlassCard hover={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
              <Badge variant="cyan" style={{ marginBottom: '0.4rem' }}>Recommended #1</Badge>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Bali, Indonesia — Tropical Coastal & Temple Retreat</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Estimated 6 days • $650 Budget • Beach & Culture match 96%</p>
            </GlassCard>

            <GlassCard hover={false} style={{ background: 'rgba(255,255,255,0.03)' }}>
              <Badge variant="indigo" style={{ marginBottom: '0.4rem' }}>Recommended #2</Badge>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Santorini, Greece — Aegean Cliff & Sunset Culinary</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Estimated 5 days • $1,400 Budget • Romantic & Views match 94%</p>
            </GlassCard>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
