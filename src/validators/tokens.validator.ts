// Modules
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

interface ValidatedTokensData {
  decodedRefresh?: string | JwtPayload
  decodedAccess?: string | JwtPayload
  isValid: boolean
  errorName?: string
}

interface TokensValidatorOptions {
  accessSecret?: string
  refreshSecret?: string
}

export default function tokensValidator(
  refreshToken?: string,
  accessToken?: string,
  options?: TokensValidatorOptions,
): ValidatedTokensData {
  try {
    const data: ValidatedTokensData = { isValid: true }

    const refreshSecret = options?.refreshSecret
    const accessSecret = options?.accessSecret

    if (refreshToken && refreshSecret) data.decodedRefresh = jwt.verify(refreshToken, refreshSecret)
    if (accessToken && accessSecret) data.decodedAccess = jwt.verify(accessToken, accessSecret)

    return data
  } catch (err: unknown) {
    return {
      isValid: false,
      errorName: err instanceof Error ? err.name : 'UnknownError',
    }
  }
}
