// Interfaces
import AppError, { ThrowErrorOptions } from '@ts/interfaces/error.interface'

export default function throwError({
  rayID,
  status = 500,
  code = 'INTERNAL_ERROR',
  message = 'Server crashed. Wait some time',
}: ThrowErrorOptions): never {
  const error: AppError = {
    status,
    code,
    message,
    details: {
      timestamp: new Date().toISOString(),
      rayID,
    },
  }

  throw error
}
