export interface ThrowErrorOptions {
  rayID: string
  status?: number
  code?: string
  message?: string
}

export default interface AppError {
  status: number
  code: string
  message: string
  details: {
    timestamp: string
    rayID: string
  }
}
