import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SocialMediaProvider } from './contexts/SocialMediaContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Ideation from './pages/Ideation';
import Strategy from './pages/Strategy';
import Library from './pages/Library';
import Analytics from './pages/Analytics';
import Collaboration from './pages/Collaboration';
import SocialMedia from './pages/SocialMedia';
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SocialMediaProvider>
        <Router>
          <div className="min-h-screen bg-cream">
            <header role="banner">
              <Navigation />
            </header>
            <main role="main" className="flex-1">
              <Switch>
                <Route path="/" component={Dashboard} />
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
        </Router>
      </SocialMediaProvider>
    </DndProvider>
  );
}

export default App;