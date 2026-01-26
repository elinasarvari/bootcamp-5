# Working Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It serves as a knowledge base that helps AI assistants (GitHub Copilot) provide more context-aware suggestions by understanding what you've already discovered and decided.

## Two Types of Memory

### Persistent Memory
**Location**: `.github/copilot-instructions.md`
- Contains foundational principles and workflows
- Project-wide coding standards and conventions
- General development guidelines
- Rarely changes - committed to git

### Working Memory
**Location**: `.github/memory/`
- Contains discoveries made during development
- Session-specific findings and decisions
- Accumulated patterns from hands-on work
- Evolves as you learn - committed to git (except scratch/)

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical summaries of completed sessions (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns and learnings (COMMITTED)
└── scratch/
    ├── .gitignore               # Ignores all scratch files
    └── working-notes.md         # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed to Git)
- **Purpose**: Historical record of completed development sessions
- **Content**: Summaries of what was accomplished, key findings, decisions made
- **When to update**: At the END of each development session
- **Why committed**: Creates a timeline of project evolution for future reference

#### `patterns-discovered.md` (Committed to Git)
- **Purpose**: Reusable code patterns and architectural decisions
- **Content**: Pattern templates with context, problem, solution, examples
- **When to update**: When you discover a repeatable pattern or make an architectural decision
- **Why committed**: Knowledge base for consistent code patterns across the project

#### `scratch/working-notes.md` (NOT Committed)
- **Purpose**: Active brainstorming and session tracking
- **Content**: Current task, approach, findings, blockers, next steps
- **When to update**: Throughout your active development session
- **Why not committed**: Ephemeral working space; key findings get summarized into session-notes.md

## When to Use Each File During Workflows

### During TDD (Test-Driven Development)

**As you work (scratch/working-notes.md)**:
- Document which test you're fixing
- Note why the test was failing
- Record the fix you applied
- Track any unexpected behaviors

**At session end (session-notes.md)**:
- Summarize which tests passed
- Document any test patterns you discovered

**For patterns (patterns-discovered.md)**:
- Document test setup patterns that work well
- Record error handling patterns from test cases

### During Linting and Code Quality Work

**As you work (scratch/working-notes.md)**:
- List ESLint errors encountered
- Note which fixes were applied
- Track any rules that need configuration changes

**At session end (session-notes.md)**:
- Summarize code quality improvements made
- Document any linting rules added or disabled

**For patterns (patterns-discovered.md)**:
- Document common code quality issues and their fixes
- Record project-specific style decisions

### During Debugging

**As you work (scratch/working-notes.md)**:
- Describe the bug symptoms
- List hypotheses tested
- Record debugging steps taken
- Document the root cause when found

**At session end (session-notes.md)**:
- Summarize bugs fixed and their causes
- Note any architectural issues discovered

**For patterns (patterns-discovered.md)**:
- Document common bug patterns and their solutions
- Record debugging techniques that worked well

### During Feature Implementation

**As you work (scratch/working-notes.md)**:
- Break down the feature into steps
- Track progress through each step
- Note blockers and how you resolved them
- Document API decisions

**At session end (session-notes.md)**:
- Summarize feature completion status
- Document integration challenges

**For patterns (patterns-discovered.md)**:
- Document reusable component patterns
- Record API design decisions
- Note state management patterns

## How AI Reads and Applies These Patterns

When you interact with GitHub Copilot:

1. **Context Awareness**: Copilot can read these memory files to understand your project's history and patterns
2. **Consistent Suggestions**: Patterns documented here help Copilot suggest code that matches your established conventions
3. **Avoiding Repeated Mistakes**: Session notes help Copilot avoid suggesting approaches that didn't work
4. **Building on Previous Work**: Copilot can reference previous decisions when suggesting new implementations

### Example Interaction

**Without Memory System**:
```
You: "How should I initialize the users array?"
Copilot: "const users = null" [generic suggestion]
```

**With Memory System** (after documenting the todos array initialization bug):
```
You: "How should I initialize the users array?"
Copilot: "const users = [] // Initialize as empty array, not null.
         // See pattern: Service initialization in patterns-discovered.md"
```

## Workflow: From Active Notes to Historical Record

### During Active Development
1. Open `scratch/working-notes.md`
2. Fill in "Current Task" and "Approach"
3. Add findings and decisions as you work
4. Track blockers and next steps

### At End of Session
1. Review `scratch/working-notes.md`
2. Extract key findings and decisions
3. Create a session summary in `session-notes.md`
4. If you discovered a reusable pattern, document it in `patterns-discovered.md`
5. Clear or archive `scratch/working-notes.md` for next session

### Example Flow

**During Session** (scratch/working-notes.md):
```
## Current Task
Fix POST /api/todos endpoint - test expects 201 but returns 501

## Key Findings
- Endpoint was returning "Not implemented"
- Needed to add todo to array AND generate unique ID
- Must return 201 status, not 200

## Decisions Made
- Use incrementing counter for IDs (simple, predictable)
- Set default completed: false
- Add createdAt timestamp
```

**After Session** (session-notes.md):
```
## Session 1: Implement POST /api/todos - January 21, 2026

### Accomplished
- Fixed POST /api/todos endpoint to create new todos
- Tests now pass for todo creation

### Key Findings
- Endpoint needs to generate unique IDs with counter
- Status code matters: 201 for creation, not 200

### Outcomes
- POST endpoint fully functional
- All creation tests passing
```

**Pattern Discovered** (patterns-discovered.md):
```
### API Endpoint Implementation Pattern

**Context**: Implementing CRUD endpoints in Express

**Problem**: Need consistent pattern for creating resources

**Solution**:
1. Validate input (return 400 if invalid)
2. Generate unique ID
3. Create object with defaults
4. Add to storage
5. Return 201 with created object

**Example**: See POST /api/todos in packages/backend/src/app.js
```

## Best Practices

1. **Be Concise**: Capture key points, not every detail
2. **Focus on Decisions**: Document WHY, not just WHAT
3. **Update Regularly**: Don't let notes get stale
4. **Reference Code**: Link to actual files and line numbers
5. **Extract Patterns**: Generalize from specific examples
6. **Clean Scratch Regularly**: Archive or clear working notes between sessions

## Getting Started

1. Read through the templates in this directory
2. When starting a new development session, open `scratch/working-notes.md`
3. Fill in the template as you work
4. At session end, transfer key learnings to `session-notes.md` and `patterns-discovered.md`
5. Reference these files when asking Copilot for help: "Check patterns-discovered.md for our initialization pattern"

## Benefits

- **Faster Development**: Don't repeat the same debugging process
- **Better AI Assistance**: Copilot learns your project's patterns
- **Knowledge Retention**: Capture lessons before you forget them
- **Team Alignment**: New contributors understand project decisions
- **Historical Context**: See how and why the codebase evolved

---

Remember: This system works best when you use it actively. Take notes as you discover things, not at the end when details are fuzzy!
