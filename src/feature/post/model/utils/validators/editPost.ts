import { z } from 'zod'

import { LocaleType } from '../../../../../../locales'

export const editPostSchema = (t: LocaleType) => {
  return z.string().min(0).max(500)
}
