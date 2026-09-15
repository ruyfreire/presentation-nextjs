type SignInPayloadType = {
  email: string
  password: string
}

type SignInResponseType = {
  message: string
  data: {
    csrfToken: string
  }
}

export type { SignInPayloadType, SignInResponseType }
