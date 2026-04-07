// Modules
import crypto from 'crypto'

export default function generateRequestID() {
  return crypto.randomBytes(16).toString('hex')
}
