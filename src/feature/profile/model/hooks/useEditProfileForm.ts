import { useEffect } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useForm } from 'react-hook-form'

import { LocaleType } from '@/../locales'
import { zodResolver } from '@hookform/resolvers/zod'
import { parse } from 'date-fns'
import { useRouter } from 'next/router'

import { GetProfileResponse } from '../types/profile.types'
import { EditProfileFormValues, editProfileSchema } from '../utils/validators/editProfileSchema'

export const useEditProfileForm = (t: LocaleType, userData?: GetProfileResponse) => {
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
      aboutMe: '',
      birthDate: null,
      city: '',
      firstname: '',
      lastname: '',
      username: '',
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

  useEffect(() => {
    if (userData) {
      reset({
        aboutMe: userData.aboutMe || '',
        birthDate: userData.birthDate ? parse(userData.birthDate, 'dd-MM-yyyy', new Date()) : null,
        city: userData.city || '',
        firstname: userData.firstName || '',
        lastname: userData.lastName || '',
        username: userData.username || '',
      })
    }
  }, [reset, userData])

  return { changeCityRef, control, errors, handleSubmit, isValid, reset, setError }
}
