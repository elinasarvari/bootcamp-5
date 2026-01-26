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

<!-- Add new patterns above this line -->

## Pattern Categories

As patterns accumulate, organize them by category:

### Data Structure Initialization
- Service Initialization - Array vs Null ✅

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
