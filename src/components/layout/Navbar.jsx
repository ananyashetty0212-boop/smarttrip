import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  PieChart, 
  CheckSquare, 
  FileText, 
  Bookmark, 
  User, 
  LogIn, 
  Menu, 
  X,
  Sparkles,
  PlusCircle
} from 'lucide-react';

export const Navbar = () => {
  const { activePage, navigateTo, user } = useTrip();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'planner', label: 'AI Planner', icon: Sparkles },
    { id: 'itinerary', label: 'Itinerary', icon: MapPin },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'during-trip', label: 'Live Trip', icon: CheckSquare },
    { id: 'report', label: 'Report', icon: FileText },
    { id: 'saved-trips', label: 'Saved Trips', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-container no-print" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(7, 10, 18, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="page-wrapper" style={{ padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.66rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
          }}>
            <Compass style={{ color: '#fff', width: '22px', height: '22px' }} />
          </div>
          <div>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Smart<span className="gradient-text">Trip</span>
            </span>
            <span className="badge badge-cyan" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>AI 2.0</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: isActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                  color: isActive ? '#06b6d4' : '#94a3b8',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                  borderRadius: '10px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon style={{ width: '15px', height: '15px' }} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* User / CTA Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn-primary btn-sm"
            onClick={() => handleNavClick('planner')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <PlusCircle style={{ width: '16px', height: '16px' }} />
            <span>Plan Trip</span>
          </button>

          <button
            onClick={() => handleNavClick('login')}
            className="btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LogIn style={{ width: '15px', height: '15px' }} />
            <span className="desktop-only">Login</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'transparent',
              color: '#f8fafc',
              padding: '0.5rem',
              display: 'none'
            }}
          >
            {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '1.25rem',
          borderRadius: '0 0 18px 18px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem'
        }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#06b6d4' : '#f8fafc',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
              >
                <Icon style={{ width: '18px', height: '18px', color: '#06b6d4' }} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </nav>
  );
};
