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

export type LoginParams = {
  email: string
  password: string
}
export type ErrorType = {
  data: {
    errorDescription: null | string
    message: string
    statusCode: number
    timestamp: string
  }
  status: number
}
