export const getTokenFromHeaders = (str?: string): null | string => {
  if (!str) {
    return null
  }

  const keyValue = str.split(';')

  let token: null | string = null

  keyValue.forEach(el => {
    const [key, value] = el.trim().split('=')

    if (key === 'accessToken') {
      token = value
    }
  })

  return token
}
