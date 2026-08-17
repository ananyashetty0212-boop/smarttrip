import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_TRIP, SAVED_TRIPS_MOCK } from '../data/mockData';
import { apiService } from '../services/api';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('landing');

  const [user, setUser] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@smarttrip.ai',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tier: 'Pro Traveler (Level 4)',
    homeCity: 'Mumbai, India',
    cloudStorageUsed: '1.4 GB / 10 GB',
    multiTenancyId: 'TENANT-ORG-88342'
  });

  const [activeTrip, setActiveTrip] = useState(SAMPLE_TRIP);
  const [savedTrips, setSavedTrips] = useState(SAVED_TRIPS_MOCK);
  const [isGenerating, setIsGenerating] = useState(false);

  // =========================================================
  // LOAD USER + SAVED TRIPS FROM BACKEND
  // =========================================================

  useEffect(() => {
    async function loadBackendData() {
      try {
        const userRes = await apiService.getMe();

        if (userRes && userRes.success && userRes.data) {
          setUser(prev => ({
            ...prev,
            ...userRes.data
          }));
        }

        const tripsRes = await apiService.getTrips();

        if (
          tripsRes &&
          tripsRes.success &&
          tripsRes.data &&
          tripsRes.data.length > 0
        ) {
          setSavedTrips(tripsRes.data);
        }
      } catch (error) {
        console.error('Backend data loading error:', error);
      }
    }

    loadBackendData();
  }, []);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const navigateTo = page => {
    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // =========================================================
  // CREATE ITINERARY FOR ANY NUMBER OF DAYS
  // =========================================================

  const generateItinerary = formData => {
    const destination = formData.destination || 'Goa, India';
    const accommodation =
      formData.accommodationType || 'Boutique Resort';
    const food = formData.foodPreference || 'Local Specialties';
    const travelStyle =
      formData.travelStyle || 'Adventure & Culture';

    const requestedDays = Math.max(
      1,
      parseInt(formData.durationDays) || 5
    );

    const dayTemplates = [
      {
        title: `Arrival in ${destination} & Orientation`,
        activities: [
          {
            time: '11:00 AM',
            title: `Check-in at ${accommodation}`,
            location: `${destination} City Center`,
            cost: 120,
            category: 'Accommodation'
          },
          {
            time: '01:30 PM',
            title: `Welcome Lunch featuring ${food} Cuisine`,
            location: 'Local Restaurant',
            cost: 40,
            category: 'Food'
          },
          {
            time: '05:00 PM',
            title: 'Sunset Scenic Viewpoint Tour',
            location: 'Coastal Lookout',
            cost: 15,
            category: 'Sightseeing'
          }
        ]
      },

      {
        title: 'Deep Cultural Immersion & Excursions',
        activities: [
          {
            time: '09:00 AM',
            title: `Guided ${travelStyle} Excursion`,
            location: 'Historic Heritage Quarter',
            cost: 30,
            category: 'Activities'
          },
          {
            time: '01:00 PM',
            title: 'Authentic Local Market Experience',
            location: 'Old Market Square',
            cost: 25,
            category: 'Food'
          },
          {
            time: '07:30 PM',
            title: 'Evening Stargazing & Culinary Experience',
            location: 'Rooftop Lounge',
            cost: 50,
            category: 'Food'
          }
        ]
      },

      {
        title: 'Adventure & Natural Attractions',
        activities: [
          {
            time: '08:00 AM',
            title: 'Morning Nature Exploration',
            location: `${destination} Nature Trail`,
            cost: 35,
            category: 'Adventure'
          },
          {
            time: '12:30 PM',
            title: 'Lunch with Local Specialties',
            location: 'Traditional Local Restaurant',
            cost: 35,
            category: 'Food'
          },
          {
            time: '04:00 PM',
            title: 'Adventure Activity & Photography',
            location: 'Scenic Adventure Zone',
            cost: 60,
            category: 'Adventure'
          }
        ]
      },

      {
        title: 'Local Experiences & Hidden Gems',
        activities: [
          {
            time: '09:30 AM',
            title: 'Explore Local Hidden Gems',
            location: `${destination} Old Town`,
            cost: 20,
            category: 'Sightseeing'
          },
          {
            time: '01:00 PM',
            title: 'Traditional Food Experience',
            location: 'Local Food Street',
            cost: 30,
            category: 'Food'
          },
          {
            time: '05:30 PM',
            title: 'Golden Hour Photography Walk',
            location: 'Scenic Viewpoint',
            cost: 15,
            category: 'Sightseeing'
          }
        ]
      },

      {
        title: 'Relaxation, Shopping & Leisure',
        activities: [
          {
            time: '09:00 AM',
            title: 'Relaxing Morning & Wellness Session',
            location: 'Hotel / Wellness Center',
            cost: 50,
            category: 'Wellness'
          },
          {
            time: '02:00 PM',
            title: 'Shopping for Local Souvenirs',
            location: 'Local Shopping District',
            cost: 45,
            category: 'Shopping'
          },
          {
            time: '07:00 PM',
            title: 'Dinner & Local Cultural Show',
            location: 'Cultural Venue',
            cost: 55,
            category: 'Culture'
          }
        ]
      },

      {
        title: 'Extended Exploration Day',
        activities: [
          {
            time: '08:30 AM',
            title: 'Full-Day Scenic Exploration',
            location: `${destination} Surrounding Area`,
            cost: 70,
            category: 'Sightseeing'
          },
          {
            time: '01:00 PM',
            title: 'Regional Cuisine Lunch',
            location: 'Local Restaurant',
            cost: 35,
            category: 'Food'
          },
          {
            time: '06:30 PM',
            title: 'Sunset & Evening Leisure',
            location: 'Popular Sunset Point',
            cost: 20,
            category: 'Leisure'
          }
        ]
      },

      {
        title: 'Final Exploration & Departure',
        activities: [
          {
            time: '09:00 AM',
            title: 'Final City Exploration',
            location: `${destination} City Center`,
            cost: 25,
            category: 'Sightseeing'
          },
          {
            time: '12:30 PM',
            title: 'Farewell Lunch',
            location: 'Recommended Local Restaurant',
            cost: 40,
            category: 'Food'
          },
          {
            time: '03:00 PM',
            title: 'Check-out & Departure Preparation',
            location: accommodation,
            cost: 0,
            category: 'Accommodation'
          }
        ]
      }
    ];

    const itinerary = Array.from(
      { length: requestedDays },
      (_, index) => {
        const template =
          dayTemplates[index % dayTemplates.length];

        return {
          day: index + 1,

          title:
            index < dayTemplates.length
              ? template.title
              : `Day ${index + 1} Exploration of ${destination}`,

          activities: template.activities.map(
            (activity, activityIndex) => ({
              id: `gen-${index + 1}-${activityIndex + 1}`,
              time: activity.time,
              title: activity.title,
              location: activity.location,
              cost: activity.cost,
              completed: false,
              category: activity.category
            })
          )
        };
      }
    );

    return itinerary;
  };

  // =========================================================
  // CREATE NEW TRIP
  // =========================================================

  const createNewTrip = async formData => {
    setIsGenerating(true);

    const durationDays = Math.max(
      1,
      parseInt(formData.durationDays) || 5
    );

    const budgetAmount =
      parseInt(formData.budgetAmount) || 1000;

    const apiPayload = {
      destination: formData.destination || 'Goa, India',

      startingLocation:
        formData.startingLocation || 'Mumbai',

      startDate:
        formData.startDate || '2026-10-01',

      endDate:
        formData.endDate || '2026-10-05',

      duration: durationDays,

      durationDays: durationDays,

      travelers:
        formData.travelers || 2,

      budget: budgetAmount,

      currency: 'USD',

      travelStyle:
        formData.travelStyle || 'Adventure & Culture',

      interests:
        formData.interests || [],

      foodPreference:
        formData.foodPreference || 'Local Specialties',

      accommodationPreference:
        formData.accommodationType || 'Boutique Resort',

      transportationPreference:
        formData.transportationPreference ||
        'Rental Scooter & Cab'
    };

    // Send trip to backend
    try {
      const response =
        await apiService.createTrip(apiPayload);

      console.log(
        'BACKEND TRIP CREATION RESPONSE:',
        response
      );
    } catch (error) {
      console.error(
        'Backend trip creation error:',
        error
      );
    }

    // =======================================================
    // LOCAL UI ITINERARY
    // IMPORTANT:
    // This now creates EXACTLY durationDays number of days.
    // =======================================================

    const generatedTrip = {
      id: `trip-${Date.now()}`,

      destination:
        formData.destination || 'Goa, India',

      startingLocation:
        formData.startingLocation || 'Mumbai',

      startDate:
        formData.startDate || '2026-10-01',

      endDate:
        formData.endDate || '2026-10-05',

      durationDays,

      travelers:
        formData.travelers || 2,

      travelStyle:
        formData.travelStyle ||
        'Adventure & Culture',

      budgetTier:
        formData.budgetTier ||
        'Moderate ($1,000)',

      totalAllocatedBudget:
        budgetAmount,

      foodPreference:
        formData.foodPreference ||
        'Local & Seafood',

      accommodationType:
        formData.accommodationType ||
        'Boutique Resort',

      transportationPreference:
        formData.transportationPreference ||
        'Rental Scooter & Cab',

      status: 'Upcoming',

      weatherForecast: {
        temp: '27°C',
        condition: 'Sunny Breeze',
        humidity: '65%',
        rainProb: '5%'
      },

      budgetBreakdown: [
        {
          category: 'Accommodation',
          estimated: Math.round(
            budgetAmount * 0.4
          ),
          spent: 0,
          icon: 'Hotel'
        },

        {
          category: 'Transport',
          estimated: Math.round(
            budgetAmount * 0.15
          ),
          spent: 0,
          icon: 'Car'
        },

        {
          category: 'Food & Dining',
          estimated: Math.round(
            budgetAmount * 0.25
          ),
          spent: 0,
          icon: 'Utensils'
        },

        {
          category: 'Activities & Sightseeing',
          estimated: Math.round(
            budgetAmount * 0.15
          ),
          spent: 0,
          icon: 'Compass'
        },

        {
          category: 'Shopping & Souvenirs',
          estimated: Math.round(
            budgetAmount * 0.05
          ),
          spent: 0,
          icon: 'ShoppingBag'
        }
      ],

      // =====================================================
      // DYNAMIC ITINERARY
      // =====================================================

      itinerary: generateItinerary(formData),

      notes: [],

      photos: []
    };

    setActiveTrip(generatedTrip);

    setSavedTrips(prev => [
      generatedTrip,
      ...prev
    ]);

    setIsGenerating(false);

    navigateTo('itinerary');
  };

  // =========================================================
  // TOGGLE ACTIVITY
  // =========================================================

  const toggleActivityCompleted = (
    dayIndex,
    activityId
  ) => {
    setActiveTrip(prev => {
      const updatedItinerary =
        prev.itinerary.map((day, idx) => {
          if (idx !== dayIndex) {
            return day;
          }

          return {
            ...day,

            activities:
              day.activities.map(act => {
                if (act.id === activityId) {
                  const newCompleted =
                    !act.completed;

                  apiService.updateActivity(
                    prev.id,
                    activityId,
                    {
                      completed:
                        newCompleted
                    }
                  );

                  return {
                    ...act,
                    completed:
                      newCompleted
                  };
                }

                return act;
              })
          };
        });

      return {
        ...prev,
        itinerary:
          updatedItinerary
      };
    });
  };

  // =========================================================
  // ADD EXPENSE
  // =========================================================

  const addExpense = newExpense => {
    apiService.createExpense(
      activeTrip.id,
      newExpense
    );

    setActiveTrip(prev => {
      const updatedBreakdown =
        prev.budgetBreakdown.map(item => {
          if (
            item.category
              .toLowerCase()
              .includes(
                newExpense.category
                  .toLowerCase()
              ) ||
            newExpense.category
              .toLowerCase()
              .includes(
                item.category.toLowerCase()
              )
          ) {
            return {
              ...item,

              spent:
                item.spent +
                parseFloat(
                  newExpense.amount
                )
            };
          }

          return item;
        });

      return {
        ...prev,
        budgetBreakdown:
          updatedBreakdown
      };
    });
  };

  // =========================================================
  // ADD NOTE
  // =========================================================

  const addNote = noteText => {
    setActiveTrip(prev => ({
      ...prev,

      notes: [
        {
          id: `note-${Date.now()}`,
          date:
            new Date()
              .toISOString()
              .split('T')[0],
          text: noteText
        },

        ...(prev.notes || [])
      ]
    }));
  };

  // =========================================================
  // ADD PHOTO
  // =========================================================

  const addPhoto = (
    photoUrl,
    caption
  ) => {
    setActiveTrip(prev => ({
      ...prev,

      photos: [
        {
          id: `photo-${Date.now()}`,

          url:
            photoUrl ||
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',

          caption,

          date:
            new Date()
              .toISOString()
              .split('T')[0]
        },

        ...(prev.photos || [])
      ]
    }));
  };

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <TripContext.Provider
      value={{
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
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () =>
  useContext(TripContext);