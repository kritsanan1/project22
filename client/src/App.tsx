import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SocialMediaProvider>
        <Router>
          <div className="min-h-screen bg-cream">
            <Navigation />
            <main className="transition-all duration-300 ease-in-out">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/ideation" element={<Ideation />} />
                <Route path="/strategy" element={<Strategy />} />
                <Route path="/library" element={<Library />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/collaboration" element={<Collaboration />} />
                <Route path="/social" element={<SocialMedia />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SocialMediaProvider>
    </DndProvider>
  );
}

export default App;