export const setSessionToken = (key: string, value: string) => {
  if (typeof window === 'undefined') return undefined
  sessionStorage.setItem(key, value)
}

export const getSessionToken = (key: string) => {
  if (typeof window === 'undefined') return undefined
  return sessionStorage.getItem(key)
}

export const removeSessionToken = (key: string) => {
  if (typeof window === 'undefined') return undefined
  sessionStorage.removeItem(key)
}
