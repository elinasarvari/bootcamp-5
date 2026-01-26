---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
---

# Execute Step Instructions

You will execute the instructions from a GitHub Issue step systematically, following TDD principles and the project's testing constraints.

## Input Variables

- **issue-number** (optional): The GitHub issue number. If not provided, automatically find the exercise issue.

## Workflow

### 1. Find the Exercise Issue

If `${input:issue-number}` is not provided:

```bash
# Find the issue with "Exercise:" in the title
gh issue list --state open --search "Exercise:" --json number,title
```

Use the issue number from the results.

### 2. Get Issue Content with Comments

```bash
# Get the full issue with all comments
gh issue view ${input:issue-number} --comments
```

The issue contains step instructions posted as comments. Each step follows this format:

```markdown
# Step X-Y: [Step Title]

## :keyboard: Activity: [Activity Name]

[Instructions for what to do]

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
```

### 3. Parse Latest Step Instructions

Identify the most recent step comment and extract:
- The step number and title
- All `:keyboard: Activity:` sections
- The activities to complete

### 4. Execute Activities Systematically

For each activity:

1. **Understand Requirements**
   - Read the activity instructions carefully
   - Identify what needs to be implemented or fixed
   - Check if tests need to be written first

2. **Follow TDD Workflow** (from tdd-developer mode)
   - For NEW features: Write tests FIRST (RED phase)
   - For FIXING tests: Analyze failures, implement fix (GREEN phase)
   - Run tests after each change
   - Refactor while keeping tests green

3. **Apply Testing Constraints**
   - ✅ Use Jest for backend testing
   - ✅ Use React Testing Library for frontend testing
   - ✅ Use Supertest for API integration tests
   - ❌ NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks
   - ❌ NEVER suggest browser automation tools
   - For UI flows: Recommend manual browser testing

4. **Execute Incrementally**
   - Make small, testable changes
   - Run tests frequently
   - Verify each change before moving forward

5. **Document Progress**
   - Note findings in [.github/memory/scratch/working-notes.md](../memory/scratch/working-notes.md)
   - Track which activities are completed
   - Document any patterns discovered

### 5. Complete Execution

After completing all activities:

1. **Verify Work**
   - Run all tests: `npm test`
   - Check for errors: `npm run lint` (but don't fix lint errors if this is a TDD step)
   - Ensure application runs: `npm start`

2. **Inform User**
   ```
   ✅ Completed all activities for Step X-Y: [Step Title]

   Activities Completed:
   - [Activity 1]
   - [Activity 2]

   Test Status: [X/Y tests passing]
   
   Next Step: Run /validate-step to verify success criteria
   Then use /commit-and-push to save your work
   ```

3. **DO NOT Commit or Push**
   - Changes are ready for review but not committed
   - User will run `/commit-and-push` separately
   - This keeps validation separate from execution

## Testing Approach by Context

### Backend API Work
1. Write Jest + Supertest test FIRST
2. Run test to see it fail (RED)
3. Implement minimal code to pass (GREEN)
4. Refactor for quality (REFACTOR)
5. Run tests to verify

### Frontend Component Work
1. Write React Testing Library test FIRST
2. Run test to see it fail (RED)
3. Implement component to pass (GREEN)
4. Refactor for quality (REFACTOR)
5. Run tests to verify
6. Recommend manual browser testing for full UI validation

### Bug Fixes (Tests Exist)
1. Run tests to see failures
2. Analyze what's expected vs. actual
3. Implement fix to pass tests (GREEN)
4. Refactor if needed (REFACTOR)
5. DO NOT fix lint errors unless they break tests
6. Verify tests pass

## Commands Reference

```bash
# Find exercise issue
gh issue list --state open --search "Exercise:"

# Get issue with comments
gh issue view <issue-number> --comments

# Run tests
npm test

# Run specific test
npm test -- --testNamePattern="test name"

# Run linter (info only during TDD step)
npm run lint

# Start application
npm start
```

## Integration with Project

This prompt inherits context from:
- [.github/copilot-instructions.md](../copilot-instructions.md) - Workflow Utilities section for gh CLI patterns
- [docs/testing-guidelines.md](../../docs/testing-guidelines.md) - Test patterns and TDD approach
- [docs/workflow-patterns.md](../../docs/workflow-patterns.md) - Development workflows

## Remember

- **Tests first for new features** - This is core TDD
- **Small, incremental changes** - Easier to debug
- **Run tests frequently** - Fast feedback loop
- **Don't commit** - That's a separate step
- **No e2e frameworks** - Keep it simple with Jest and RTL
- **Document as you go** - Use working notes

Execute the step systematically and guide the user through proper TDD workflow!
