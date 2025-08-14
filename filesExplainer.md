
# File Structure Documentation

## Project Overview
CSM Smart Connect - A Customer Success Management application with social media integration, built with React/TypeScript frontend and Express backend.

**Total Files:** 50+ | **Complexity Distribution:** 🟢 Low: 60% | 🟡 Medium: 30% | 🔴 High: 10%

## Directory Structure

```
├── 📁 root configuration files
├── 📁 attached_assets/           # Temporary assets and documentation
├── 📁 client/                   # Frontend React application
├── 📁 server/                   # Backend Express server
└── 📁 shared/                   # Shared TypeScript schemas

### Root Configuration Files 🟢
├── .gitignore                   # Git ignore patterns
├── .replit                      # Replit configuration 🟡
├── components.json              # shadcn/ui component configuration
├── drizzle.config.ts           # Database configuration 🟡
├── package.json                # Project dependencies and scripts 🔴
├── package-lock.json           # Dependency lock file
├── postcss.config.js           # PostCSS configuration 🟢
├── replit.md                   # Project notes and migration history
├── tailwind.config.ts          # Tailwind CSS configuration 🟡
├── tsconfig.json               # TypeScript configuration 🟡
└── vite.config.ts              # Vite bundler configuration 🟡

### Client Application (Frontend)
├── client/
│   ├── index.html              # Main HTML template 🟢
│   └── src/
│       ├── main.tsx            # Application entry point 🟡
│       ├── App.tsx             # Root component with routing 🔴
│       ├── index.css           # Global styles and Tailwind imports 🟢
│       ├── vite-env.d.ts       # Vite type definitions 🟢
│       ├── components/         # Reusable UI components
│       ├── contexts/           # React context providers
│       ├── hooks/              # Custom React hooks
│       ├── pages/              # Page-level components
│       ├── services/           # API integration services
│       └── types/              # TypeScript type definitions

#### Components Directory
├── components/
│   ├── Navigation.tsx          # Main navigation component 🟡
│   ├── analytics/              # Analytics dashboard components
│   │   ├── ChannelAnalytics.tsx      # Social media channel performance 🟡
│   │   ├── ContentPerformance.tsx    # Content metrics and insights 🟡
│   │   ├── MetricsOverview.tsx       # High-level metrics dashboard 🟡
│   │   └── PlanningInsights.tsx      # Content planning analytics 🟡
│   ├── calendar/               # Content calendar components
│   │   ├── CalendarGrid.tsx          # Calendar view layout 🟡
│   │   └── ContentCard.tsx           # Individual content item card 🟢
│   ├── collaboration/          # Team collaboration features
│   │   ├── ActivityFeed.tsx          # Recent team activities 🟡
│   │   ├── RecentCollaboration.tsx   # Collaboration history 🟢
│   │   ├── SharedProjects.tsx        # Shared project management 🟡
│   │   └── TeamMembers.tsx           # Team member management 🟡
│   ├── dashboard/              # Main dashboard components
│   │   ├── ContentPillars.tsx        # Content strategy pillars 🟡
│   │   ├── QuickActions.tsx          # Quick action buttons 🟡
│   │   ├── RecentActivity.tsx        # Recent user activities 🟡
│   │   └── UpcomingDeadlines.tsx     # Deadline tracking 🟡
│   ├── ideation/               # Content ideation tools
│   │   ├── IdeaBoard.tsx             # Idea management board 🟡
│   │   ├── IdeaCapture.tsx           # New idea creation form 🟡
│   │   └── TopicClusters.tsx         # Topic organization 🟡
│   ├── library/                # Asset library management
│   │   ├── AssetGrid.tsx             # Grid view of assets 🟡
│   │   ├── AssetList.tsx             # List view of assets 🟡
│   │   └── FolderTree.tsx            # Hierarchical folder view 🟡
│   ├── social/                 # Social media management
│   │   ├── ConnectedAccounts.tsx     # Social account connections 🔴
│   │   ├── ContentSuggestions.tsx    # AI-powered content ideas 🟡
│   │   ├── PostCreator.tsx           # Social media post composer 🔴
│   │   ├── PostScheduler.tsx         # Post scheduling interface 🔴
│   │   ├── SocialAnalytics.tsx       # Social media analytics 🔴
│   │   ├── TrendAnalytics.tsx        # Trending topics analysis 🔴
│   │   └── UnifiedInbox.tsx          # Unified social inbox 🔴
│   └── strategy/               # Content strategy planning
│       ├── ContentBriefs.tsx         # Content brief templates 🟡
│       ├── ContentPillarsStrategy.tsx # Strategic content pillars 🟡
│       └── StrategicGoals.tsx        # Goal setting and tracking 🟡

#### Application Structure
├── contexts/
│   └── SocialMediaContext.tsx  # Social media state management 🔴
├── hooks/
│   └── useLocalStorage.ts      # Local storage custom hook 🟢
├── pages/                      # Page-level route components
│   ├── Dashboard.tsx           # Main dashboard page 🔴
│   ├── Analytics.tsx           # Analytics overview page 🟡
│   ├── Calendar.tsx            # Content calendar page 🟡
│   ├── Collaboration.tsx       # Team collaboration page 🟡
│   ├── Ideation.tsx            # Content ideation page 🟡
│   ├── Library.tsx             # Asset library page 🟡
│   ├── SocialMedia.tsx         # Social media management page 🔴
│   └── Strategy.tsx            # Content strategy page 🟡
├── services/                   # External API integrations
│   ├── ayrshareService.ts      # Ayrshare API integration 🔴
│   ├── socialMediaService.ts   # Social media service layer 🔴
│   └── supabaseClient.ts       # Supabase database client 🟡
└── types/
    └── social.ts               # Social media type definitions 🟢

### Server Application (Backend)
├── server/
│   ├── index.ts                # Express server entry point 🔴
│   ├── routes.ts               # API route definitions 🟡
│   ├── storage.ts              # Data storage utilities 🟡
│   └── vite.ts                 # Vite development server setup 🟡

### Shared Resources
├── shared/
│   └── schema.ts               # Shared data schemas 🟡
```

## Import Complexity Legend
- 🟢 **Low Complexity (0-3 imports):** Simple components with minimal dependencies
- 🟡 **Medium Complexity (4-7 imports):** Standard components with moderate dependencies
- 🔴 **High Complexity (8+ imports):** Complex components with extensive integrations

## Key Architectural Patterns
- **Feature-based organization:** Components grouped by functionality
- **Service layer pattern:** Separate API integration services
- **Context-based state management:** React contexts for global state
- **Type-safe development:** Comprehensive TypeScript coverage
- **Modern tooling:** Vite, Tailwind CSS, shadcn/ui components
