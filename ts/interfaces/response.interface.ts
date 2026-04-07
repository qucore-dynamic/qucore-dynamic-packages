// Types
import { CookieOptions } from '@ts/types/cookie.type.js'

export interface SendResponseOptions<T> {
  status?: number
  code?: string
  message?: string
  data?: T
  cookies?: CookieOptions[]
  headers?: Record<string, string>
}

export default interface AppResponse<T = unknown> {
  code?: string
  message?: string
  details?: {
    data?: T
    timestamp: string
  }
}
