import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { RatingStars } from '../components/common/RatingStars';
import { 
  CloudSun, 
  CheckSquare, 
  PlusCircle, 
  FileText, 
  Camera, 
  Star, 
  Clock, 
  MapPin, 
  Play, 
  Sparkles,
  Edit,
  DollarSign
} from 'lucide-react';

export const DuringTripPage = () => {
  const { activeTrip, toggleActivityCompleted, addExpense, addNote, addPhoto, navigateTo } = useTrip();

  // Active Modals state
  const [modalType, setModalType] = useState(null); // 'expense' | 'note' | 'photo' | 'rate'

  // Modal Inputs state
  const [expenseForm, setExpenseForm] = useState({ amount: '', description: '', category: 'Food & Dining' });
  const [noteText, setNoteText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [ratingReview, setRatingReview] = useState('');

  const todayIndex = 0; // Day 1
  const todayPlan = activeTrip.itinerary?.[todayIndex] || {
    day: 1,
    title: 'Arrival & North Goa Coastal Sunset',
    activities: [
      { id: 'a1', time: '10:30 AM', title: 'Check-in at Taj Fort Aguada Resort', location: 'Sinquerim, North Goa', cost: 80, completed: true },
      { id: 'a2', time: '01:00 PM', title: 'Lunch at Thalassa Greek Tavern', location: 'Vagator Beach', cost: 35, completed: true },
      { id: 'a3', time: '04:30 PM', title: 'Sunset Exploration of Aguada Fort', location: 'Candolim', cost: 10, completed: false },
      { id: 'a4', time: '08:00 PM', title: 'Seafood Dinner at Curlies Shack', location: 'Anjuna Beach', cost: 30, completed: false }
    ]
  };

  const totalActs = todayPlan.activities.length;
  const completedActs = todayPlan.activities.filter(a => a.completed).length;
  const progressPercent = Math.round((completedActs / (totalActs || 1)) * 100);

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.amount) return;
    addExpense(expenseForm);
    setExpenseForm({ amount: '', description: '', category: 'Food & Dining' });
    setModalType(null);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteText) return;
    addNote(noteText);
    setNoteText('');
    setModalType(null);
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    addPhoto(photoUrl, photoCaption);
    setPhotoUrl('');
    setPhotoCaption('');
    setModalType(null);
  };

  const handleRateSubmit = (e) => {
    e.preventDefault();
    alert(`Rating saved: ${ratingVal} Stars! Thank you for reviewing.`);
    setRatingReview('');
    setModalType(null);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      
      {/* Live Mode Header */}
      <GlassCard style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
        borderColor: 'var(--accent-cyan)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Badge variant="cyan">
                <Play style={{ width: '12px', height: '12px', fill: '#06b6d4' }} /> Live Trip Execution Mode
              </Badge>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>Active Today</span>
            </div>
            <h1 style={{ fontSize: '2.2rem' }}>{activeTrip.destination} — Day {todayPlan.day}</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{todayPlan.title}</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary btn-sm" onClick={() => navigateTo('itinerary')}>
              <Edit style={{ width: '14px', height: '14px' }} /> Modify Itinerary
            </button>
            <button className="btn-primary btn-sm" onClick={() => navigateTo('report')}>
              Generate Report
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Grid: Left - Today's Checklist, Right - Weather & Quick Action Toolbar */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }} className="grid-3">
        
        {/* Left Column: Today's Checklist */}
        <div>
          <GlassCard style={{ padding: '1.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Today's Activity Checklist</h2>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>
                {completedActs} of {totalActs} Completed ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--accent-emerald)', transition: 'width 0.4s ease' }} />
            </div>

            {/* Checklist Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {todayPlan.activities.map((act) => (
                <div 
                  key={act.id}
                  onClick={() => toggleActivityCompleted(todayIndex, act.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: act.completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: act.completed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      border: act.completed ? 'none' : '2px solid #64748b',
                      background: act.completed ? '#10b981' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 800
                    }}>
                      {act.completed && '✓'}
                    </div>

                    <div>
                      <h3 style={{
                        fontSize: '1rem',
                        color: act.completed ? '#94a3b8' : '#f8fafc',
                        textDecoration: act.completed ? 'line-through' : 'none'
                      }}>
                        {act.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                        <span><Clock style={{ width: '12px', height: '12px', display: 'inline' }} /> {act.time}</span>
                        <span><MapPin style={{ width: '12px', height: '12px', display: 'inline' }} /> {act.location}</span>
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#10b981' }}>${act.cost}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* User Notes & Photos Feed */}
          <GlassCard style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Trip Journal & Photos ({activeTrip.photos?.length || 0})</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {(activeTrip.photos || []).map((photo) => (
                <div key={photo.id} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={photo.url} alt={photo.caption} style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                  <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', background: 'rgba(15, 23, 42, 0.9)', color: '#cbd5e1' }}>
                    {photo.caption}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Live Weather & Quick Action Toolbar */}
        <div>
          {/* Live Weather Card */}
          <GlassCard style={{ marginBottom: '1.5rem', textAlign: 'center', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <div style={{ display: 'inline-flex', padding: '0.85rem', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', marginBottom: '0.75rem' }}>
              <CloudSun style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#f8fafc' }}>{activeTrip.weatherForecast?.temp || '28°C'}</h3>
            <p style={{ color: '#06b6d4', fontWeight: 600, fontSize: '0.9rem' }}>{activeTrip.weatherForecast?.condition || 'Mostly Sunny'}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#94a3b8' }}>
              <div>Humidity: {activeTrip.weatherForecast?.humidity || '72%'}</div>
              <div>Rain Chance: {activeTrip.weatherForecast?.rainProb || '10%'}</div>
            </div>
          </GlassCard>

          {/* Quick Action Toolbar */}
          <GlassCard>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#f8fafc' }}>Quick Action Toolbar</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }} onClick={() => setModalType('expense')}>
                <PlusCircle style={{ width: '16px', height: '16px', color: '#10b981' }} /> Add Expense
              </button>

              <button className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }} onClick={() => setModalType('note')}>
                <FileText style={{ width: '16px', height: '16px', color: '#06b6d4' }} /> Add Note / Journal
              </button>

              <button className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }} onClick={() => setModalType('photo')}>
                <Camera style={{ width: '16px', height: '16px', color: '#f43f5e' }} /> Upload Photo
              </button>

              <button className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }} onClick={() => setModalType('rate')}>
                <Star style={{ width: '16px', height: '16px', color: '#f59e0b' }} /> Rate Visited Place
              </button>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* Modals for Quick Actions */}
      <Modal isOpen={modalType === 'expense'} onClose={() => setModalType(null)} title="Quick Expense Entry">
        <form onSubmit={handleExpenseSubmit}>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" placeholder="e.g. Scooter Fuel" value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Amount ($ USD)</label>
            <input type="number" className="form-control" placeholder="15" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Save Expense</button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'note'} onClose={() => setModalType(null)} title="Journal Note Entry">
        <form onSubmit={handleNoteSubmit}>
          <div className="form-group">
            <label className="form-label">Your Note</label>
            <textarea className="form-control" rows="4" placeholder="Write thoughts about your day..." value={noteText} onChange={(e) => setNoteText(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Save Note</button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'photo'} onClose={() => setModalType(null)} title="Upload Memory Photo">
        <form onSubmit={handlePhotoSubmit}>
          <div className="form-group">
            <label className="form-label">Image URL / Select File</label>
            <input type="text" className="form-control" placeholder="https://images.unsplash.com/..." value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Caption</label>
            <input type="text" className="form-control" placeholder="Sunset view..." value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Upload Photo</button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'rate'} onClose={() => setModalType(null)} title="Rate Place / Restaurant">
        <form onSubmit={handleRateSubmit}>
          <div className="form-group" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
            <label className="form-label">Your Rating</label>
            <RatingStars value={ratingVal} onChange={(val) => setRatingVal(val)} />
          </div>
          <div className="form-group">
            <label className="form-label">Review Comment</label>
            <textarea className="form-control" rows="3" placeholder="Great seafood and sunset view..." value={ratingReview} onChange={(e) => setRatingReview(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Rating</button>
        </form>
      </Modal>

    </div>
  );
};
