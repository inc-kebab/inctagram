/*
 * Будь аккуратен, сюда нужно передавать ТОЛЬКО валидную строку user agent
 */

import { UAParser } from 'ua-parser-js'

const isPostmanRuntime = (ua: string) => {
  return ua.startsWith('Postman')
}

export const getDeviceInfo = (ua: string) => {
  if (isPostmanRuntime(ua)) {
    const data = ua.split('/')

    return {
      name: `${data[0]} ${data[1]}`,
      type: 'pc',
    }
  }

  const parser = new UAParser(ua)

  const { getBrowser, getDevice, getOS } = parser

  const browser = getBrowser()
  const os = getOS()

  const deviceName = `${browser.name}, ${os.name} ${os.version}`

  const deviceType = getDevice().type || 'pc'

  return { name: deviceName, type: deviceType }
}
