/*
 * Будь аккуратен, сюда нужно передавать ТОЛЬКО валидную строку user agent
 */

import { UAParser } from 'ua-parser-js'

export const getDeviceInfo = (ua: string) => {
  const parser = new UAParser(ua)

  const { getBrowser, getDevice, getOS } = parser

  const browser = getBrowser()
  const os = getOS()

  const deviceName = `${browser.name}, ${os.name} ${os.version}`

  const deviceType = getDevice().type || 'pc'

  return { name: deviceName, type: deviceType }
}
