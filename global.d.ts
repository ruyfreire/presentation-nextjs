interface Window {
  newrelic?: {
    noticeError: (
      error: Error | string | unknown,
      customAttributes?: Record<string, unknown>,
    ) => void
  }
}
