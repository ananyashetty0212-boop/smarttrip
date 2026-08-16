import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CursorGlow } from './components/common/CursorGlow';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateTripPage } from './pages/CreateTripPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { BudgetPage } from './pages/BudgetPage';
import { DuringTripPage } from './pages/DuringTripPage';
import { TripReportPage } from './pages/TripReportPage';
import { ProfilePage } from './pages/ProfilePage';
import { SavedTripsPage } from './pages/SavedTripsPage';

const PageRenderer = () => {
  const { activePage } = useTrip();

  switch (activePage) {
    case 'landing': return <LandingPage />;
    case 'login': return <LoginPage />;
    case 'register': return <RegisterPage />;
    case 'dashboard': return <DashboardPage />;
    case 'planner': return <CreateTripPage />;
    case 'itinerary': return <ItineraryPage />;
    case 'budget': return <BudgetPage />;
    case 'during-trip': return <DuringTripPage />;
    case 'report': return <TripReportPage />;
    case 'profile': return <ProfilePage />;
    case 'saved-trips': return <SavedTripsPage />;
    default: return <LandingPage />;
  }
};

export function AppContent() {
  return (
    <div className="app-container">
      <CursorGlow />
      <Navbar />
      <main className="main-content">
        <PageRenderer />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <TripProvider>
      <AppContent />
    </TripProvider>
  );
}
