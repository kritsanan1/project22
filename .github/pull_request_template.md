
# Pull Request

## 📝 Description
Brief description of the changes made in this PR.

## 🎯 Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 Style/UI changes
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvements
- [ ] 🧪 Adding or updating tests
- [ ] 🔧 Configuration changes

## 🔗 Related Issues
Fixes #(issue number)
Closes #(issue number)
Related to #(issue number)

## 📋 Changes Made

### Frontend Changes
- [ ] Component modifications
- [ ] New UI features
- [ ] Styling updates
- [ ] Route changes

### Backend Changes
- [ ] API endpoint modifications
- [ ] Database schema changes
- [ ] Service layer updates
- [ ] Authentication changes

### Configuration Changes
- [ ] Environment variables
- [ ] Build configuration
- [ ] Dependencies updated
- [ ] CI/CD changes

## 🧪 Testing Instructions

### Manual Testing Steps
1. Step 1: Description of what to test
2. Step 2: Expected behavior
3. Step 3: How to verify the change works

### Automated Tests
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] All existing tests pass

### Test Coverage
- [ ] New code has adequate test coverage
- [ ] No decrease in overall test coverage

## 📷 Screenshots/Videos
<!-- Include screenshots or videos demonstrating the changes -->

### Before
<!-- Screenshot/description of the current state -->

### After
<!-- Screenshot/description of the new state -->

## 🔍 Code Review Checklist

### Code Quality
- [ ] Code follows the project's coding standards
- [ ] Code is self-documenting and/or well-commented
- [ ] No console.log statements left in production code
- [ ] Error handling is implemented appropriately
- [ ] No hardcoded values (use environment variables/constants)

### TypeScript
- [ ] Proper TypeScript types are used
- [ ] No use of `any` type without justification
- [ ] Interfaces and types are well-defined
- [ ] Type imports are properly organized

### React/Frontend
- [ ] Components have proper prop types
- [ ] Components have appropriate test-ids for testing
- [ ] Accessibility standards are followed (ARIA labels, keyboard navigation)
- [ ] Components are responsive and mobile-friendly
- [ ] State management is appropriate for the component's scope

### Performance
- [ ] No unnecessary re-renders
- [ ] Proper use of React hooks (dependencies, cleanup)
- [ ] Images are optimized and have appropriate alt text
- [ ] Bundle size impact is acceptable

### Security
- [ ] No sensitive information exposed in client-side code
- [ ] Input validation is implemented where necessary
- [ ] API endpoints have proper authentication/authorization
- [ ] XSS and other security vulnerabilities are addressed

### Database/Backend
- [ ] Database migrations are reversible (if applicable)
- [ ] API responses are properly formatted
- [ ] Proper error handling and logging
- [ ] No N+1 query issues

## 🌐 Browser Testing
Tested on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## 📱 Mobile Testing
- [ ] Responsive design works on mobile devices
- [ ] Touch interactions work properly
- [ ] Performance is acceptable on mobile

## 🔧 Environment Testing
- [ ] Development environment
- [ ] Staging environment (if available)
- [ ] Production environment (post-deployment)

## 📚 Documentation
- [ ] README updated (if necessary)
- [ ] API documentation updated (if applicable)
- [ ] Component documentation updated
- [ ] Environment variables documented

## 🚀 Deployment Notes
<!-- Any special instructions for deployment -->
- [ ] Requires database migration
- [ ] Requires environment variable updates
- [ ] Requires cache clearing
- [ ] Requires service restart
- [ ] No special deployment requirements

## ⚠️ Breaking Changes
<!-- List any breaking changes and migration instructions -->
None

## 🎯 Post-Deployment Verification
<!-- Steps to verify the deployment was successful -->
1. [ ] Feature works as expected in production
2. [ ] No error messages in logs
3. [ ] Performance metrics are acceptable
4. [ ] User feedback is positive (if user-facing change)

## 📞 Reviewer Notes
<!-- Any additional information for reviewers -->

### Areas of Focus
Please pay special attention to:
- [ ] Specific component/function that needs careful review
- [ ] Performance implications
- [ ] Security considerations
- [ ] Integration with existing features

### Questions for Reviewers
- Any questions you have for the reviewers

## 🔄 Follow-up Tasks
<!-- Any tasks that need to be completed after this PR is merged -->
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

---

## Reviewer Checklist
<!-- For reviewers to complete -->
- [ ] Code review completed
- [ ] Functionality tested
- [ ] Performance impact assessed
- [ ] Security implications reviewed
- [ ] Documentation reviewed
- [ ] Ready for merge
