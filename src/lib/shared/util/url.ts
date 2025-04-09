export function validUrl(url: string, origin: string | URL) {
  const targetOrigin = typeof origin === 'string' ? origin : origin.origin
  const result = new URL(url, origin)
  return isValidUrlOrigin(result, targetOrigin) ? result : null
}

export function isValidUrlOrigin(url: string | URL, origin: string | URL) {
  const targetOrigin = typeof origin === 'string' ? origin : origin.origin

  const urlToValidate = typeof url === 'string' ? new URL(url, targetOrigin) : url

  return urlToValidate.origin === targetOrigin
}
