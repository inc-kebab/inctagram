import { LocaleType } from '@/../locales'
import { ABOUT_PATTERN, NAME_PATTERN, USERNAME_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'

export const editProfileSchema = (t: LocaleType) =>
  z.object({
    aboutMe: z
      .string()
      .trim()
      .max(200, t.validation.maxLength(200))
      .refine(
        text => {
          if (!text) {
            return true
          } else {
            return ABOUT_PATTERN.test(text)
          }
        },
        { message: t.validation.aboutMeVerification }
      )
      .optional(),
    birthDate: z
      .date()
      .nullable()
      .refine(
        birthDate => {
          if (!birthDate) {
            return false
          } else {
            const date = new Date(birthDate)
            const userAge = new Date().getFullYear() - date.getFullYear()

            return userAge >= 13
          }
        },
        { message: t.validation.ageMin }
      ),
    city: z.string().trim().optional(),
    firstname: z
      .string()
      .trim()
      .min(1, t.validation.minLength(1))
      .regex(NAME_PATTERN, { message: t.validation.nameVerification(t.fields.firstName) })
      .max(20, t.validation.maxLength(50)),
    lastname: z
      .string()
      .trim()
      .min(1, t.validation.minLength(1))
      .regex(NAME_PATTERN, { message: t.validation.nameVerification(t.fields.lastName) })
      .max(30, t.validation.maxLength(50)),
    username: z
      .string()
      .trim()
      .min(6, t.validation.minLength(6))
      .regex(USERNAME_PATTERN, { message: t.validation.userNameVerification })
      .max(30, t.validation.maxLength(30)),
  })

export type EditProfileFormValues = z.infer<ReturnType<typeof editProfileSchema>>
