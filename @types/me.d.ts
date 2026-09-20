export type MeType = {
  user: {
    id: string
  }
  csrfToken: string
}

export type GetMeResponseType = {
  message: string
  data: MeType
}
