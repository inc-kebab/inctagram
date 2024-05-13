export const extractIPAddress = (str: string) => {
  const match = str.match(/(?::ffff:)?(\d+\.\d+\.\d+\.\d+)/)

  return match ? match[1] : null
}
