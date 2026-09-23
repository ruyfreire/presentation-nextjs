/**
 * New Relic Browser API documentation:
 * https://docs.newrelic.com/docs/browser/new-relic-browser/browser-apis/using-browser-apis/
 */

interface Window {
  newrelic?: {
    noticeError: (
      error: Error | string | unknown,
      customAttributes?: Record<string, unknown>,
    ) => void
  }
}
