
# Testing Guide

## Overview
This project uses Vitest as the test runner with React Testing Library for component testing and MSW for API mocking.

## Testing Stack
- **Vitest**: Fast unit test framework built on Vite
- **React Testing Library**: Testing utilities for React components
- **MSW**: Mock Service Worker for API mocking
- **@testing-library/user-event**: Utilities for simulating user interactions

## Running Tests

### Development
```bash
# Run tests in watch mode
npm run test

# Run tests with UI dashboard
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

### Coverage Reports
Coverage reports are generated in the `coverage/` directory and include:
- Text summary in terminal
- HTML report at `coverage/index.html`
- JSON report for CI/CD integration

## Test Structure

### Unit Tests
- **Components**: `components/**/__tests__/*.test.tsx`
- **Services**: `services/**/__tests__/*.test.ts`
- **Contexts**: `contexts/**/__tests__/*.test.tsx`
- **Utilities**: `utils/**/__tests__/*.test.ts`

### Test Files
- Use `.test.tsx` or `.test.ts` extensions
- Place tests in `__tests__` directories near source files
- Use descriptive test names that explain the expected behavior

## Writing Tests

### Component Testing Example
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils/test-utils'
import userEvent from '@testing-library/user-event'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders with correct text', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### Service Testing Example
```ts
import { describe, it, expect, vi } from 'vitest'
import { myService } from '../myService'

// Mock dependencies
vi.mock('../dependency', () => ({
  dependency: vi.fn()
}))

describe('myService', () => {
  it('processes data correctly', async () => {
    const result = await myService.processData('input')
    expect(result).toEqual('expected output')
  })
})
```

## Mocking Guidelines

### API Mocking with MSW
- Add new handlers to `test/mocks/server.ts`
- Override handlers in individual tests when needed
- Mock both success and error scenarios

### Component Mocking
```tsx
// Mock child components
vi.mock('../ChildComponent', () => ({
  default: () => <div data-testid="child-component">Child</div>
}))
```

### Environment Variables
```ts
// Mock environment variables
vi.stubEnv('VITE_API_KEY', 'test-key')
```

## Best Practices

### 1. Test Behavior, Not Implementation
- Test what the user sees and does
- Avoid testing internal component state
- Focus on user interactions and outcomes

### 2. Use Descriptive Test Names
```tsx
// Good
it('shows error message when API call fails')

// Bad
it('handles error')
```

### 3. Arrange, Act, Assert Pattern
```tsx
it('creates a new post when form is submitted', async () => {
  // Arrange
  const user = userEvent.setup()
  render(<PostCreator />)
  
  // Act
  await user.type(screen.getByLabelText('Post content'), 'Hello world')
  await user.click(screen.getByRole('button', { name: 'Post' }))
  
  // Assert
  expect(screen.getByText('Post created successfully')).toBeInTheDocument()
})
```

### 4. Clean Up After Tests
- Use `beforeEach` and `afterEach` for setup/cleanup
- MSW automatically resets handlers between tests
- React Testing Library cleans up rendered components

### 5. Test Edge Cases
- Empty states
- Loading states
- Error conditions
- Network failures
- Invalid inputs

## CI/CD Integration
Tests run automatically on:
- Push to main/develop branches
- Pull requests
- GitHub Actions workflow generates coverage reports

## Debugging Tests
- Use `screen.debug()` to see rendered HTML
- Add `console.log` statements for debugging
- Run single test files: `npm run test -- ComponentName.test.tsx`
- Use VS Code Vitest extension for debugging
