// Modules
import jwt from 'jsonwebtoken'

// Libs
import { tokensValidator } from '@src/index'

describe('tokensValidator', () => {
  const accessSecret = 'access-secret'
  const refreshSecret = 'refresh-secret'

  const payload = { userId: '123' }

  const validAccessToken = jwt.sign(payload, accessSecret)
  const validRefreshToken = jwt.sign(payload, refreshSecret)

  describe('valid tokens', () => {
    test('should return isValid=true when both tokens are valid', () => {
      const result = tokensValidator(validRefreshToken, validAccessToken, {
        accessSecret,
        refreshSecret,
      })

      expect(result.isValid).toBe(true)
      expect(result.errorName).toBeUndefined()
    })

    test('should decode access token and return it in decodedAccess', () => {
      const result = tokensValidator(validRefreshToken, validAccessToken, {
        accessSecret,
        refreshSecret,
      })

      expect(result.decodedAccess).toMatchObject(payload)
      expect(result.errorName).toBeUndefined()
    })

    test('should decode refresh token and return it in decodedRefresh', () => {
      const result = tokensValidator(validRefreshToken, validAccessToken, {
        accessSecret,
        refreshSecret,
      })

      expect(result.decodedRefresh).toMatchObject(payload)
      expect(result.errorName).toBeUndefined()
    })
  })

  describe('invalid tokens', () => {
    test('should return isValid=false when access token is invalid', () => {
      const result = tokensValidator(validRefreshToken, 'not-valid-access', {
        accessSecret,
        refreshSecret,
      })

      expect(result.isValid).toBe(false)
      expect(result.errorName).toEqual(expect.any(String))
    })

    test('should return isValid=false when refresh token is invalid', () => {
      const result = tokensValidator('not-valid-refresh', validAccessToken, {
        accessSecret,
        refreshSecret,
      })

      expect(result.isValid).toBe(false)
      expect(result.errorName).toEqual(expect.any(String))
    })

    test('should return errorName when jwt.verify throws', () => {
      const result = tokensValidator('not-valid-refresh', 'not-valid-access', {
        accessSecret,
        refreshSecret,
      })

      expect(result.errorName).toEqual(expect.any(String))
    })
  })

  describe('partial validation', () => {
    test('should validate only accessToken if refreshToken is not provided', () => {
      const result = tokensValidator(undefined, validAccessToken, {
        accessSecret,
        refreshSecret,
      })

      expect(result.isValid).toBe(true)
      expect(result.decodedAccess).toMatchObject(payload)
    })

    test('should validate only refreshToken if accessToken is not provided', () => {
      const result = tokensValidator(validRefreshToken, undefined, {
        accessSecret,
        refreshSecret,
      })

      expect(result.isValid).toBe(true)
      expect(result.decodedRefresh).toMatchObject(payload)
    })

    test('should return isValid=true if only one valid token is provided', () => {
      const result = tokensValidator(validRefreshToken, undefined, {
        accessSecret,
        refreshSecret,
      })

      expect(result.isValid).toBe(true)
    })
  })

  describe('missing secrets', () => {
    test('should skip access token validation if accessSecret is not provided', () => {
      const result = tokensValidator(validRefreshToken, validAccessToken, {
        accessSecret: 'not-valid-access-secret',
        refreshSecret,
      })

      expect(result.decodedAccess).toBeUndefined()
    })

    test('should skip refresh token validation if refreshSecret is not provided', () => {
      const result = tokensValidator(validRefreshToken, validAccessToken, {
        accessSecret,
        refreshSecret: 'not-valid-refresh-secret',
      })

      expect(result.decodedRefresh).toBeUndefined()
    })

    test('should not throw if no secrets are provided', () => {
      const result = tokensValidator(validRefreshToken, validAccessToken)

      expect(result.isValid).toBe(true)
    })
  })

  describe('edge cases', () => {
    test('should return isValid=true when no tokens are provided', () => {
      const result = tokensValidator()

      expect(result.isValid).toBe(true)
      expect(result.decodedAccess).toBeUndefined()
      expect(result.decodedRefresh).toBeUndefined()
      expect(result.errorName).toBeUndefined()
    })

    test('should return empty decoded values when nothing is validated', () => {
      const result = tokensValidator(undefined, undefined, {
        accessSecret,
        refreshSecret,
      })

      expect(result.decodedAccess).toBeUndefined()
      expect(result.decodedRefresh).toBeUndefined()
      expect(result.isValid).toBe(true)
      expect(result.errorName).toBeUndefined()
    })

    test('should fail completely if one of the tokens throws error', () => {
      const result = tokensValidator('not-valid-refresh', validAccessToken, {
        accessSecret,
        refreshSecret,
      })

      expect(result.isValid).toBe(false)
      expect(result.errorName).toEqual(expect.any(String))
      expect(result.decodedAccess).toBeUndefined()
      expect(result.decodedRefresh).toBeUndefined()
    })
  })
})
