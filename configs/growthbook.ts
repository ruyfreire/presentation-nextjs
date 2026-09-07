const growthbookApiHost = process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST || ''
const growthbookClientKey = process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || ''

const growthbookEnabled = growthbookApiHost !== '' && growthbookClientKey !== ''

export { growthbookApiHost, growthbookClientKey, growthbookEnabled }
