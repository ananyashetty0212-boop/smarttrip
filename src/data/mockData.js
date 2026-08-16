export const POPULAR_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Goa, India',
    tagline: 'Sun-drenched beaches, Portuguese heritage & vibrant nightlife',
    category: 'Beach & Culture',
    rating: 4.8,
    reviews: 1420,
    pricePerDay: '$65',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    weather: '28°C Sunny',
    tags: ['Beaches', 'Nightlife', 'Seafood', 'Heritage']
  },
  {
    id: 'dest-2',
    name: 'Tokyo, Japan',
    tagline: 'Futuristic skyscrapers, ancient shrines & world-class gastronomy',
    category: 'Metropolitan',
    rating: 4.9,
    reviews: 2890,
    pricePerDay: '$140',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    weather: '19°C Clear',
    tags: ['Cyberpunk', 'Tech', 'Ramen', 'Shrines']
  },
  {
    id: 'dest-3',
    name: 'Santorini, Greece',
    tagline: 'Iconic whitewashed cliffs, azure Aegean sea & romantic sunsets',
    category: 'Island Getaway',
    rating: 4.9,
    reviews: 1950,
    pricePerDay: '$180',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    weather: '24°C Breeze',
    tags: ['Sunsets', 'Luxury', 'Wineries', 'Views']
  },
  {
    id: 'dest-4',
    name: 'Swiss Alps, Switzerland',
    tagline: 'Majestic alpine peaks, scenic glacier trains & luxury skiing',
    category: 'Adventure',
    rating: 4.9,
    reviews: 1120,
    pricePerDay: '$210',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    weather: '-2°C Snowy',
    tags: ['Hiking', 'Skiing', 'Chocolates', 'Trains']
  },
  {
    id: 'dest-5',
    name: 'Bali, Indonesia',
    tagline: 'Tropical jungle sanctuaries, terraced rice paddies & surf breaks',
    category: 'Tropical & Wellness',
    rating: 4.7,
    reviews: 3200,
    pricePerDay: '$55',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    weather: '30°C Tropical',
    tags: ['Temples', 'Yoga', 'Surfing', 'Waterfalls']
  },
  {
    id: 'dest-6',
    name: 'Paris, France',
    tagline: 'Eiffel Tower elegance, Louvre masterpieces & sidewalk bistros',
    category: 'Art & Romance',
    rating: 4.8,
    reviews: 4100,
    pricePerDay: '$160',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    weather: '16°C Cloud',
    tags: ['Museums', 'Cuisine', 'Architecture', 'Fashion']
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Enter Trip Parameters',
    description: 'Provide your destination, dates, budget tier, travel style (adventure, relaxing, cultural), dietary & group preferences.'
  },
  {
    step: '02',
    title: 'AI Synthesis & Weather Sync',
    description: 'Our cloud AI processes multi-modal data, real-time climate forecasts, and localized spot recommendations.'
  },
  {
    step: '03',
    title: 'Personalized Day-by-Day Plan',
    description: 'Receive an optimized itinerary with mapped routes, cost allocations, timing, and direct hotel/activity recommendations.'
  },
  {
    step: '04',
    title: 'Live During-Trip Control',
    description: 'Track daily checklist, log live expenses, snap photos, record notes, and receive post-trip automated AI reports.'
  }
];

export const APP_FEATURES = [
  {
    icon: 'Sparkles',
    title: 'AI Neural Itinerary Generator',
    description: 'Tailors multi-day travel schedules based on your exact speed, budget density, and unique personal interests.'
  },
  {
    icon: 'PieChart',
    title: 'Smart Budget Analytics',
    description: 'Categorized financial allocation (Accommodation, Food, Transport, Fun) with progress tracking and savings suggestions.'
  },
  {
    icon: 'CloudSun',
    title: 'Weather-Aware Adaptive Routing',
    description: 'Automatically shifts outdoor excursions to sunny slots and suggests cozy indoor museum spots during rain.'
  },
  {
    icon: 'Users',
    title: 'Group Trip Synchronization',
    description: 'Real-time multi-tenant collaboration allowing friends and family to co-plan, vote on spots, and split expenses.'
  },
  {
    icon: 'Camera',
    title: 'During-Trip Journal & Memory Box',
    description: 'Log daily expenses, rate visited restaurants, capture notes, and build a digital scrap-book on the go.'
  },
  {
    icon: 'FileText',
    title: 'Post-Trip AI PDF Reports',
    description: 'Generate stunning, exportable post-trip analytics reports detailing spent budgets, visited gems, and travel insights.'
  }
];

export const CLOUD_TECH_HIGHLIGHTS = [
  {
    title: 'Multi-Tenant Microservices Architecture',
    subtitle: 'Isolated workspace containers for user privacy, group trip isolation, and lightning-fast data fetching.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Containerized Cloud Deployment (Docker & Kubernetes)',
    subtitle: 'Horizontally scalable microservices designed for zero-downtime itinerary sync globally.',
    icon: 'Box'
  },
  {
    title: 'PaaS & Cloud Storage Object Store',
    subtitle: 'High-throughput S3-compatible cloud storage for instant photo uploads and encrypted document backups.',
    icon: 'Cloud'
  },
  {
    title: 'Edge AI Inference Engine',
    subtitle: 'Ultra-low latency LLM pipeline generating 7-day complete travel schedules in under 3 seconds.',
    icon: 'Zap'
  }
];

export const SAMPLE_TRIP = {
  id: 'trip-goa-2026',
  destination: 'Goa, India',
  startingLocation: 'Mumbai (BOM)',
  startDate: '2026-09-10',
  endDate: '2026-09-14',
  durationDays: 5,
  travelers: 2,
  travelStyle: 'Relaxing & Heritage',
  budgetTier: 'Moderate ($800 Total)',
  totalAllocatedBudget: 800,
  foodPreference: 'Seafood & Goan Local',
  accommodationType: 'Boutique Beach Resort',
  transportationPreference: 'Rental Scooter & Taxi',
  status: 'Upcoming',
  weatherForecast: {
    temp: '29°C',
    condition: 'Mostly Sunny',
    humidity: '72%',
    rainProb: '10%'
  },
  budgetBreakdown: [
    { category: 'Accommodation', estimated: 320, spent: 300, icon: 'Hotel' },
    { category: 'Transport', estimated: 120, spent: 110, icon: 'Car' },
    { category: 'Food & Dining', estimated: 200, spent: 165, icon: 'Utensils' },
    { category: 'Activities & Sightseeing', estimated: 100, spent: 85, icon: 'Compass' },
    { category: 'Shopping & Souvenirs', estimated: 40, spent: 45, icon: 'ShoppingBag' },
    { category: 'Emergency & Misc', estimated: 20, spent: 10, icon: 'ShieldAlert' }
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival & North Goa Coastal Sunset',
      activities: [
        { id: 'a1', time: '10:30 AM', title: 'Check-in at Taj Fort Aguada Resort', location: 'Sinquerim, North Goa', cost: 80, completed: true, category: 'Accommodation' },
        { id: 'a2', time: '01:00 PM', title: 'Lunch at Thalassa Greek Tavern', location: 'Vagator Beach', cost: 35, completed: true, category: 'Food' },
        { id: 'a3', time: '04:30 PM', title: 'Sunset Exploration of Aguada Fort', location: 'Candolim', cost: 10, completed: true, category: 'Sightseeing' },
        { id: 'a4', time: '08:00 PM', title: 'Seafood Dinner at Curlies Beach Shack', location: 'Anjuna Beach', cost: 30, completed: false, category: 'Food' }
      ]
    },
    {
      day: 2,
      title: 'Old Goa Portuguese Heritage & Spice Plantation',
      activities: [
        { id: 'a5', time: '09:00 AM', title: 'Visit Basilica of Bom Jesus UNESCO Site', location: 'Old Goa', cost: 5, completed: false, category: 'Sightseeing' },
        { id: 'a6', time: '11:30 AM', title: 'Sahakari Spice Farm Tour & Organic Buffet', location: 'Ponda', cost: 25, completed: false, category: 'Activities' },
        { id: 'a7', time: '03:30 PM', title: 'Fontainhas Latin Quarter Heritage Walk', location: 'Panaji', cost: 15, completed: false, category: 'Sightseeing' },
        { id: 'a8', time: '07:30 PM', title: 'Mandovi River Sunset Cruise with Goan Folk Dance', location: 'Panaji Jetty', cost: 20, completed: false, category: 'Activities' }
      ]
    },
    {
      day: 3,
      title: 'South Goa Serenity & Watersports',
      activities: [
        { id: 'a9', time: '09:30 AM', title: 'Water Sports & Parasailing at Palolem Beach', location: 'Palolem, South Goa', cost: 45, completed: false, category: 'Activities' },
        { id: 'a10', time: '01:30 PM', title: 'Lunch at Fishermans Wharf', location: 'Cavelossim', cost: 40, completed: false, category: 'Food' },
        { id: 'a11', time: '05:00 PM', title: 'Cabo de Rama Fort Viewpoint', location: 'Canacona', cost: 0, completed: false, category: 'Sightseeing' }
      ]
    }
  ],
  notes: [
    { id: 'n1', date: '2026-09-10', text: 'Remember to pack extra sunblock and rent scooters near Sinquerim Jetty.' },
    { id: 'n2', date: '2026-09-11', text: 'Booked spice plantation guide tour in advance!' }
  ],
  photos: [
    { id: 'p1', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', caption: 'Sunset view at Aguada Fort', date: '2026-09-10' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80', caption: 'Boutique resort pool in Sinquerim', date: '2026-09-10' }
  ]
};

export const SAVED_TRIPS_MOCK = [
  SAMPLE_TRIP,
  {
    id: 'trip-tokyo-2026',
    destination: 'Tokyo & Kyoto, Japan',
    startingLocation: 'Delhi (DEL)',
    startDate: '2026-11-04',
    endDate: '2026-11-12',
    durationDays: 8,
    travelers: 1,
    travelStyle: 'Tech & Culinary Explorer',
    budgetTier: 'Luxury ($2,400 Total)',
    totalAllocatedBudget: 2400,
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
    weatherForecast: { temp: '17°C', condition: 'Clear Sky', humidity: '55%', rainProb: '0%' }
  },
  {
    id: 'trip-swiss-2025',
    destination: 'Interlaken & Zermatt, Switzerland',
    startingLocation: 'Mumbai (BOM)',
    startDate: '2025-12-15',
    endDate: '2025-12-22',
    durationDays: 7,
    travelers: 2,
    travelStyle: 'Winter Alpine Ski',
    budgetTier: 'High ($3,100 Total)',
    totalAllocatedBudget: 3100,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    weatherForecast: { temp: '-4°C', condition: 'Snow Showers', humidity: '80%', rainProb: '40%' }
  }
];
