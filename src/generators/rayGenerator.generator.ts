// Modules
import crypto from 'crypto'

export default function generateRequestID(): string {
  return crypto.randomBytes(16).toString('hex')
}
