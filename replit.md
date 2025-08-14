# ContentFlow - Content Planning & Social Media Management Platform

## Project Overview
ContentFlow is a comprehensive content planning and social media management application that helps users organize, schedule, and track their content strategy across multiple platforms.

## Architecture
- **Frontend**: React with TypeScript using Vite
- **Backend**: Express.js with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context for social media features
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage for demo)
- **Drag & Drop**: React DnD for interactive content management

## Key Features
- **Dashboard**: Overview of content metrics and quick actions
- **Calendar**: Editorial calendar for content scheduling
- **Ideation**: Content idea capture and organization
- **Strategy**: Content pillar management and strategic planning
- **Library**: Asset and template management
- **Analytics**: Content performance tracking
- **Collaboration**: Team management and workflow
- **Social Media**: Multi-platform posting and management

## Recent Changes
- **Migration from Bolt to Replit** (2025-01-14):
  - Migrated routing from react-router-dom to wouter
  - Fixed syntax errors and type compatibility issues
  - Added comprehensive TypeScript interfaces
  - Implemented proper test IDs throughout components
  - Improved code organization and error handling
  - Enhanced type safety by removing `any` types

## Technical Improvements Made
1. **Type Safety**: Added proper TypeScript interfaces for components
2. **Testing Support**: Added data-testid attributes for all interactive elements
3. **Code Organization**: Extracted reusable components and improved structure
4. **Error Handling**: Enhanced error boundaries and validation
5. **Performance**: Optimized component rendering and state management

## User Preferences
- Focus on clean, maintainable code
- Prefer TypeScript over JavaScript
- Emphasize testing capability with proper test IDs
- Value performance and user experience

## Development Guidelines
- Follow the fullstack_js blueprint for React/Express apps
- Use Tailwind CSS for styling with custom design tokens
- Implement proper error handling and loading states
- Maintain consistent component structure and naming
- Ensure all interactive elements have test IDs

## Color Palette
- Primary: Sage green (#8B9B7D)
- Secondary: Warm blue, warm amber, soft emerald, dusty purple
- Neutrals: Various shades for text and backgrounds
- Background: Cream tone for main layout

## Current Status
✅ Successfully migrated to Replit environment
✅ All core features working properly
✅ Improved code quality and type safety
✅ Enhanced testing capability
✅ Ready for further development and feature additions