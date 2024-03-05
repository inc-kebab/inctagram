import { LocaleType } from '@/../locales'
import { NAME_PATTERN, USERNAME_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'

export const editProfileSchema = (t: LocaleType) =>
  z.object({
    aboutMe: z.string().trim().max(200, t.validation.maxLength(200)),
    birthDate: z.string().trim(),
    city: z.string().trim(),
    firstName: z
      .string()
      .trim()
      .regex(NAME_PATTERN, { message: t.validation.nameVerification('First name') })
      .min(6, t.validation.minLength(1))
      .max(20, t.validation.maxLength(50)),
    lastName: z
      .string()
      .trim()
      .regex(NAME_PATTERN, { message: t.validation.nameVerification('Last name') })
      .min(6, t.validation.minLength(1))
      .max(30, t.validation.maxLength(50)),
    userName: z
      .string()
      .trim()
      .regex(USERNAME_PATTERN, { message: t.validation.userNameVerification })
      .min(6, t.validation.minLength(6))
      .max(30, t.validation.maxLength(30)),
  })

export type EditProfileFormValues = z.infer<ReturnType<typeof editProfileSchema>>
