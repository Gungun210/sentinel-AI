# Contributing to Sentinel AI

Thank you for your interest in contributing to Sentinel AI! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL
- Docker (optional)

### Setup

1. **Fork the repository**
2. **Clone your fork:**
```bash
git clone https://github.com/your-username/sentinel-ai.git
cd sentinel-ai
```

3. **Install frontend dependencies:**
```bash
npm install
```

4. **Install backend dependencies:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

5. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

6. **Run database migrations:**
```bash
npx prisma migrate dev
```

7. **Start the development servers:**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
uvicorn main:app --reload
```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Critical production fixes

### Creating a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Make your changes**
2. **Write tests for new functionality**
3. **Ensure all tests pass**
4. **Update documentation if needed**
5. **Commit with clear messages**

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat(dashboard): add real-time metrics graph

- Implemented WebSocket connection for live data
- Added animated graph component
- Updated documentation

Closes #123
```

### Pull Request Process

1. **Update your branch:**
```bash
git fetch origin
git rebase origin/develop
```

2. **Push to your fork:**
```bash
git push origin feature/your-feature-name
```

3. **Create Pull Request:**
   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Request review

### PR Review Guidelines

- **Title:** Clear and descriptive
- **Description:** Explain what and why
- **Testing:** Describe how you tested
- **Screenshots:** Include for UI changes
- **Breaking Changes:** Highlight if any

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### Python

- Follow PEP 8 style guide
- Use type hints where possible
- Add docstrings to functions
- Keep functions under 50 lines
- Use meaningful variable names

### CSS/Tailwind

- Use Tailwind utility classes
- Avoid custom CSS when possible
- Use responsive design patterns
- Follow mobile-first approach
- Ensure dark mode compatibility

## Testing

### Frontend Tests

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- Dashboard.test.tsx
```

### Backend Tests

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test
pytest tests/test_main.py
```

### Writing Tests

- Write unit tests for pure functions
- Write integration tests for components
- Test edge cases and error conditions
- Mock external dependencies
- Keep tests fast and isolated

## Project Structure

```
sentinel-ai/
├── backend/              # FastAPI backend
│   ├── main.py          # Main application
│   ├── agents.py        # AI agents
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile       # Backend container
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma schema
├── src/                 # Next.js frontend
│   ├── app/            # App router
│   ├── components/     # React components
│   ├── lib/            # Utilities
│   └── types/          # TypeScript types
├── public/             # Static assets
├── docker-compose.yml  # Docker orchestration
└── package.json        # Node dependencies
```

## Adding New Features

1. **Discuss first:** Open an issue to discuss
2. **Plan the implementation:** Create a design doc
3. **Implement the feature:** Write code following standards
4. **Add tests:** Ensure test coverage
5. **Update documentation:** Keep docs in sync
6. **Submit PR:** Follow PR process

## Reporting Bugs

### Bug Report Template

```markdown
**Description**
A clear description of the bug

**To Reproduce**
Steps to reproduce the behavior

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional Context**
Any other relevant information
```

## Suggesting Enhancements

### Feature Request Template

```markdown
**Problem**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives**
What alternatives have you considered?

**Additional Context**
Any other relevant information
```

## Documentation

### Updating Documentation

- Keep README.md up to date
- Update API documentation
- Add comments to complex code
- Document new features
- Update deployment guide if needed

### Documentation Style

- Use clear, concise language
- Include code examples
- Add diagrams where helpful
- Keep it organized
- Use consistent formatting

## Performance Guidelines

### Frontend

- Use React.memo for expensive components
- Implement virtualization for long lists
- Lazy load images and components
- Optimize bundle size
- Use caching strategies

### Backend

- Use database indexes
- Implement connection pooling
- Cache frequently accessed data
- Use async operations
- Optimize queries

## Security Guidelines

- Never commit secrets
- Validate all inputs
- Use parameterized queries
- Implement rate limiting
- Keep dependencies updated
- Follow OWASP guidelines

## Release Process

1. **Update version in package.json**
2. **Update CHANGELOG.md**
3. **Create git tag:**
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```
4. **Build and deploy**
5. **Announce release**

## Getting Help

- **Documentation:** Check README.md and docs/
- **Issues:** Search existing issues
- **Discussions:** Use GitHub Discussions
- **Email:** support@sentinel-ai.com

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project website

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue or contact the maintainers.

Thank you for contributing to Sentinel AI! 🚀
