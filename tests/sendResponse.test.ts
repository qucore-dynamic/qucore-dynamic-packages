// Libs
import { sendResponse } from '@src/index'

describe('sendResponse', () => {
  describe('status handling', () => {
    test('should use default status 200', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, {})

      expect(res.status).toHaveBeenCalledWith(200)

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData).toEqual(
        expect.objectContaining({
          code: expect.any(String),
          message: undefined,
          details: expect.objectContaining({
            timestamp: expect.any(String),
          }),
        }),
      )
    })

    test('should use provided status', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { status: 201 })

      expect(res.status).toHaveBeenCalledWith(201)

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.code).toEqual(expect.any(String))
    })
  })

  describe('response body', () => {
    test('should include code and message', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { message: 'Hello' })

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.message).toBe('Hello')
      expect(jsonData.code).toEqual(expect.any(String))
    })

    test('should include details with data', () => {
      const data = { foo: 'bar' }
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { data })

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.details.data).toEqual(data)
    })

    test('should include timestamp', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, {})

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.details.timestamp).toEqual(expect.any(String))
    })
  })

  describe('default codes', () => {
    test('should use default code based on status', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { status: 200 })

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.code).toEqual(expect.any(String))
    })

    test('should use custom code if provided', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { code: 'CUSTOM_CODE' })

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.code).toBe('CUSTOM_CODE')
    })

    test('should fallback to UNKNOWN if status not in map', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { status: 999 })

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.code).toBe('UNKNOWN')
    })
  })

  describe('headers', () => {
    test('should set headers if provided', () => {
      const headers = { 'X-Test': 'ok' }
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { headers })

      expect(res.setHeader).toHaveBeenCalledWith('X-Test', 'ok')
    })

    test('should not set headers if not provided', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, {})

      expect(res.setHeader).not.toHaveBeenCalled()
    })
  })

  describe('cookies', () => {
    test('should set cookies if provided', () => {
      const cookies = [{ name: 'token', value: '123', options: { httpOnly: true } }]
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { cookies })

      expect(res.cookie).toHaveBeenCalledWith('token', '123', { httpOnly: true })
    })

    test('should use empty options if not provided', () => {
      const cookies = [{ name: 'token', value: '123' }]
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { cookies })

      expect(res.cookie).toHaveBeenCalledWith('token', '123', {})
    })

    test('should not set cookies if not provided', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, {})

      expect(res.cookie).not.toHaveBeenCalled()
    })
  })

  describe('edge cases', () => {
    test('should work without any options', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, undefined as any)

      expect(res.json).toHaveBeenCalled()
    })

    test('should handle empty data', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      sendResponse(res, { data: {} })

      const jsonData = res.json.mock.calls[0][0]

      expect(jsonData.details.data).toEqual({})
    })

    test('should not crash with undefined values', () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
        cookie: jest.fn(),
      }

      expect(() => sendResponse(res, { data: undefined, message: undefined })).not.toThrow()
    })
  })
})
