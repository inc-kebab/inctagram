/** Args for arguments hook, Response for server type response
 * Example:
 * type LoginResponse = {
 *   accessToken: string
 * }
 *
 * type LoginArgs = {
 *   email: string
 *   password: string
 * }
 * */

export type MeResponse = {
  email: string
  id: number
}

export type RecoveryPassword = {
  email: string
  recaptcha: string
}

export type NewPassword = {
  newPassword: string
  recoveryCode: string
}

export type ResponseError = {
  errorDescription: {
    field: string
    message: string
  }[]
  message: string
  statusCode: number
  timestamp: string
}
