// Libs
import { generateRequestID } from '@src/index'

describe('generateRequestID', () => {
  const id = generateRequestID()

  test('should return a string', () => {
    expect(typeof id).toBe('string')
  })

  test('should return a 32-character hex string', () => {
    expect(id).toHaveLength(32)
  })

  test('should contain only hexadecimal characters', () => {
    expect(id).toMatch(/^[a-f0-9]+$/)
  })

  test('should generate unique values across multiple calls', () => {
    for (let run = 0; run < 5; run++) {
      const ids = new Set()

      for (let i = 0; i < 500; i++) {
        ids.add(generateRequestID())
      }

      expect(ids.size).toBe(500)
    }
  })
})
