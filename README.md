
# CSM Smart Connect

A modern Customer Success Management (CSM) application with integrated social media management capabilities, built for teams to streamline content creation, scheduling, and analytics.

## 🚀 Features

- **Dashboard:** Unified view of activities, deadlines, and quick actions
- **Social Media Management:** Multi-platform posting, scheduling, and analytics via Ayrshare
- **Content Calendar:** Visual content planning and scheduling
- **Analytics:** Comprehensive performance metrics and insights
- **Team Collaboration:** Shared projects and activity feeds
- **Content Strategy:** Strategic planning tools and content pillars
- **Asset Library:** Centralized media and content management
- **AI-Powered Insights:** Gemini integration for content suggestions

## 🛠 Technical Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** Passport.js with session management
- **State Management:** React Query, Context API
- **Build Tool:** Vite
- **Deployment:** Replit (development and production)

## 📋 Prerequisites

- Node.js 20.x or higher
- PostgreSQL 16
- Replit account (for deployment)

## 🔧 Installation

### Local Development Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd csm-smart-connect
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Configuration:**
Create a `.env` file in the root directory:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/csm_smart_connect
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=csm_smart_connect

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-here

# Ayrshare API (Social Media Integration)
AYRSHARE_API_KEY=your-ayrshare-api-key

# Gemini AI Integration
GEMINI_API_KEY=your-gemini-api-key

# Environment
NODE_ENV=development
PORT=5000
```

4. **Database Setup:**
```bash
# Push database schema
npm run db:push
```

5. **Start Development Server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Replit Deployment

1. **Import Project:** Fork or import the repository into Replit
2. **Configure Secrets:** Add environment variables in Replit Secrets:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `AYRSHARE_API_KEY`
   - `GEMINI_API_KEY`
3. **Run:** Click the Run button or use `npm run dev`

## 📜 Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run dev` | Start development server with hot reload | Development |
| `npm run build` | Build for production | Deployment |
| `npm run start` | Start production server | Production |
| `npm run check` | TypeScript type checking | Code quality |
| `npm run db:push` | Push database schema changes | Database |

## 🏗 Architecture

### Frontend Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route-level components
├── contexts/      # React context providers
├── services/      # API integration layer
├── hooks/         # Custom React hooks
└── types/         # TypeScript definitions
```

### Key Integrations

**Ayrshare API:** Social media posting and analytics
- Base URL: `https://app.ayrshare.com/api`
- Authentication: API Key in headers
- Features: Post scheduling, analytics, account management

**Gemini AI:** Content suggestions and insights
- Used for trend analysis and content recommendations
- Integrated through dedicated service layer

## 🔀 Development Workflow

### Branch Naming Convention
```
[type]/[ticket-number]-[description]
```

Examples:
- `feature/CSM-123-social-media-integration`
- `bugfix/CSM-456-calendar-rendering-issue`
- `hotfix/CSM-789-api-connection-timeout`

### Pull Request Process

1. **Create Feature Branch:**
```bash
git checkout -b feature/CSM-123-new-feature
```

2. **Make Changes and Test:**
```bash
npm run check  # Type checking
npm run build  # Build verification
```

3. **Commit with Conventional Commits:**
```bash
git commit -m "feat(social): add Ayrshare integration for posting"
```

4. **Create Pull Request** with template:

```markdown
## 📝 Changes
- Brief description of changes made

## 🧪 Testing Steps
1. Step-by-step testing instructions
2. Expected behavior verification

## 📷 Screenshots
[Include relevant screenshots]

## ✅ Review Checklist
- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Components have proper test IDs
- [ ] Responsive design verified
- [ ] Error handling implemented
```

## 🚀 Deployment

### Replit Deployment (Recommended)

1. **Build Application:**
```bash
npm run build
```

2. **Deploy:** Use Replit's deployment feature
   - Automatically builds and serves the application
   - Handles SSL certificates and domain management
   - Zero-downtime deployments

3. **Environment Variables:** Ensure all required secrets are configured in Replit

### Production Considerations

- **Database:** Use Replit's PostgreSQL or external database service
- **Session Storage:** Configure session persistence for production
- **API Rate Limits:** Monitor Ayrshare and Gemini API usage
- **Security:** Use HTTPS and secure session configurations

## 🔐 Security

- **API Keys:** Never commit API keys to version control
- **Session Security:** Strong session secrets and secure cookie settings
- **Input Validation:** All user inputs are validated and sanitized
- **CORS:** Properly configured for production domains

## 🐛 Troubleshooting

### Common Issues

**Ayrshare API Errors:**
```javascript
// Check console for: "Ayrshare API key not found"
// Solution: Verify AYRSHARE_API_KEY is set in environment
```

**Database Connection Issues:**
```bash
# Verify PostgreSQL is running
# Check DATABASE_URL format
# Run: npm run db:push
```

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** following naming convention
3. **Make changes** with proper TypeScript types and test IDs
4. **Test thoroughly** including responsive design
5. **Submit pull request** using the provided template

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation:** Check `/docs` directory for detailed guides
- **Issues:** Create GitHub issues for bugs and feature requests
- **Discussions:** Use GitHub Discussions for questions

---

**Built with ❤️ for Customer Success teams by the CSM Smart Connect team**
