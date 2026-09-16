'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { format, isValid, parseISO } from 'date-fns'
import { Loader2, PlusIcon, Trash2Icon, X, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Control,
  Controller,
  FieldPath,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { CreateProfileType, ProfileType } from '@/@types/profile'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useGetProfile } from '@/services/get-profile'
import { usePostProfile } from '@/services/post-profile'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group'

const required = z.string().min(1, 'Campo obrigatório')

const experienceSchema = z.object({
  id: z.string(),
  company: required,
  role: required,
  startDate: required,
  endDate: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
})

const educationSchema = z.object({
  id: z.string(),
  title: required,
  institution: required,
  degree: z.string(),
  startDate: required,
  endDate: z.string(),
  certificateUrl: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
})

const profileFormSchema = z.object({
  profileId: required,
  imageUrl: required,
  name: required,
  role: required,
  bio: z.string(),
  contact: z.object({
    location: required,
    linkedin: required,
    github: required,
  }),
  skills: z.array(z.string()),
  experiences: z.array(experienceSchema),
  education: z.array(educationSchema),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const emptyExperience = (): ProfileFormValues['experiences'][number] => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  description: '',
  tags: [],
})

const emptyEducation = (): ProfileFormValues['education'][number] => ({
  id: crypto.randomUUID(),
  title: '',
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
  certificateUrl: '',
  description: '',
  tags: [],
})

const emptyFormValues: ProfileFormValues = {
  profileId: '',
  imageUrl: '',
  name: '',
  role: '',
  bio: '',
  contact: {
    location: '',
    linkedin: '',
    github: '',
  },
  skills: [],
  experiences: [],
  education: [],
}

const toDateInputValue = (value: string | null | undefined) => {
  if (!value) return ''

  const parsed = parseISO(value)
  if (isValid(parsed)) {
    return format(parsed, 'yyyy-MM-dd')
  }

  return value.slice(0, 10)
}

const emptyToNull = (value: string) => (value.trim() === '' ? null : value)

const mapProfileToForm = (profile: ProfileType): ProfileFormValues => ({
  profileId: profile.profileId,
  imageUrl: profile.imageUrl,
  name: profile.name,
  role: profile.role,
  bio: profile.bio ?? '',
  contact: profile.contact,
  skills: profile.skills ?? [],
  experiences: profile.experiences.map((experience) => ({
    ...experience,
    startDate: toDateInputValue(experience.startDate),
    endDate: toDateInputValue(experience.endDate),
    description: experience.description ?? '',
    tags: experience.tags ?? [],
  })),
  education: profile.education.map((item) => ({
    ...item,
    startDate: toDateInputValue(item.startDate),
    endDate: toDateInputValue(item.endDate),
    degree: item.degree ?? '',
    certificateUrl: item.certificateUrl ?? '',
    description: item.description ?? '',
    tags: item.tags ?? [],
  })),
})

const mapFormToPayload = (values: ProfileFormValues): CreateProfileType => ({
  profileId: values.profileId,
  imageUrl: values.imageUrl,
  name: values.name,
  role: values.role,
  bio: emptyToNull(values.bio),
  contact: values.contact,
  skills: values.skills.length ? values.skills : null,
  experiences: values.experiences.map((experience) => ({
    ...experience,
    endDate: emptyToNull(experience.endDate),
    description: emptyToNull(experience.description),
    tags: experience.tags.length ? experience.tags : null,
  })),
  education: values.education.map((item) => ({
    ...item,
    degree: emptyToNull(item.degree),
    endDate: emptyToNull(item.endDate),
    certificateUrl: emptyToNull(item.certificateUrl),
    description: emptyToNull(item.description),
    tags: item.tags.length ? item.tags : null,
  })),
})

type StringChipsFieldProps = {
  control: Control<ProfileFormValues>
  name: FieldPath<ProfileFormValues>
  label: string
  placeholder: string
}

function StringChipsField({
  control,
  name,
  label,
  placeholder,
}: StringChipsFieldProps) {
  const [draft, setDraft] = useState('')
  const values = useWatch({ control, name })
  const items =
    Array.isArray(values) && values.every((item) => typeof item === 'string')
      ? values
      : []

  const handleAddItem = (
    value: string,
    callback: (items: string[]) => void,
  ) => {
    const trimmedValue = value.trim()
    if (!trimmedValue) return

    if (items.includes(trimmedValue)) {
      setDraft('')
      return
    }

    callback([...items, trimmedValue])
    setDraft('')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <div className="flex gap-2">
            <InputGroup>
              <InputGroupInput
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={placeholder}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter') return
                  event.preventDefault()
                  handleAddItem(draft, field.onChange)
                }}
              />

              {draft && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Limpar"
                    title="Limpar"
                    size="icon-xs"
                    className="cursor-pointer"
                    onClick={() => {
                      setDraft('')
                    }}
                  >
                    <X />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>

            <Button
              type="button"
              variant="outline"
              disabled={!draft.trim()}
              aria-disabled={!draft.trim()}
              onClick={() => {
                handleAddItem(draft, field.onChange)
              }}
            >
              <PlusIcon />
              Adicionar
            </Button>
          </div>

          {items.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {items.map((item, index) => (
                <Badge key={`${item}-${index}`} variant="secondary">
                  {item}
                  <button
                    type="button"
                    className="ml-1 cursor-pointer"
                    onClick={() =>
                      field.onChange(
                        items.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    aria-label={`Remover ${item}`}
                  >
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

type InputSkeletonProps = {
  height?: string
}

function InputSkeleton({ height }: InputSkeletonProps) {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-5 w-30" />
      <Skeleton className={cn('h-9 w-full', height)} />
    </div>
  )
}

export function ProfileForm() {
  const { data: response, isLoading } = useGetProfile()
  const { mutateAsync, isPending } = usePostProfile()
  const profile = response?.data

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: emptyFormValues,
  })

  const experiences = useFieldArray({
    control: form.control,
    name: 'experiences',
    keyName: 'fieldId',
  })

  const education = useFieldArray({
    control: form.control,
    name: 'education',
    keyName: 'fieldId',
  })

  useEffect(() => {
    if (!profile) return
    form.reset(mapProfileToForm(profile))
  }, [form, profile])

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const data = await mutateAsync(mapFormToPayload(values))
      form.reset(mapProfileToForm(data.data))
      toast.success('Salvo com sucesso')
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        toast.error('Dados inválidos')
        return
      }

      toast.error('Erro ao salvar')
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="ml-auto h-5 w-28 rounded-full" />

        <div className="flex flex-col gap-7">
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton height="h-60" />
        </div>
      </div>
    )
  }

  const { isDirty, isValid } = form.formState

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="flex justify-end">
        <Badge variant="outline">{`Versão: ${profile?.version ?? '?'}`}</Badge>
      </div>

      <FieldGroup>
        <Controller
          name="imageUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>URL da imagem</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Cargo</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                rows={5}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldSet>
        <FieldLegend>Contato</FieldLegend>
        <FieldGroup>
          <Controller
            name="contact.location"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Localização</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="contact.linkedin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>LinkedIn</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="contact.github"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>GitHub</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <StringChipsField
        control={form.control}
        name="skills"
        label="Skills"
        placeholder="Adicionar skill"
      />

      <FieldSet>
        <div className="mb-3 flex items-center justify-between gap-2">
          <FieldLegend className="mb-0">Experiências</FieldLegend>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.fields.map((item, index) => (
            <Card key={item.fieldId} size="sm">
              <CardHeader>
                <CardTitle>Experiência {index + 1}</CardTitle>

                <CardAction>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => experiences.remove(index)}
                    aria-label="Remover experiência"
                  >
                    <Trash2Icon />
                  </Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <FieldGroup>
                  <Controller
                    name={`experiences.${index}.company`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Empresa</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`experiences.${index}.role`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Cargo</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <Controller
                      name={`experiences.${index}.startDate`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Início</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="date"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={`experiences.${index}.endDate`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Fim</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="date"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name={`experiences.${index}.description`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          rows={4}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <StringChipsField
                    control={form.control}
                    name={`experiences.${index}.tags`}
                    label="Tags"
                    placeholder="Adicionar tag"
                  />
                </FieldGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!!form.formState.errors.experiences}
          aria-disabled={!!form.formState.errors.experiences}
          onClick={async () => {
            const isValid = await form.trigger('experiences')
            if (isValid) {
              experiences.append(emptyExperience())
            }
          }}
        >
          <PlusIcon />
          Adicionar experiência
        </Button>
      </FieldSet>

      <FieldSet>
        <div className="mb-3 flex items-center justify-between gap-2">
          <FieldLegend className="mb-0">Formação</FieldLegend>
        </div>

        <div className="flex flex-col gap-4">
          {education.fields.map((item, index) => (
            <Card key={item.fieldId} size="sm">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Formação {index + 1}</CardTitle>
                <CardAction>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => education.remove(index)}
                    aria-label="Remover formação"
                  >
                    <Trash2Icon />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Controller
                    name={`education.${index}.title`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Título</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`education.${index}.institution`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Instituição
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`education.${index}.degree`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Grau</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <Controller
                      name={`education.${index}.startDate`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Início</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="date"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={`education.${index}.endDate`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Fim</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="date"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name={`education.${index}.certificateUrl`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          URL do certificado
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`education.${index}.description`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          rows={4}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <StringChipsField
                    control={form.control}
                    name={`education.${index}.tags`}
                    label="Tags"
                    placeholder="Adicionar tag"
                  />
                </FieldGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!!form.formState.errors.education}
          aria-disabled={!!form.formState.errors.education}
          onClick={async () => {
            const isValid = await form.trigger('education')
            if (isValid) {
              education.append(emptyEducation())
            }
          }}
        >
          <PlusIcon />
          Adicionar formação
        </Button>
      </FieldSet>

      <Button
        type="submit"
        className="self-end"
        disabled={!isDirty || !isValid || isPending}
      >
        {isPending && <Loader2 className="animate-spin" />}
        Salvar
      </Button>
    </form>
  )
}
