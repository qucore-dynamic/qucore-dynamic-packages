export interface Tokens {
  refreshToken: string
  accessToken: string
}

export interface RefreshToken {
  sessionID: string
  userID: string
  role: string
  version: string
}

export interface AccessToken {
  userID: string
  role: string
  version: string
}
