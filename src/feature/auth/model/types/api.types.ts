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

export interface Email {
  email: string
}

export interface MeResponse {
  email: string
  id: number
}

export interface RecoveryPasswordArgs {
  email: string
  recaptcha: string
}

export interface NewPasswordArgs {
  newPassword: string
  recoveryCode: string
}

export interface LoginArgs {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface SignUpArgs {
  email: string
  password: string
  username: string
}

export interface ConfirmEmailArgs {
  confirmationCode: string
}

export interface CheckRecoveryCodeArgs {
  recoveryCode: string
}

