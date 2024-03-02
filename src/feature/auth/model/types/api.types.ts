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

export type ConfirmEmailArgs = {
  confirmationCode: string
}

export type ResendArgs = Pick<SignUpArgs, 'email'>

export type SignUpResponse = Pick<SignUpArgs, 'email'>
