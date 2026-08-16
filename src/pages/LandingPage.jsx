import React from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { 
  POPULAR_DESTINATIONS, 
  HOW_IT_WORKS_STEPS, 
  APP_FEATURES, 
  CLOUD_TECH_HIGHLIGHTS 
} from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Star, 
  CloudSun, 
  ShieldCheck, 
  Box, 
  Cloud, 
  Zap, 
  PieChart, 
  Users, 
  Camera, 
  FileText 
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo } = useTrip();

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles style={{ color: '#06b6d4', width: '24px', height: '24px' }} />;
      case 'PieChart': return <PieChart style={{ color: '#6366f1', width: '24px', height: '24px' }} />;
      case 'CloudSun': return <CloudSun style={{ color: '#10b981', width: '24px', height: '24px' }} />;
      case 'Users': return <Users style={{ color: '#f59e0b', width: '24px', height: '24px' }} />;
      case 'Camera': return <Camera style={{ color: '#f43f5e', width: '24px', height: '24px' }} />;
      case 'FileText': return <FileText style={{ color: '#8b5cf6', width: '24px', height: '24px' }} />;
      default: return <Sparkles style={{ color: '#06b6d4' }} />;
    }
  };

  const getCloudIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck style={{ width: '28px', height: '28px', color: '#06b6d4' }} />;
      case 'Box': return <Box style={{ width: '28px', height: '28px', color: '#6366f1' }} />;
      case 'Cloud': return <Cloud style={{ width: '28px', height: '28px', color: '#10b981' }} />;
      case 'Zap': return <Zap style={{ width: '28px', height: '28px', color: '#f59e0b' }} />;
      default: return <Cloud style={{ color: '#06b6d4' }} />;
    }
  };

  return (
    <div className="animate-fade-in">
      
      {/* Hero Section */}
      <section className="hero-animated-bg" style={{
        position: 'relative',
        paddingTop: '4rem',
        paddingBottom: '6rem',
        overflow: 'hidden'
      }}>
        {/* Floating Glowing Orbs Background */}
        <div className="floating-orb" style={{
          top: '10%',
          left: '15%',
          width: '320px',
          height: '320px',
          background: 'rgba(6, 182, 212, 0.15)'
        }} />
        <div className="floating-orb" style={{
          top: '40%',
          right: '15%',
          width: '380px',
          height: '380px',
          background: 'rgba(99, 102, 241, 0.15)',
          animationDelay: '-4s'
        }} />

        <div className="page-wrapper" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Badge variant="cyan">
              <Sparkles style={{ width: '14px', height: '14px' }} /> Next-Gen AI Travel Engine
            </Badge>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            maxWidth: '940px',
            marginInline: 'auto'
          }}>
            SmartTrip — Your Intelligent <br className="desktop-only" />
            <span className="gradient-text">AI Travel Planner</span> & Navigator
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto'
          }}>
            Generate hyper-personalized day-by-day itineraries in seconds. Sync weather forecasts, optimize budget spending, track expenses live, and export AI post-trip PDF reports.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary btn-pulse-glow" 
              style={{ padding: '0.95rem 2.2rem', fontSize: '1.05rem' }}
              onClick={() => navigateTo('planner')}
            >
              <Compass style={{ width: '20px', height: '20px' }} />
              <span>Plan My Trip Now</span>
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>

            <button 
              className="btn-secondary"
              style={{ padding: '0.95rem 1.75rem', fontSize: '1rem' }}
              onClick={() => navigateTo('dashboard')}
            >
              View User Dashboard
            </button>
          </div>

          {/* Key Stats Bar with Count-Up Animations */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginTop: '4.5rem',
            maxWidth: '960px',
            marginInline: 'auto'
          }} className="grid-4">
            <GlassCard style={{ textAlign: 'center', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#06b6d4' }}>
                <AnimatedCounter end={50000} suffix="+" />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Itineraries Generated</div>
            </GlassCard>
            <GlassCard style={{ textAlign: 'center', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6366f1' }}>
                <AnimatedCounter end={140} suffix="+" />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Global Destinations</div>
            </GlassCard>
            <GlassCard style={{ textAlign: 'center', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>99.4%</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Budget Precision</div>
            </GlassCard>
            <GlassCard style={{ textAlign: 'center', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>4.9 / 5</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Traveler Rating</div>
            </GlassCard>
          </div>

        </div>
      </section>

      {/* Popular Destinations Section */}
      <section style={{ padding: '4rem 0', background: 'rgba(15, 23, 42, 0.3)' }}>
        <div className="page-wrapper">
          
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <Badge variant="indigo" style={{ marginBottom: '0.5rem' }}>Explore Places</Badge>
                <h2 style={{ fontSize: '2rem' }}>Popular AI Travel Destinations</h2>
              </div>
              <button className="btn-outline-cyan" onClick={() => navigateTo('saved-trips')}>
                Explore All Destinations <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </ScrollReveal>

          <div className="grid-3">
            {POPULAR_DESTINATIONS.map((dest, idx) => (
              <ScrollReveal key={dest.id} delay={idx * 100}>
                <GlassCard style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="dest-image-zoom"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(7, 10, 18, 0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: '#f59e0b'
                    }}>
                      <Star style={{ width: '14px', height: '14px', fill: '#f59e0b' }} /> {dest.rating} ({dest.reviews})
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(7, 10, 18, 0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      color: '#38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <CloudSun style={{ width: '14px', height: '14px' }} /> {dest.weather}
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>{dest.name}</h3>
                        <span style={{ fontWeight: 700, color: '#10b981', fontSize: '0.95rem' }}>{dest.pricePerDay}<span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/day</span></span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        {dest.tagline}
                      </p>

                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        {dest.tags.map((tag, tIdx) => (
                          <span key={tIdx} style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            color: '#cbd5e1'
                          }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button 
                      className="btn-secondary btn-sm" 
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => navigateTo('planner')}
                    >
                      Plan Trip to {dest.name.split(',')[0]}
                    </button>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="page-wrapper">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <Badge variant="emerald" style={{ marginBottom: '0.5rem' }}>Simple Workflow</Badge>
              <h2 style={{ fontSize: '2.2rem' }}>How SmartTrip AI Works</h2>
              <p style={{ color: '#94a3b8', maxWidth: '560px', margin: '0.5rem auto 0 auto' }}>
                Four simple steps to transform your chaotic travel ideas into a perfectly structured, budget-optimized global itinerary.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid-4">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <ScrollReveal key={step.step} delay={idx * 120}>
                <GlassCard style={{ position: 'relative' }}>
                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    color: 'rgba(6, 182, 212, 0.25)',
                    marginBottom: '0.5rem'
                  }}>
                    {step.step}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', color: '#f8fafc' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                    {step.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '5rem 0', background: 'rgba(15, 23, 42, 0.3)' }}>
        <div className="page-wrapper">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <Badge variant="amber" style={{ marginBottom: '0.5rem' }}>All-in-One Travel Suite</Badge>
              <h2 style={{ fontSize: '2.2rem' }}>Built for Complete Journey Management</h2>
            </div>
          </ScrollReveal>

          <div className="grid-3">
            {APP_FEATURES.map((feat, idx) => (
              <ScrollReveal key={idx} delay={idx * 80}>
                <GlassCard>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {getFeatureIcon(feat.icon)}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#f8fafc' }}>{feat.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>{feat.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud & AI Technology Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="page-wrapper">
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '24px',
              padding: '3.5rem 2rem'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Badge variant="cyan" style={{ marginBottom: '0.5rem' }}>Cloud Architecture</Badge>
                <h2 style={{ fontSize: '2.2rem' }}>Powered by Enterprise Cloud Concepts</h2>
                <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '0.5rem auto 0 auto' }}>
                  SmartTrip is engineered with multi-tenant isolation, containerized Docker microservices, S3 cloud object storage, and scalable PaaS/IaaS infrastructure.
                </p>
              </div>

              <div className="grid-2" style={{ gap: '1.5rem' }}>
                {CLOUD_TECH_HIGHLIGHTS.map((tech, idx) => (
                  <GlassCard key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      padding: '0.75rem',
                      borderRadius: '14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {getCloudIcon(tech.icon)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: '#f8fafc' }}>{tech.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{tech.subtitle}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ padding: '4rem 0 6rem 0', textAlign: 'center' }}>
        <div className="page-wrapper">
          <ScrollReveal>
            <GlassCard style={{
              padding: '3.5rem 2rem',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
              borderColor: 'rgba(6, 182, 212, 0.4)'
            }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
                Ready to Craft Your Next Unforgettable Journey?
              </h2>
              <p style={{ color: '#94a3b8', maxWidth: '580px', margin: '0 auto 2rem auto' }}>
                Join thousands of global travelers planning smarter trips with AI optimization, weather tracking, and effortless budget management.
              </p>
              <button 
                className="btn-primary btn-pulse-glow"
                style={{ padding: '0.95rem 2.4rem', fontSize: '1.05rem' }}
                onClick={() => navigateTo('planner')}
              >
                <Sparkles style={{ width: '20px', height: '20px' }} />
                <span>Create AI Trip Plan Now</span>
              </button>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .dest-image-zoom:hover {
          transform: scale(1.08) !important;
        }
      `}</style>

    </div>
  );
};
