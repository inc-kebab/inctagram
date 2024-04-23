import { CookieSerializeOptions } from 'cookie'

export const accessCookieParams: CookieSerializeOptions = {
  maxAge: 30 * 60,
  sameSite: 'none',
  secure: true,
}
