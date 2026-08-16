const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('smarttrip_token');

  const headers = {
    'Content-Type': 'application/json'
  };

  if (token && token !== 'mock-jwt-token') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const apiService = {

  // =========================
  // AUTH APIs
  // =========================

  async register(name, email, password, travelPreferences) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          travelPreferences
        })
      });

      const data = await res.json();

      if (data.success && data.data?.token) {
        localStorage.setItem(
          'smarttrip_token',
          data.data.token
        );
      }

      return data;

    } catch (err) {
      console.error('Register API error:', err);

      return {
        success: false,
        message: 'Unable to connect to backend'
      };
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      console.log('LOGIN RESPONSE:', data);

      if (data.success && data.data?.token) {
        localStorage.setItem(
          'smarttrip_token',
          data.data.token
        );

        console.log('JWT token saved successfully');
      }

      return data;

    } catch (err) {
      console.error('Login API error:', err);

      return {
        success: false,
        message: 'Unable to connect to backend'
      };
    }
  },

  async getMe() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/me`,
        {
          headers: getHeaders()
        }
      );

      return await res.json();

    } catch (err) {
      console.error('Get user error:', err);
      return null;
    }
  },

  // =========================
  // TRIP APIs
  // =========================

  async getTrips() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/trips`,
        {
          method: 'GET',
          headers: getHeaders()
        }
      );

      return await res.json();

    } catch (err) {
      console.error('Get trips error:', err);
      return null;
    }
  },

  async createTrip(tripData) {
    try {

      const token =
        localStorage.getItem('smarttrip_token');

      console.log(
        'Creating trip. Token exists:',
        !!token
      );

      if (!token) {
        return {
          success: false,
          message: 'Please login before creating a trip'
        };
      }

      const res = await fetch(
        `${API_BASE_URL}/trips`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },

          body: JSON.stringify(tripData)
        }
      );

      const data = await res.json();

      console.log(
        'CREATE TRIP RESPONSE:',
        data
      );

      return data;

    } catch (err) {

      console.error(
        'Create trip error:',
        err
      );

      return {
        success: false,
        message: 'Unable to connect to backend'
      };
    }
  },

  // =========================
  // EXPENSE APIs
  // =========================

  async getExpenses(tripId) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/trips/${tripId}/expenses`,
        {
          headers: getHeaders()
        }
      );

      return await res.json();

    } catch (err) {
      console.error('Get expenses error:', err);
      return null;
    }
  },

  async createExpense(tripId, expenseData) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/trips/${tripId}/expenses`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(expenseData)
        }
      );

      return await res.json();

    } catch (err) {
      console.error('Create expense error:', err);
      return null;
    }
  },

  // =========================
  // ACTIVITY APIs
  // =========================

  async updateActivity(
    tripId,
    activityId,
    activityData
  ) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/trips/${tripId}/activities/${activityId}`,
        {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(activityData)
        }
      );

      return await res.json();

    } catch (err) {
      console.error('Update activity error:', err);
      return null;
    }
  },

  // =========================
  // REVIEW API
  // =========================

  async createReview(tripId, reviewData) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/trips/${tripId}/reviews`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(reviewData)
        }
      );

      return await res.json();

    } catch (err) {
      console.error('Create review error:', err);
      return null;
    }
  },

  // =========================
  // REPORT API
  // =========================

  async getReport(tripId) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/trips/${tripId}/report`,
        {
          headers: getHeaders()
        }
      );

      return await res.json();

    } catch (err) {
      console.error('Get report error:', err);
      return null;
    }
  }
};