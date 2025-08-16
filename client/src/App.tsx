import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'wouter';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SocialMediaProvider } from './contexts/SocialMediaContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Ideation from './pages/Ideation';
import Strategy from './pages/Strategy';
import Library from './pages/Library';
import Analytics from './pages/Analytics';
import Collaboration from './pages/Collaboration';
import SocialMedia from './pages/SocialMedia';
import { Helmet } from "react-helmet-async";
import './i18n';

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>}>
      <DndProvider backend={HTML5Backend}>
        <SocialMediaProvider>
          <Router>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/pricing" component={Pricing} />
            <Route>
              <div className="min-h-screen bg-cream">
                <header role="banner">
                  <Navigation />
                </header>
                <main role="main" className="flex-1">
                  <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/ideation" component={Ideation} />
                    <Route path="/strategy" component={Strategy} />
                    <Route path="/library" component={Library} />
                    <Route path="/analytics" component={Analytics} />
                    <Route path="/collaboration" component={Collaboration} />
                    <Route path="/social" component={SocialMedia} />
                  </Switch>
                </main>
              </div>
            </Route>
          </Switch>
        </Router>
      </SocialMediaProvider>
    </DndProvider>
    </Suspense>
  );
}

export default App;