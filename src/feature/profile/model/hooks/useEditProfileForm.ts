import { usePlacesWidget } from 'react-google-autocomplete'
import { useForm } from 'react-hook-form'

import { LocaleType } from '@/../locales'
import { GetProfileResponse } from '@/feature/profile/model/types/profile.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import { EditProfileFormValues, editProfileSchema } from '../utils/validators/editProfileSchema'

export const useEditProfileForm = (userData: GetProfileResponse | undefined, t: LocaleType) => {
  const { defaultLocale, locale } = useRouter()

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
    setValue,
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      aboutMe: userData?.aboutMe || undefined,
      birthDate: userData?.dateOfBirth ? new Date(userData.dateOfBirth) : undefined,
      city: userData?.city || '',
      firstname: userData?.firstName || '',
      lastname: userData?.lastName || '',
      username: userData?.userName || '',
    },
    mode: 'onTouched',
    resolver: zodResolver(editProfileSchema(t)),
  })

  const { ref: changeCityRef } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    inputAutocompleteValue: 'country',
    language: locale || defaultLocale,
    onPlaceSelected: place => {
      if (!place) {
        return
      }
      if (place?.address_components?.length) {
        setValue('city', place.address_components[0].short_name)
      } else {
        setValue('city', place.name)
      }
    },
    options: {
      fields: ['name', 'address_components'],
    },
  })

  return { changeCityRef, control, errors, handleSubmit, isValid, reset, setError }
}
