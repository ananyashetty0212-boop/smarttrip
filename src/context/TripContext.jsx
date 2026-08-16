import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_TRIP, SAVED_TRIPS_MOCK } from '../data/mockData';
import { apiService } from '../services/api';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('landing');
  const [user, setUser] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@smarttrip.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tier: 'Pro Traveler (Level 4)',
    homeCity: 'Mumbai, India',
    cloudStorageUsed: '1.4 GB / 10 GB',
    multiTenancyId: 'TENANT-ORG-88342'
  });

  const [activeTrip, setActiveTrip] = useState(SAMPLE_TRIP);
  const [savedTrips, setSavedTrips] = useState(SAVED_TRIPS_MOCK);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync initial trips & user from backend if available
  useEffect(() => {
    async function loadBackendData() {
      const userRes = await apiService.getMe();
      if (userRes && userRes.success && userRes.data) {
        setUser(prev => ({ ...prev, ...userRes.data }));
      }

      const tripsRes = await apiService.getTrips();
      if (tripsRes && tripsRes.success && tripsRes.data && tripsRes.data.length > 0) {
        setSavedTrips(tripsRes.data);
      }
    }
    loadBackendData();
  }, []);

  // Navigation handler
  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create new trip from planner form
  const createNewTrip = async (formData) => {
    setIsGenerating(true);

    // Call backend API if running
    const apiPayload = {
      destination: formData.destination || 'Goa, India',
      startingLocation: formData.startingLocation || 'Mumbai',
      startDate: formData.startDate || '2026-10-01',
      endDate: formData.endDate || '2026-10-05',
      duration: formData.durationDays || 5,
      travelers: formData.travelers || 2,
      budget: parseInt(formData.budgetAmount) || 1000,
      currency: 'USD',
      travelStyle: formData.travelStyle || 'Adventure & Culture',
      interests: formData.interests || [],
      foodPreference: formData.foodPreference || 'Local Specialties',
      accommodationPreference: formData.accommodationType || 'Boutique Resort',
      transportationPreference: formData.transportationPreference || 'Rental Scooter & Cab'
    };

    apiService.createTrip(apiPayload);
    
    // Local state synthesis
    setTimeout(() => {
      const generatedTrip = {
        id: `trip-${Date.now()}`,
        destination: formData.destination || 'Goa, India',
        startingLocation: formData.startingLocation || 'Mumbai',
        startDate: formData.startDate || '2026-10-01',
        endDate: formData.endDate || '2026-10-05',
        durationDays: formData.durationDays || 5,
        travelers: formData.travelers || 2,
        travelStyle: formData.travelStyle || 'Adventure & Culture',
        budgetTier: formData.budgetTier || 'Moderate ($1,000)',
        totalAllocatedBudget: parseInt(formData.budgetAmount) || 1000,
        foodPreference: formData.foodPreference || 'Local & Seafood',
        accommodationType: formData.accommodationType || 'Boutique Resort',
        transportationPreference: formData.transportationPreference || 'Rental Scooter & Cab',
        status: 'Upcoming',
        weatherForecast: { temp: '27°C', condition: 'Sunny Breeze', humidity: '65%', rainProb: '5%' },
        budgetBreakdown: [
          { category: 'Accommodation', estimated: Math.round(formData.budgetAmount * 0.4), spent: 0, icon: 'Hotel' },
          { category: 'Transport', estimated: Math.round(formData.budgetAmount * 0.15), spent: 0, icon: 'Car' },
          { category: 'Food & Dining', estimated: Math.round(formData.budgetAmount * 0.25), spent: 0, icon: 'Utensils' },
          { category: 'Activities & Sightseeing', estimated: Math.round(formData.budgetAmount * 0.15), spent: 0, icon: 'Compass' },
          { category: 'Shopping & Souvenirs', estimated: Math.round(formData.budgetAmount * 0.05), spent: 0, icon: 'ShoppingBag' }
        ],
        itinerary: [
          {
            day: 1,
            title: `Arrival in ${formData.destination || 'Goa'} & Orientation`,
            activities: [
              { id: `gen-1`, time: '11:00 AM', title: `Check-in at Premium ${formData.accommodationType || 'Resort'}`, location: `${formData.destination || 'Goa'} City Center`, cost: 120, completed: false, category: 'Accommodation' },
              { id: `gen-2`, time: '01:30 PM', title: `Welcome Lunch featuring ${formData.foodPreference || 'Local'} Cuisine`, location: 'Harbor Bistro', cost: 40, completed: false, category: 'Food' },
              { id: `gen-3`, time: '05:00 PM', title: 'Sunset Scenic Viewpoint Tour', location: 'Coastal Lookout', cost: 15, completed: false, category: 'Sightseeing' }
            ]
          },
          {
            day: 2,
            title: `Deep Cultural Immersion & Excursions`,
            activities: [
              { id: `gen-4`, time: '09:00 AM', title: `Guided Excursion (${formData.travelStyle || 'Culture'})`, location: 'Historic Heritage Quarter', cost: 30, completed: false, category: 'Activities' },
              { id: `gen-5`, time: '01:00 PM', title: 'Authentic Local Market Tasting', location: 'Old Market Square', cost: 25, completed: false, category: 'Food' },
              { id: `gen-6`, time: '07:30 PM', title: 'Evening Stargazing & Culinary Experience', location: 'Rooftop Lounge', cost: 50, completed: false, category: 'Food' }
            ]
          }
        ],
        notes: [],
        photos: []
      };

      setActiveTrip(generatedTrip);
      setSavedTrips(prev => [generatedTrip, ...prev]);
      setIsGenerating(false);
      navigateTo('itinerary');
    }, 1200);
  };

  // Toggle activity checkbox on During Trip page
  const toggleActivityCompleted = (dayIndex, activityId) => {
    setActiveTrip(prev => {
      const updatedItinerary = prev.itinerary.map((day, idx) => {
        if (idx !== dayIndex) return day;
        return {
          ...day,
          activities: day.activities.map(act => {
            if (act.id === activityId) {
              const newCompleted = !act.completed;
              apiService.updateActivity(prev.id, activityId, { completed: newCompleted });
              return { ...act, completed: newCompleted };
            }
            return act;
          })
        };
      });
      return { ...prev, itinerary: updatedItinerary };
    });
  };

  // Add expense in During Trip / Budget
  const addExpense = (newExpense) => {
    apiService.createExpense(activeTrip.id, newExpense);
    setActiveTrip(prev => {
      const updatedBreakdown = prev.budgetBreakdown.map(item => {
        if (item.category.toLowerCase().includes(newExpense.category.toLowerCase()) || 
            newExpense.category.toLowerCase().includes(item.category.toLowerCase())) {
          return { ...item, spent: item.spent + parseFloat(newExpense.amount) };
        }
        return item;
      });
      return { ...prev, budgetBreakdown: updatedBreakdown };
    });
  };

  // Add Note
  const addNote = (noteText) => {
    setActiveTrip(prev => ({
      ...prev,
      notes: [
        { id: `note-${Date.now()}`, date: new Date().toISOString().split('T')[0], text: noteText },
        ...(prev.notes || [])
      ]
    }));
  };

  // Add Photo
  const addPhoto = (photoUrl, caption) => {
    setActiveTrip(prev => ({
      ...prev,
      photos: [
        { id: `photo-${Date.now()}`, url: photoUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', caption, date: new Date().toISOString().split('T')[0] },
        ...(prev.photos || [])
      ]
    }));
  };

  return (
    <TripContext.Provider value={{
      activePage,
      navigateTo,
      user,
      setUser,
      activeTrip,
      setActiveTrip,
      savedTrips,
      createNewTrip,
      isGenerating,
      toggleActivityCompleted,
      addExpense,
      addNote,
      addPhoto
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
