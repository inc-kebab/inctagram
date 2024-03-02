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

export interface MeResponse {
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

export interface LoginArgs {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export type SignUpArgs = {
  email: string
  password: string
  username: string
}

export type SignUpResponse = Pick<SignUpArgs, 'email'>

export type ConfirmEmailArgs = {
  confirmationCode: string
}

export type ResendArgs = Pick<SignUpArgs, 'email'>