import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import {
  Mail,
  Lock,
  LogIn,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';

export const LoginPage = () => {
  const { navigateTo, setUser } = useTrip();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    try {
      setLoading(true);

      console.log('LOGIN: Sending login request...');

      const response = await apiService.login(
        email,
        password
      );

      console.log('LOGIN RESPONSE:', response);

      if (!response || !response.success) {
        setError(
          response?.message ||
          'Invalid email or password.'
        );
        return;
      }

      if (!response.data?.token) {
        setError(
          'Login succeeded but no authentication token was received.'
        );
        return;
      }

      // Save JWT
      localStorage.setItem(
        'smarttrip_token',
        response.data.token
      );

      console.log(
        'LOGIN: Token saved:',
        response.data.token
      );

      // Update user
      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        travelPreferences:
          response.data.travelPreferences || {}
      });

      console.log('LOGIN: Successful.');

      navigateTo('dashboard');

    } catch (err) {
      console.error('LOGIN ERROR:', err);

      setError(
        err?.message ||
        'Unable to connect to the server. Make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('alex.rivera@smarttrip.ai');
    setPassword('demopassword123');
  };

  return (
    <div
      className="page-wrapper animate-fade-in"
      style={{
        maxWidth: '480px',
        paddingTop: '2.5rem',
        paddingBottom: '5rem'
      }}
    >

      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >

        <Badge
          variant="cyan"
          style={{ marginBottom: '0.5rem' }}
        >

          <Sparkles
            style={{
              width: '12px',
              height: '12px'
            }}
          />

          SmartTrip Portal

        </Badge>

        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '0.5rem'
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}
        >
          Sign in to access your saved itineraries,
          budget tracking, and cloud trip sync.
        </p>

      </div>

      <GlassCard style={{ padding: '2rem' }}>

        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '0.8rem',
              borderRadius: '8px',
              marginBottom: '1.25rem',
              fontSize: '0.85rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="form-group">

            <label className="form-label">

              <Mail
                style={{
                  width: '15px',
                  height: '15px',
                  color: '#06b6d4'
                }}
              />

              Email Address

            </label>

            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

          </div>

          {/* PASSWORD */}
          <div
            className="form-group"
            style={{ marginBottom: '1.5rem' }}
          >

            <label className="form-label">

              <Lock
                style={{
                  width: '15px',
                  height: '15px',
                  color: '#06b6d4'
                }}
              />

              Password

            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              marginBottom: '1rem',
              opacity: loading ? 0.7 : 1
            }}
          >

            <LogIn
              style={{
                width: '18px',
                height: '18px'
              }}
            />

            <span>
              {loading
                ? 'Signing In...'
                : 'Sign In to SmartTrip'}
            </span>

          </button>

          {/* DEMO LOGIN */}
          <button
            type="button"
            className="btn-outline-cyan"
            onClick={handleDemoLogin}
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.75rem',
              marginBottom: '1.5rem'
            }}
          >

            <Sparkles
              style={{
                width: '16px',
                height: '16px'
              }}
            />

            <span>
              Fill Demo Credentials
            </span>

          </button>

        </form>

        <div
          style={{
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '1.25rem'
          }}
        >

          <p
            style={{
              color: '#94a3b8',
              fontSize: '0.88rem'
            }}
          >

            Don't have a SmartTrip account yet?{' '}

            <button
              onClick={() => navigateTo('register')}
              style={{
                background: 'none',
                color: '#06b6d4',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Create Account
            </button>

          </p>

        </div>

      </GlassCard>

      <div
        style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#64748b',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem'
        }}
      >

        <ShieldCheck
          style={{
            width: '14px',
            height: '14px',
            color: '#10b981'
          }}
        />

        <span>
          Encrypted Multi-Tenant Cloud Storage Protection
        </span>

      </div>

    </div>
  );
};