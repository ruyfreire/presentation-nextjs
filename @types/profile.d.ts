type ContactType = {
  location: string
  linkedin: string
  github: string
}

type ExperienceType = {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  description: string | null
  tags: string[] | null
}

type EducationType = {
  id: string
  title: string
  institution: string
  degree: string | null
  startDate: string
  endDate: string | null
  certificateUrl: string | null
  description: string | null
  tags: string[] | null
}

type ProfileType = {
  id: string
  profileId: string
  imageUrl: string
  name: string
  role: string
  bio: string | null
  contact: ContactType
  skills: string[] | null
  experiences: ExperienceType[]
  education: EducationType[]
  createdAt: string
  updatedAt: string
}

type GetProfileParamsType = {
  profileId?: string
}

type GetProfileResponseType = {
  message: string
  data: ProfileType
}

type CreateProfileType = Omit<
  ProfileType,
  'id' | 'profileId' | 'createdAt' | 'updatedAt'
>

export type {
  ContactType,
  CreateProfileType,
  EducationType,
  ExperienceType,
  GetProfileParamsType,
  GetProfileResponseType,
  ProfileType,
}
