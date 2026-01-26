---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
---

# Validate Step Completion

You will validate that all success criteria for a specific step are met by checking the workspace state against the requirements defined in the GitHub Issue.

## Input Variables

- **step-number** (REQUIRED): The step identifier (e.g., "5-0", "5-1", "5-2")

## Workflow

### 1. Validate Input

If `${input:step-number}` is not provided, **STOP** and ask:

```
⚠️  Step number is required.

Please provide the step number you want to validate.
Format: "X-Y" (e.g., "5-0", "5-1", "5-2")

To find available steps, run:
gh issue view <issue-number> --comments
```

### 2. Find the Exercise Issue

```bash
# Find the issue with "Exercise:" in the title
gh issue list --state open --search "Exercise:" --json number,title
```

Extract the issue number from the results.

### 3. Get Issue Content with Comments

```bash
# Get the full issue with all comments
gh issue view <issue-number> --comments
```

### 4. Parse Success Criteria for Specified Step

Search through the issue and comments to find:

```markdown
# Step ${input:step-number}: [Step Title]

...

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Extract all criteria for the specified step.

### 5. Validate Each Criterion

For each criterion, check the workspace state:

#### Common Validation Patterns

**Test-Related Criteria**:
```bash
# Run tests
npm test

# Check specific test file
npm test -- app.test.js

# Count passing tests
npm test -- --verbose
```

Verify:
- Are all tests passing?
- Are specific tests passing?
- Test output matches expectations?

**Lint-Related Criteria**:
```bash
# Run linter
npm run lint

# Check specific file
npm run lint -- src/app.js
```

Verify:
- No ESLint errors?
- No ESLint warnings?
- Specific files are clean?

**Feature-Related Criteria**:
```bash
# Start the application
npm start
```

Verify (from code):
- Is the endpoint implemented?
- Does the component exist?
- Is the functionality present?

**File/Code Criteria**:
Use `codebase` and `search` tools to verify:
- Does file exist?
- Does function exist?
- Is pattern implemented?
- Is variable initialized correctly?

**Error Criteria**:
Check Problems panel or run:
```bash
npm run lint
npm test
```

Verify:
- No compilation errors?
- No type errors?
- No runtime errors?

### 6. Generate Validation Report

Create a detailed report:

```markdown
# Validation Report: Step ${input:step-number}

## Success Criteria Status

### ✅ Passing Criteria

- [Criterion that's met]
  - Verified: [How it was verified]
  - Status: Complete

### ⚠️ Incomplete Criteria

- [Criterion not met]
  - Expected: [What should be true]
  - Actual: [Current state]
  - Action Needed: [Specific steps to complete]

### ❌ Failed Criteria

- [Criterion that failed]
  - Issue: [What's wrong]
  - Error: [Error message if applicable]
  - Fix Required: [Specific fix needed]

## Overall Status

**Step Completion**: [X/Y] criteria met ([percentage]%)

**Recommendation**:
[If 100%]: ✅ All criteria met! Ready to commit and push.
[If < 100%]: ⚠️  Complete remaining criteria before moving forward.

## Next Steps

[If complete]:
1. Run `/commit-and-push branch-name:<your-branch>` to save your work
2. Move to the next step with `/execute-step`

[If incomplete]:
1. Address the incomplete/failed criteria above
2. Run `/validate-step step-number:${input:step-number}` again to verify
3. Once all criteria pass, run `/commit-and-push`
```

### 7. Provide Specific Guidance

For any incomplete criteria, provide:

1. **What to check**: Specific files, tests, or features
2. **How to verify**: Commands to run
3. **What to fix**: Concrete next steps
4. **Where to look**: File paths and line numbers if applicable

## Validation Examples

### Example: Test Criteria

**Criterion**: "All backend tests pass"

**Validation**:
```bash
npm test -- packages/backend/__tests__/app.test.js
```

**Report**:
```
✅ All backend tests pass (12/12 tests passing)
```

or

```
❌ Backend tests failing (8/12 tests passing)

Failed tests:
- "should create a new todo with valid title"
  Error: Expected status 201, received 501
  Fix: Implement POST /api/todos endpoint
  File: packages/backend/src/app.js
```

### Example: Lint Criteria

**Criterion**: "No ESLint errors in backend"

**Validation**:
```bash
npm run lint -- packages/backend/src/app.js
```

**Report**:
```
✅ No ESLint errors in backend
```

or

```
⚠️  ESLint errors found (3 errors, 2 warnings)

Errors:
- Line 8: 'unusedVar' is assigned but never used
- Line 15: Unexpected console statement
- Line 24: 'React' is defined but never used

Action: Run `/code-reviewer` mode to fix linting issues
```

### Example: Feature Criteria

**Criterion**: "DELETE endpoint implemented"

**Validation**:
Check code for:
```javascript
app.delete('/api/todos/:id', ...)
```

**Report**:
```
✅ DELETE endpoint implemented
Located: packages/backend/src/app.js:75
```

or

```
❌ DELETE endpoint not found

Expected: app.delete('/api/todos/:id', ...) in packages/backend/src/app.js
Actual: Endpoint returns 501 "Not implemented"
Fix: Implement DELETE handler following the test requirements
```

## Integration with Project

This prompt inherits context from:
- [.github/copilot-instructions.md](../copilot-instructions.md) - Workflow Utilities for gh CLI
- [docs/testing-guidelines.md](../../docs/testing-guidelines.md) - Test validation patterns
- [docs/workflow-patterns.md](../../docs/workflow-patterns.md) - Quality workflows

## Remember

- **Step number required** - No default, user must specify
- **Be specific** - Point to exact files and lines when possible
- **Actionable feedback** - Tell user exactly what to do next
- **Run commands** - Actually verify, don't just check code
- **Complete report** - Show both what works and what doesn't
- **Next steps** - Always guide toward completion

Validate that step systematically and provide clear, actionable feedback!
