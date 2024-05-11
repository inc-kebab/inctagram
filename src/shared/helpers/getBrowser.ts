export function getBrowser(userAgent: string) {
  const browserRegex = /(Chrome|Firefox|Safari|Opera|Internet Explorer)\/?\s*(\d+(\.\d+)*)/
  const matches = userAgent.match(browserRegex)

  if (matches && matches.length >= 3) {
    const browserName = matches[1]
    const browserVersion = matches[2]

    return browserName + ' ' + browserVersion
  }

  return 'Unknown'
}
