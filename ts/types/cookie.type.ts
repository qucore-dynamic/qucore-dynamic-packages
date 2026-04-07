// Types
import { CookieOptions as ExpressCookieOptions } from 'express'

export type CookieOptions = {
  name: string
  value: string
  options?: ExpressCookieOptions
}
