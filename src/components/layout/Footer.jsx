import React from 'react';
import { useTrip } from '../../context/TripContext';
import { Compass, Server, Shield, Cpu, Github, Globe, Heart } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useTrip();

  return (
    <footer style={{
      background: '#04070e',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto'
    }} className="no-print">
      <div className="page-wrapper" style={{ paddingBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '2.5rem' }} className="footer-grid">
          
          {/* Column 1: Brand & Cloud tech info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Compass style={{ color: '#fff', width: '20px', height: '20px' }} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Smart<span className="gradient-text">Trip</span>
              </span>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '340px' }}>
              Next-generation cloud-native AI travel engine combining real-time climate telemetry, personalized financial optimization, and multi-tenant trip collaboration.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                <Server style={{ width: '12px', height: '12px' }} /> Multi-Tenancy
              </span>
              <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                <Cpu style={{ width: '12px', height: '12px' }} /> Docker Containerized
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                <Shield style={{ width: '12px', height: '12px' }} /> S3 Cloud Storage
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.2rem', color: '#f8fafc' }}>Platform Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#94a3b8' }}>
              <li><button onClick={() => navigateTo('landing')} style={{ background: 'none', color: 'inherit' }}>Home Page</button></li>
              <li><button onClick={() => navigateTo('dashboard')} style={{ background: 'none', color: 'inherit' }}>User Dashboard</button></li>
              <li><button onClick={() => navigateTo('planner')} style={{ background: 'none', color: 'inherit' }}>AI Trip Planner</button></li>
              <li><button onClick={() => navigateTo('itinerary')} style={{ background: 'none', color: 'inherit' }}>Day-by-Day Itinerary</button></li>
              <li><button onClick={() => navigateTo('budget')} style={{ background: 'none', color: 'inherit' }}>Budget Analytics</button></li>
            </ul>
          </div>

          {/* Column 3: Tools & Trip Modes */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.2rem', color: '#f8fafc' }}>Trip Tools</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#94a3b8' }}>
              <li><button onClick={() => navigateTo('during-trip')} style={{ background: 'none', color: 'inherit' }}>Live During-Trip Mode</button></li>
              <li><button onClick={() => navigateTo('report')} style={{ background: 'none', color: 'inherit' }}>Post-Trip AI Report</button></li>
              <li><button onClick={() => navigateTo('saved-trips')} style={{ background: 'none', color: 'inherit' }}>Saved Trips History</button></li>
              <li><button onClick={() => navigateTo('profile')} style={{ background: 'none', color: 'inherit' }}>User Profile & Sync</button></li>
              <li><button onClick={() => navigateTo('login')} style={{ background: 'none', color: 'inherit' }}>Authentication Portal</button></li>
            </ul>
          </div>

          {/* Column 4: Technology & Stack */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.2rem', color: '#f8fafc' }}>Cloud Tech Stack</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Built with React 18, Vite, Containerized Microservices, S3 Object Storage, PaaS deployment pipelines, and LLM inference.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8' }}>
              <Github style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
              <Globe style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
            </div>
          </div>

        </div>

        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.08)', margin: '2.5rem 0 1.5rem 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
          <div>
            © 2026 SmartTrip AI — Semester Project. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Engineered with <Heart style={{ width: '14px', height: '14px', color: '#f43f5e', fill: '#f43f5e' }} /> using React & Vite
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 550px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};
