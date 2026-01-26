# Patterns Discovered

## Purpose

This file documents reusable code patterns, architectural decisions, and best practices discovered during development. Each pattern includes context, problem description, solution, and examples to ensure consistency across the codebase.

## Pattern Template

Use this template when documenting a new pattern:

```markdown
### Pattern Name

**Context**: When and where this pattern applies

**Problem**: What problem does this pattern solve?

**Solution**: How to implement the pattern

**Example**:
```javascript
// Code example demonstrating the pattern
```

**Related Files**: 
- [file.js](../../packages/.../file.js) - Where this pattern is used

**Date Discovered**: [Date]

**Notes**: Any additional considerations or gotchas
```

---

## Documented Patterns

### Service Initialization - Array vs Null

**Context**: Initializing data structures in backend services (Express.js)

**Problem**: When initializing an in-memory data store (like `todos`), should it be set to `null` or an empty array `[]`?

**Solution**: Always initialize arrays as empty arrays (`[]`), never as `null`.

**Reasoning**:
- Array methods (`.push()`, `.filter()`, `.find()`, etc.) fail on `null` with TypeError
- Empty arrays are safe to iterate over immediately
- Avoids null checks throughout the codebase
- Follows the "fail-safe defaults" principle

**Example**:
```javascript
// ❌ WRONG - Causes TypeError when calling array methods
let todos = null;

// ✅ CORRECT - Safe to use array methods immediately  
let todos = [];
```

**Anti-pattern to Avoid**:
```javascript
// Don't do this - requires null checks everywhere
let todos = null;

app.get('/api/todos', (req, res) => {
  if (todos === null) {
    return res.json([]);
  }
  res.json(todos);
});
```

**Correct Pattern**:
```javascript
// Initialize as empty array - no null checks needed
let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos); // Always works
});
```

**Related Files**:
- [packages/backend/src/app.js](../../packages/backend/src/app.js#L8) - Todos array initialization

**Date Discovered**: January 21, 2026

**Notes**: This applies to any collection-type data structure. Other languages have similar patterns (e.g., `List<T>` in C#, `Vec<T>` in Rust should be initialized, not null).

---

### Code Quality Workflow Separation

**Context**: When fixing code issues in iterative development workflows

**Problem**: Should you fix tests and lint errors at the same time, or separate them?

**Solution**: Separate test fixes (TDD) from lint fixes (Code Quality) into distinct workflow stages.

**Reasoning**:
- Clear separation of concerns - functional vs. stylistic issues
- Easier debugging - know whether failure is behavioral or quality-related
- Teaches proper workflow discipline
- Prevents mixing unrelated changes in commits
- Test-first approach remains pure (not distracted by lint)

**Workflow Pattern**:
```
Stage 1 (TDD):
- Run tests → Identify failures
- Fix code to pass tests
- Verify tests pass
- DO NOT fix lint errors yet

Stage 2 (Code Quality):
- Run lint → Identify issues
- Fix lint errors systematically
- Verify tests still pass
- Clean codebase ready for commit
```

**Example Decision Points**:
```javascript
// During TDD (Stage 1):
const unusedDebugFlag = true;  // ❌ Lint error - but DON'T fix yet
console.log('Debug info');      // ❌ Lint warning - but DON'T fix yet

// Focus: Make tests pass first

// During Code Quality (Stage 2):
// NOW fix the lint issues:
// - Remove unusedDebugFlag
// - Remove or replace console.log
```

**Related Files**:
- Step 5-1 focused on TDD (tests only)
- Step 5-2 focused on Code Quality (lint only)

**Date Discovered**: January 26, 2026

**Notes**: 
- This pattern applies to any iterative development workflow
- In real projects, you might use git hooks to enforce lint before commit
- But during learning/debugging, separation helps understand root causes

---

### Systematic Lint Error Resolution

**Context**: Addressing multiple ESLint errors across a codebase

**Problem**: When faced with many lint errors, what's the best approach?

**Solution**: Categorize and fix similar issues together in batches.

**Reasoning**:
- More efficient than fixing randomly
- Easier to verify patterns are consistent
- Reduces mental context switching
- Makes git history cleaner (one commit per category)

**Workflow Pattern**:
```
1. Run lint → Get full error list
2. Categorize by type:
   - Unused variables (no-unused-vars)
   - Console statements (no-console)
   - Missing dependencies (react-hooks/exhaustive-deps)
   - Style issues (quotes, semi, etc.)
3. Fix one category at a time
4. Run tests after each category
5. Re-run lint to verify
6. Move to next category
```

**Example Categorization**:
```javascript
// Category 1: Unused Variables
const unusedDebugFlag = true;  // Remove entirely
const unusedHelper = () => {}; // Remove entirely

// Category 2: Console Statements  
console.log('Debug');          // Remove or use logger
console.error('Error');        // Keep (errors are acceptable)

// Category 3: Missing Error Handling
fetch(url)                     // Add .catch()
  .then(data => setData(data));
```

**Anti-pattern to Avoid**:
```
// Don't fix randomly:
- Fix one unused var
- Fix one console
- Fix another unused var  
- This creates confusion and inefficiency
```

**Related Files**:
- [packages/backend/src/app.js](../../packages/backend/src/app.js) - Backend lint fixes
- [packages/frontend/src/App.js](../../packages/frontend/src/App.js) - Frontend lint fixes

**Date Discovered**: January 26, 2026

**Notes**:
- Always run tests after each batch to catch regressions
- Some lint rules are more important than others (errors vs warnings)
- Consider using `eslint --fix` for auto-fixable issues first

---

<!-- Add new patterns above this line -->

## Pattern Categories

As patterns accumulate, organize them by category:

### Data Structure Initialization
- Service Initialization - Array vs Null ✅

### Workflow Patterns
- Code Quality Workflow Separation ✅
- Systematic Lint Error Resolution ✅

### API Endpoint Patterns
- (Patterns will be added as discovered)

### State Management
- (Patterns will be added as discovered)

### Error Handling
- (Patterns will be added as discovered)

### Testing Patterns
- (Patterns will be added as discovered)

### React Component Patterns
- (Patterns will be added as discovered)

---

## Guidelines for Adding Patterns

1. **Generalize**: Extract the pattern from specific code, but keep concrete examples
2. **Explain Why**: Document reasoning, not just the "how"
3. **Show Both**: Include correct pattern AND anti-pattern when helpful
4. **Link to Code**: Reference actual implementation in the codebase
5. **Keep It Actionable**: Someone should be able to apply the pattern immediately
