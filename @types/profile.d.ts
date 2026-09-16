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
  version: number
  profileId: string
  imageUrl: string
  name: string
  role: string
  bio: string | null
  contact: ContactType
  skills: string[] | null
  experiences: ExperienceType[]
  education: EducationType[]
}

type GetProfileParamsType = {
  profileId?: string
}

type GetProfileResponseType = {
  message: string
  data: ProfileType
}

type CreateProfileType = Omit<ProfileType, 'id' | 'version'>

export type {
  ContactType,
  CreateProfileType,
  EducationType,
  ExperienceType,
  GetProfileParamsType,
  GetProfileResponseType,
  ProfileType,
}
