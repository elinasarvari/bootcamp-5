# Copilot Instructions for TODO Application

## Project Context

This is a full-stack TODO application with a React frontend and Express backend. The project follows an iterative, feedback-driven development approach.

**Current Phase**: Backend stabilization and frontend feature completion

**Tech Stack**:
- Frontend: React with React Testing Library
- Backend: Express.js with Jest and Supertest
- Monorepo structure under `packages/`

## Documentation References

Consult these documentation files to understand the project architecture and patterns:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles when working on this project:

- **Test-Driven Development**: Follow the Red-Green-Refactor cycle
  - Write failing test FIRST (Red)
  - Implement minimal code to pass (Green)
  - Refactor for quality (Refactor)

- **Incremental Changes**: Make small, testable modifications rather than large sweeping changes

- **Systematic Debugging**: Use test failures as guides to identify and fix issues

- **Validation Before Commit**: Ensure all tests pass and there are no lint errors before committing

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Testing Tools
- **Backend**: Jest + Supertest for API testing
- **Frontend**: React Testing Library for component unit/integration tests
- **Manual Testing**: Browser testing for full UI verification

### Important Constraints
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: Keep the lab focused on unit/integration tests without e2e complexity

### Testing Approach by Context

**Backend API Changes**:
- Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)
- Use Supertest for API endpoint testing
- Test both success and error scenarios

**Frontend Component Features**:
- Write React Testing Library tests FIRST for component behavior
- Implement to pass the tests (RED-GREEN-REFACTOR)
- Follow with manual browser testing for full UI flows

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these established workflows for different types of tasks:

### 1. TDD Workflow
1. Write or fix tests
2. Run tests
3. Observe failure (Red)
4. Implement minimal code
5. Run tests until passing (Green)
6. Refactor for quality
7. Verify tests still pass

### 2. Code Quality Workflow
1. Run lint
2. Categorize issues by type
3. Fix systematically (group similar issues)
4. Re-validate after fixes
5. Commit when clean

### 3. Integration Workflow
1. Identify the issue
2. Debug to understand root cause
3. Write/update tests
4. Implement fix
5. Verify end-to-end functionality

## Chat Mode Usage

Use specialized chat modes for specific workflows:

- **tdd-developer**: Use for test-related work and Red-Green-Refactor cycles
  - Writing new tests
  - Fixing failing tests
  - Implementing features with TDD approach

- **code-reviewer**: Use for addressing lint errors and code quality improvements
  - Fixing ESLint warnings
  - Code cleanup and refactoring
  - Style consistency improvements

## Memory System

This project uses a working memory system to track development discoveries and patterns:

- **Persistent Memory**: This file (`.github/copilot-instructions.md`) contains foundational principles and workflows that rarely change
- **Working Memory**: `.github/memory/` directory contains session-specific discoveries and accumulated patterns
- **Active Session Notes**: During development, take notes in `.github/memory/scratch/working-notes.md` (not committed to git)
- **Historical Record**: At end of session, summarize key findings into `.github/memory/session-notes.md` (committed)
- **Pattern Library**: Document recurring code patterns in `.github/memory/patterns-discovered.md` (committed)

### When to Use Memory Files

- **During TDD**: Document test patterns, unexpected behaviors, and debugging steps in working notes
- **During Linting**: Track ESLint fixes and code quality decisions
- **During Implementation**: Record architectural decisions and integration challenges
- **At Session End**: Transfer key learnings from scratch notes to historical records

### How AI Uses Memory

When providing suggestions, Copilot can reference these memory files to:
- Apply established project patterns consistently
- Avoid suggesting approaches that didn't work previously
- Build on decisions documented in earlier sessions
- Provide context-aware recommendations based on project history

See [.github/memory/README.md](.github/memory/README.md) for detailed usage instructions.

## Workflow Utilities

GitHub CLI commands are available for workflow automation:

### Issue Management Commands
```bash
# List all open issues
gh issue list --state open

# View specific issue details
gh issue view <issue-number>

# View issue with all comments
gh issue view <issue-number> --comments
```

### Exercise Workflow
- The main exercise issue will have "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

Follow these conventions for version control:

### Conventional Commits
Use semantic commit prefixes:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code restructuring without behavior change

Example: `feat: add delete button to todo items`

### Branch Strategy
- Feature branches: `feature/<descriptive-name>`
- Bug fixes: `fix/<descriptive-name>`
- Always work in branches, not directly on main

### Commit Workflow
1. Stage all changes: `git add .`
2. Commit with conventional format: `git commit -m "feat: description"`
3. Push to correct branch: `git push origin <branch-name>`

### Best Practices
- Keep commits focused and atomic
- Write clear, descriptive commit messages
- Push regularly to backup work
- Ensure tests pass before pushing
