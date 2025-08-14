import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Calendar, 
  Lightbulb, 
  Target, 
  FolderOpen, 
  BarChart3, 
  Users, 
  Home,
  PenTool,
  Share2
} from 'lucide-react';

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const Navigation = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/ideation', icon: Lightbulb, label: 'Ideation' },
    { path: '/strategy', icon: Target, label: 'Strategy' },
    { path: '/library', icon: FolderOpen, label: 'Library' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/collaboration', icon: Users, label: 'Team' },
    { path: '/social', icon: Share2, label: 'Social' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-neutral-200/50 sticky top-0 z-50" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2" data-testid="brand-logo">
            <div className="w-8 h-8 bg-sage rounded-xl flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-neutral-800">ContentFlow</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1" data-testid="desktop-navigation">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250 ${
                  location === path
                    ? 'bg-sage text-white shadow-sm'
                    : 'text-neutral-600 hover:text-sage hover:bg-sage/5'
                }`}
                data-testid={`nav-link-${label.toLowerCase()}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-600 hover:text-sage hover:bg-sage/5 transition-all duration-250"
              data-testid="mobile-menu-button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200/50 bg-white/95 backdrop-blur-sm" data-testid="mobile-navigation">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-250 ${
                    location === path
                      ? 'bg-sage text-white shadow-sm'
                      : 'text-neutral-600 hover:text-sage hover:bg-sage/5'
                  }`}
                  data-testid={`mobile-nav-link-${label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
        </div>
    </nav>
  );
};

export default Navigation;