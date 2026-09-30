import { GetApiStatusResponseType } from '@/@types/api-status'
import { LogoutResponseType } from '@/@types/logout'
import { GetMeResponseType } from '@/@types/me'
import { GetProfileResponseType } from '@/@types/profile'
import { SignInResponseType } from '@/@types/signin'

export const getProfileResponse = (
  override?: Partial<GetProfileResponseType>,
): GetProfileResponseType => {
  return {
    message: 'Profile fetched successfully',
    data: {
      id: 'k2j34bjk234kj23g4kj',
      version: 1,
      profileId: 'default',
      imageUrl: 'https://placehold.co/192',
      name: 'Full name',
      role: 'Role name',
      bio: 'Bio description.',
      contact: {
        location: 'Location',
        linkedin: 'https://linkedin.com/in/full-name',
        github: 'https://github.com/full-name',
      },
      skills: ['Skill 1', 'Skill 2'],
      experiences: [
        {
          id: '6a9dcb4bef68956a8071d2e4',
          company: 'Company name',
          role: 'Company role',
          startDate: '2024-07-22T00:00:00.000Z',
          endDate: '2026-07-16T00:00:00.000Z',
          description: 'Company description.',
          tags: ['Tag 1', 'Tag 2'],
        },
      ],
      education: [
        {
          id: '6a9dcb4bef68956a8071d2e8',
          title: 'Course name',
          institution: 'Institution name',
          degree: 'Course degree',
          startDate: '2024-01-01T00:00:00.000Z',
          endDate: '2024-01-30T00:00:00.000Z',
          certificateUrl: 'https://certificate-url.com',
          description: 'Education description.',
          tags: ['Tag 1', 'Tag 2'],
        },
      ],
    },
    ...override,
  }
}

export const getApiStatusResponse = (
  override?: Partial<GetApiStatusResponseType>,
): GetApiStatusResponseType => {
  return {
    status: true,
    ...override,
  }
}

export const createProfileResponse = (
  override?: Partial<GetProfileResponseType>,
): GetProfileResponseType => {
  return {
    message: 'Profile created successfully',
    data: {
      id: 'k2j34bjk234kj23g4kj',
      version: 2,
      profileId: 'default',
      imageUrl: 'https://placehold.co/192',
      name: 'Full name',
      role: 'Role name',
      bio: 'Bio description.',
      contact: {
        location: 'Location',
        linkedin: 'https://linkedin.com/in/full-name',
        github: 'https://github.com/full-name',
      },
      skills: ['Skill 1', 'Skill 2'],
      experiences: [
        {
          id: '6a9dcb4bef68956a8071d2e4',
          company: 'Company name',
          role: 'Company role',
          startDate: '2024-07-22T00:00:00.000Z',
          endDate: '2026-07-16T00:00:00.000Z',
          description: 'Company description.',
          tags: ['Tag 1', 'Tag 2'],
        },
      ],
      education: [
        {
          id: '6a9dcb4bef68956a8071d2e8',
          title: 'Course name',
          institution: 'Institution name',
          degree: 'Course degree',
          startDate: '2024-01-01T00:00:00.000Z',
          endDate: '2024-01-30T00:00:00.000Z',
          certificateUrl: 'https://certificate-url.com',
          description: 'Education description.',
          tags: ['Tag 1', 'Tag 2'],
        },
      ],
    },
    ...override,
  }
}

export const signInResponse = (
  override?: Partial<SignInResponseType>,
): SignInResponseType => {
  return {
    message: 'Signed in successfully',
    data: {
      csrfToken: '1234567890',
    },
    ...override,
  }
}

export const signOutResponse = (
  override?: Partial<LogoutResponseType>,
): LogoutResponseType => {
  return {
    message: 'Signed out successfully',
    ...override,
  }
}

export const getMeResponse = (
  override?: Partial<GetMeResponseType>,
): GetMeResponseType => {
  return {
    message: 'Authenticated',
    data: {
      user: {
        id: '507f1f77bcf86cd799439011',
      },
      csrfToken: '1234567890',
    },
    ...override,
  }
}
