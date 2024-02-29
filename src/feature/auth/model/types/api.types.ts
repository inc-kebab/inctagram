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

export type SignUpArgs = {
  email: string
  password: string
  username: string
}

type Email = {
  email: string
}

export type ConfirmEmailArgs = {
  confirmationCode: string
}

export type ResendArgs = Email

export type SignUpResponse = Email

export type ResponseError = {
  errorDescription: {
    field: string
    message: string
  }[]
  message: string
  statusCode: number
  timestamp: string
}
