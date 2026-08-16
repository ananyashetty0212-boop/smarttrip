import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import {
  User,
  Mail,
  Lock,
  Compass,
  UserPlus,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';

export const RegisterPage = () => {
  const { navigateTo, setUser } = useTrip();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prefStyle, setPrefStyle] = useState('Adventure & Culture');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      setLoading(true);

      console.log('REGISTER: Sending registration request...');

      const response = await apiService.register(
        name,
        email,
        password,
        {
          style: prefStyle
        }
      );

      console.log('REGISTER RESPONSE:', response);

      if (!response || !response.success) {
        setError(
          response?.message || 'Registration failed. Please try again.'
        );
        return;
      }

      // Backend should return JWT token
      if (response.data?.token) {
        localStorage.setItem(
          'smarttrip_token',
          response.data.token
        );

        console.log(
          'REGISTER: Token saved:',
          response.data.token
        );
      } else {
        setError(
          'Registration succeeded but no authentication token was received.'
        );
        return;
      }

      // Update frontend user state
      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        travelPreferences: response.data.travelPreferences || {
          style: prefStyle
        }
      });

      console.log('REGISTER: User created successfully.');

      // Go to dashboard
      navigateTo('dashboard');

    } catch (err) {
      console.error('REGISTER ERROR:', err);

      setError(
        err?.message ||
        'Unable to connect to the server. Make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-wrapper animate-fade-in"
      style={{
        maxWidth: '520px',
        paddingTop: '2rem',
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
          variant="indigo"
          style={{ marginBottom: '0.5rem' }}
        >
          <Sparkles
            style={{
              width: '12px',
              height: '12px'
            }}
          />
          Join SmartTrip
        </Badge>

        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '0.5rem'
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}
        >
          Start crafting personalized AI itineraries,
          tracking budgets, and syncing cloud travel stats.
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

        <form onSubmit={handleRegister}>

          {/* NAME */}
          <div className="form-group">

            <label className="form-label">
              <User
                style={{
                  width: '15px',
                  height: '15px',
                  color: '#6366f1'
                }}
              />
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="e.g. Alex Rivera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />

          </div>

          {/* EMAIL */}
          <div className="form-group">

            <label className="form-label">
              <Mail
                style={{
                  width: '15px',
                  height: '15px',
                  color: '#6366f1'
                }}
              />
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

          </div>

          {/* PASSWORD */}
          <div className="form-group">

            <label className="form-label">
              <Lock
                style={{
                  width: '15px',
                  height: '15px',
                  color: '#6366f1'
                }}
              />
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />

          </div>

          {/* TRAVEL STYLE */}
          <div
            className="form-group"
            style={{ marginBottom: '1.5rem' }}
          >

            <label className="form-label">

              <Compass
                style={{
                  width: '15px',
                  height: '15px',
                  color: '#6366f1'
                }}
              />

              Preferred Travel Style

            </label>

            <select
              className="form-control form-select"
              value={prefStyle}
              onChange={(e) => setPrefStyle(e.target.value)}
              disabled={loading}
            >

              <option value="Adventure & Outdoor">
                Adventure & Outdoor
              </option>

              <option value="Culture & Heritage">
                Culture & Heritage
              </option>

              <option value="Relaxing Beach & Wellness">
                Relaxing Beach & Wellness
              </option>

              <option value="Luxury & Fine Dining">
                Luxury & Fine Dining
              </option>

              <option value="Budget Backpacker">
                Budget Backpacker
              </option>

            </select>

          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              marginBottom: '1.25rem',
              opacity: loading ? 0.7 : 1
            }}
          >

            <UserPlus
              style={{
                width: '18px',
                height: '18px'
              }}
            />

            <span>
              {loading
                ? 'Creating Account...'
                : 'Create Free Account'}
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

            Already have an account?{' '}

            <button
              onClick={() => navigateTo('login')}
              disabled={loading}
              style={{
                background: 'none',
                color: '#06b6d4',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sign In
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
          By registering, you agree to SmartTrip Terms &
          Cloud Multi-Tenancy Isolation
        </span>

      </div>

    </div>
  );
};