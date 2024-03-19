import { useEffect, useRef, useState } from 'react'

import { useMeQuery } from '@/feature/auth'
import { useEditPostMutation } from '@/feature/post/api/post-api'
import { AdditionalRefProps } from '@/feature/post/model/types/post.types'
import { EditPostFormValues } from '@/feature/post/model/utils/validators/editPost'
import { EditPost } from '@/feature/post/ui/EditPost/EditPost'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Nullable } from '@/shared/types'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { Loader } from '@/shared/ui/Loader'
import { PublicLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const Public: Page = () => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const ref = useRef<Nullable<UseFormRef<EditPostFormValues, AdditionalRefProps>>>(null)
  const [editPost, { isLoading }] = useEditPostMutation()

  const { push } = useRouter()

  const { data } = useMeQuery()

  const { t } = useTranslation()

  useEffect(() => {
    if (data) {
      void push('/home')
    } else {
      setLoading(false)
    }
  }, [data, push])

  if (loading) {
    return <Loader fullHeight />
  }

  const handleOpen = () => {
    if (ref.current?.isDirty) {
      ref.current?.onOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleCloseModals = () => {
    ref.current?.onOpen(false)
    setOpen(false)
  }

  const onSubmitHandle = (data: EditPostFormValues) => {
    const newData = {
      description: data.description,
      id: '111',
    }

    editPost(newData).then(res => {
      if ('error' in res && ref.current) {
        const setError = ref.current?.setError

        const errors = handleErrorResponse<EditPostFormValues>(res.error)

        if (errors?.error && !errors.fieldErrors) {
          setError('description', { message: errors.error })
        }
        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  return (
    <PublicLayout title={t.pages.main.metaTitle}>
      <main>POSTS LIST</main>
      <Button onClick={() => setOpen(true)}>Click</Button>
      <Dialog onOpenChange={handleOpen} open={open} title="Edit Post">
        <EditPost
          disabled={isLoading}
          onCloseHandle={handleCloseModals}
          onSubmit={onSubmitHandle}
          ref={ref}
        >
          ProfileInfo
        </EditPost>
      </Dialog>
    </PublicLayout>
  )
}

export default Public
