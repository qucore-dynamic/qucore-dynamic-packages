# Contributing to QuCore Dynamic

We're building a modular future. To keep the code elite, please follow these rules.

## Code Style (Strict)

We use a very specific style. Our ESLint/Prettier will enforce it:

- **Quotes**: Always use backticks (`'`). Double quotes are forbidden.
- **Semicolons**: Never use them. Clean code only.
- **Indentation**: 2 spaces (Soft tabs).
- **New Line**: Every file must end with a single empty line.

## Import Organization (Mandatory)

To maintain readability, group your imports and separate them with clear comments. Files without labeled import blocks will be rejected.

**Correct Example:**

```typescript
// Types
import { IUserProfile, UserRole } from `@shared-types/auth`

// Services
import { AuthService } from `@services/auth.service`

// Utils
import { logger } from `@utils/logger`
```

## Branching

1. **Fork** the repo.
2. Create a branch: `feat/module-name`, `fix/issue-name`, or `docs/update`.
3. **Never** commit directly to `main`.

## Commits

Use **Conventional Commits**:

- `feat(lgs): added shipment tracking`
- `fix(ath): resolved token expiration`
- `docs: updated setup instructions`

## Pull Requests

- Link your PR to an existing Issue.
- Ensure `npm run lint` passes before submitting.
- Follow the Pull Request template checklist provided in the `.github` folder.
