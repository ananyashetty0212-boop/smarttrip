import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { 
  User, 
  Mail, 
  MapPin, 
  Server, 
  ShieldCheck, 
  Box, 
  Cloud, 
  Edit, 
  Save, 
  Award,
  Globe,
  DollarSign
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, setUser } = useTrip();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [homeCity, setHomeCity] = useState(user.homeCity || 'Mumbai, India');
  const [cloudBackupToggle, setCloudBackupToggle] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, name, homeCity }));
    setIsEditing(false);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '960px' }}>
      
      {/* Header Banner */}
      <GlassCard style={{
        padding: '2.5rem',
        marginBottom: '2.5rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
        borderColor: 'rgba(6, 182, 212, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--accent-cyan)',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <Badge variant="cyan">{user.tier}</Badge>
              <Badge variant="indigo">
                <Server style={{ width: '12px', height: '12px' }} /> {user.multiTenancyId}
              </Badge>
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{user.name}</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail style={{ width: '14px', height: '14px', color: '#06b6d4' }} /> {user.email} • 
              <MapPin style={{ width: '14px', height: '14px', color: '#6366f1' }} /> {user.homeCity}
            </p>
          </div>

          <button 
            className="btn-secondary btn-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit style={{ width: '15px', height: '15px' }} />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </GlassCard>

      {/* Lifetime Travel Metrics */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <GlassCard>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Countries Explored</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4' }}>5 Countries</div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>India, Japan, France, Switzerland, Greece</div>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Cities Visited</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6366f1' }}>14 Cities</div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>Goa, Tokyo, Kyoto, Paris, Interlaken...</div>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Total Travel Expenditure</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>$8,400</div>
          <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '0.2rem' }}>99.2% Budget AI Optimization score</div>
        </GlassCard>
      </div>

      {/* Grid: Profile Form & Cloud Synchronization Settings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="grid-3">
        
        {/* Profile Information Form */}
        <GlassCard style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: '#f8fafc' }}>Personal Details & Preferences</h2>

          <form onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                disabled={!isEditing} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Read-only)</label>
              <input 
                type="email" 
                className="form-control" 
                value={user.email} 
                disabled 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Home Departure City</label>
              <input 
                type="text" 
                className="form-control" 
                value={homeCity} 
                onChange={(e) => setHomeCity(e.target.value)} 
                disabled={!isEditing} 
              />
            </div>

            {isEditing && (
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                <Save style={{ width: '16px', height: '16px' }} /> Save Changes
              </button>
            )}
          </form>
        </GlassCard>

        {/* Cloud Computing & Multi-Tenancy Specs */}
        <GlassCard style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Server style={{ width: '20px', height: '20px', color: '#06b6d4' }} />
            <h2 style={{ fontSize: '1.3rem' }}>Cloud Storage & Sync</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#94a3b8' }}>Encrypted S3 Object Storage</span>
                <span style={{ color: '#06b6d4', fontWeight: 600 }}>{user.cloudStorageUsed}</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '14%', height: '100%', background: 'var(--accent-cyan)' }} />
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Box style={{ width: '16px', height: '16px', color: '#6366f1' }} /> Docker Container Sync
                </span>
                <input 
                  type="checkbox" 
                  checked={cloudBackupToggle} 
                  onChange={() => setCloudBackupToggle(!cloudBackupToggle)}
                  style={{ accentColor: '#06b6d4', cursor: 'pointer' }}
                />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Auto-replicate itinerary snapshots to isolated multi-tenant cloud containers.
              </p>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck style={{ width: '16px', height: '16px' }} />
              <span>Multi-Tenant Data Isolation Active</span>
            </div>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
