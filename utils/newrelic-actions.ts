const notifyError = (
  error: Error | string | unknown,
  customAttributes?: Record<string, unknown>,
): void => {
  if (typeof window !== 'undefined' && window.newrelic) {
    window.newrelic.noticeError(error, customAttributes)
  }
}

export { notifyError }
