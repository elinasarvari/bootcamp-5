---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
---

# Commit and Push Changes

You will analyze the current changes, generate a conventional commit message, and push to a feature branch.

## Input Variables

- **branch-name** (REQUIRED): The feature branch name to commit and push to (e.g., "feature/add-delete", "fix/toggle-bug")

## Workflow

### 1. Validate Branch Name

If `${input:branch-name}` is not provided, **STOP** and ask the user:

```
⚠️  Branch name is required.

Please provide a feature branch name following the pattern:
- feature/<descriptive-name> (for new features)
- fix/<descriptive-name> (for bug fixes)
- chore/<descriptive-name> (for maintenance)

Example: feature/add-delete-button
```

### 2. Analyze Changes

```bash
# View all changes
git status

# View detailed diff
git diff

# View staged changes (if any)
git diff --staged
```

Analyze:
- Which files were modified
- What functionality was added/changed/fixed
- Which features or bugs are addressed

### 3. Generate Conventional Commit Message

Use the **Conventional Commits** format from project guidelines:

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Test additions or modifications
- `refactor:` - Code restructuring without behavior change
- `chore:` - Maintenance tasks (dependencies, config)
- `docs:` - Documentation changes
- `style:` - Code style/formatting changes

**Guidelines**:
- Use imperative mood ("add" not "added" or "adds")
- Keep description concise but descriptive
- No period at the end
- Lowercase after the colon

**Examples**:
- `feat: add delete button to todo items`
- `fix: toggle endpoint now properly toggles completed state`
- `test: add tests for POST /api/todos endpoint`
- `refactor: extract validation logic into separate function`
- `chore: fix ESLint errors in app.js`

Based on the changes, generate an appropriate commit message.

### 4. Branch Operations

```bash
# Check if branch exists
git branch --list ${input:branch-name}

# If branch doesn't exist, create it
git checkout -b ${input:branch-name}

# If branch exists, switch to it
git checkout ${input:branch-name}
```

**CRITICAL**: Never commit to `main` or any branch other than the user-provided branch name.

### 5. Stage Changes

```bash
# Stage all changes
git add .

# Verify what's staged
git status
```

### 6. Commit with Generated Message

```bash
# Commit with the generated conventional commit message
git commit -m "<generated-message>"
```

Show the commit message to the user before committing.

### 7. Push to Remote Branch

```bash
# Push to the specified branch
git push origin ${input:branch-name}
```

If this is the first push to the branch:
```bash
# Set upstream and push
git push -u origin ${input:branch-name}
```

### 8. Confirm Success

After successful push, inform the user:

```
✅ Changes committed and pushed successfully!

Branch: ${input:branch-name}
Commit: <generated-commit-message>
Files changed: <number> files

Next Steps:
- Continue working on this branch, or
- Create a pull request to merge to main, or
- Run /execute-step to work on the next step
```

## Safety Checks

Before committing:

1. **Verify tests pass**:
   ```bash
   npm test
   ```
   Warn if tests fail (but don't block commit if user wants to commit WIP)

2. **Check for lint errors** (informational):
   ```bash
   npm run lint
   ```
   Note: Lint errors don't block commits, but inform user

3. **Verify not on main**:
   ```bash
   git branch --show-current
   ```
   If on `main`, STOP and error:
   ```
   ❌ Cannot commit directly to main branch!
   
   Please provide a feature branch name like:
   - feature/my-feature
   - fix/bug-fix
   ```

## Error Handling

### If branch-name not provided:
Ask user for branch name with examples.

### If on main branch:
Stop and require feature branch name.

### If nothing to commit:
```bash
git status
```
If no changes:
```
ℹ️  No changes to commit.

Working directory is clean.
```

### If commit fails:
Show error and suggest resolution:
- Check for merge conflicts
- Verify git user config
- Check file permissions

### If push fails:
- May need to pull first
- Check remote permissions
- Verify branch name

## Integration with Project

This prompt inherits context from:
- [.github/copilot-instructions.md](../copilot-instructions.md) - Git Workflow section for commit conventions
- [docs/workflow-patterns.md](../../docs/workflow-patterns.md) - Git best practices

## Remember

- **Always use feature branches** - Never commit to main
- **Conventional commits** - Clear, semantic commit messages
- **Branch name required** - No defaults, user must specify
- **Test before commit** - Verify tests pass (with user override)
- **Clear feedback** - Confirm what was committed and pushed

Commit those changes with a clean, descriptive message!
