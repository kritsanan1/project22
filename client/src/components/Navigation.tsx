import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  BarChart3, 
  Calendar, 
  Lightbulb, 
  Target, 
  FolderOpen, 
  Users, 
  Share2, 
  LayoutDashboard, 
  Menu,
  X
} from 'lucide-react';
import { LanguageSelector } from './i18n/LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

const Navigation = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation('navigation');

  const navItems: NavItem[] = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('dashboard'), description: 'Main overview and insights' },
    { path: '/social', icon: Share2, label: t('social'), description: 'Manage posts and accounts' },
    { path: '/calendar', icon: Calendar, label: t('calendar'), description: 'Schedule and plan content' },
    { path: '/analytics', icon: BarChart3, label: t('analytics'), description: 'Performance metrics and reports' },
    { path: '/collaboration', icon: Users, label: t('collaboration'), description: 'Team collaboration tools' },
    { path: '/library', icon: FolderOpen, label: t('library'), description: 'Media and content assets' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-50 shadow-sm" data-testid="main-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3" data-testid="brand-logo">
              <div className="w-9 h-9 bg-gradient-to-br from-sage to-soft-emerald rounded-xl flex items-center justify-center shadow-sm">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-neutral-800 leading-none">ContentFlow</span>
                <span className="text-xs text-neutral-500 leading-none">Social Media Suite</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" data-testid="desktop-navigation">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  href={path}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    location === path
                      ? 'bg-sage text-white shadow-md'
                      : 'text-neutral-600 hover:text-sage hover:bg-sage/8'
                  }`}
                  data-testid={`nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="whitespace-nowrap">{label}</span>
                  {location === path && (
                    <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl text-neutral-600 hover:text-sage hover:bg-sage/8 transition-all duration-300 touch-target"
                data-testid="mobile-menu-button"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Language Selector */}
            <div className="hidden lg:flex items-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-xl" data-testid="mobile-navigation">
            <div className="max-h-96 overflow-y-auto">
              <div className="px-4 py-3 space-y-1">
                {navItems.map(({ path, icon: Icon, label, description }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-start space-x-4 px-4 py-4 rounded-xl transition-all duration-300 touch-target ${
                      location === path
                        ? 'bg-sage text-white shadow-md'
                        : 'text-neutral-700 hover:text-sage hover:bg-sage/8'
                    }`}
                    data-testid={`mobile-nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base">{label}</div>
                      <div className={`text-sm mt-0.5 ${
                        location === path ? 'text-white/80' : 'text-neutral-500'
                      }`}>
                        {description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;