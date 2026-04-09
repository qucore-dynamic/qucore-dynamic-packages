// Libs
import { throwError } from '@src/index'

describe('throwError', () => {
  test('should throw an object', () => {
    const rayID = 'test-ray-id'

    expect(() => throwError({ rayID })).toThrow()
  })

  test('should include default values', () => {
    const rayID = 'test-ray-id'

    try {
      throwError({ rayID })
    } catch (err: any) {
      expect(err.status).toBe(500)
      expect(err.code).toBe('INTERNAL_ERROR')
      expect(err.message).toBe('Server crashed. Wait some time')
      expect(err.details.timestamp).toEqual(expect.any(String))
      expect(err.details.rayID).toBe(rayID)
    }
  })

  test('should allow custom values', () => {
    const rayID = 'ray-123'
    const customError = {
      status: 400,
      code: 'BAD_REQUEST',
      message: 'Invalid input',
      rayID,
    }

    try {
      throwError(customError)
    } catch (err: any) {
      expect(err.status).toBe(customError.status)
      expect(err.code).toBe(customError.code)
      expect(err.message).toBe(customError.message)
      expect(err.details.timestamp).toEqual(expect.any(String))
      expect(err.details.rayID).toBe(rayID)
    }
  })

  test('should work with only required rayID', () => {
    const rayID = 'only-ray'

    try {
      throwError({ rayID })
    } catch (err: any) {
      expect(err.details.rayID).toBe(rayID)
      expect(err.status).toBe(500)
    }
  })
})
