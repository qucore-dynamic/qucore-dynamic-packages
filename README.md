# @qucore-dynamic/packages

Backend utilities for QuCore Dynamic services: **_JWT validation_**, **_request ID_** generation, **_type-safe_** responses, and **_standardized error_** handling.

## Installation

```bash
npm install @qucore-dynamic/packages
# or for GitHub
npm install github:qucore-dynamic/qucore-dynamic-packages#main
```

## Usage

### 1. **Generate unique request IDs**

```typescript
import { generateRequestID } from '@qucore-dynamic/packages'

const requestID = generateRequestID()
console.log('Request ID:', requestID)
```

This is useful for logging and tracing requests across microservices.

---

### 2. **Validate tokens**

```typescript
import { tokensValidator } from '@qucore-dynamic/packages'

const tokens = tokensValidator(process.env.REFRESH_TOKEN, process.env.ACCESS_TOKEN, {
  accessSecret,
  refreshSecret,
})

if (!tokens.isValid) {
  console.log('Invalid token:', tokens.errorName)
}
```

---

### 3. **Send standardized responses**

```typescript
import { Response } from 'express'
import { sendResponse } from '@qucore-dynamic/packages'

sendResponse(res, {
  status: 201,
  message: 'User created successfully',
  data: { userId: 123 },
  cookies: [{ name: 'accessToken', value: '...', options: { httpOnly: true, path: '/' } }],
})
```

**sendResponse** automatically formats your response as:

```json
{
  "code": "CREATED",
  "message": "User created successfully",
  "details": {
    "data": { "userId": 123 },
    "timestamp": "2026-04-06T18:50:39.781Z"
  }
}
```

---

### 4. **Throw standardized errors**

```typescript
import { throwError } from '@qucore-dynamic/packages'

throwError({
  rayID: generateRequestID(),
  status: 403,
  code: 'ALREADY_REGISTERED',
  message: 'User is already registered',
})
```

Throws an object compatible with **sendResponse**/middleware logging.\

Example output:

```json
{
  "status": 403,
  "code": "ALREADY_REGISTERED",
  "message": "User is already registered",
  "details": {
    "timestamp": "2026-04-06T18:50:39.781Z",
    "rayID": "abcd-1234-efgh"
  }
}
```

## License

**GPL-3.0**
