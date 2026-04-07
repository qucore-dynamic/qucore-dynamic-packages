// Types
import { Response } from 'express'

// Interfaces
import AppResponse, { SendResponseOptions } from '@ts/interfaces/response.interface'

export const defaultCodes: Record<number, string> = {
  200: 'OK',
  201: 'CREATED',
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  500: 'INTERNAL_ERROR',
}

export default function sendResponse<T>(
  res: Response,
  { status = 200, code, message, cookies, headers, data }: SendResponseOptions<T>,
) {
  const response: AppResponse<T> = {
    code: code ?? defaultCodes[status] ?? 'UNKNOWN',
    message,
    details: {
      data,
      timestamp: new Date().toISOString(),
    },
  }

  if (headers) {
    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value))
  }

  if (cookies) {
    cookies.forEach(({ name, value, options }) => res.cookie(name, value, options || {}))
  }

  return res.status(status).json(response)
}
