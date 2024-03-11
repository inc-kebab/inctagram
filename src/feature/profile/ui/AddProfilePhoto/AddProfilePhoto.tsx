import { AddProfilePhotoDialog } from '@/feature/profile'
import Close from '@/shared/assets/icons/common/close.svg'
import ImageIcon from '@/shared/assets/icons/fill/image.svg'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

import s from './AddProfilePhoto.module.scss'

type Props = {
  avaUrlFromServer?: string
  onOpenAddDialog: () => void
  onOpenDeleteDialog: () => void
}

export const AddProfilePhoto = ({
  avaUrlFromServer,
  onOpenAddDialog,
  onOpenDeleteDialog,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.container}>
      <div className={s.circle}>
        {avaUrlFromServer ? (
          <div className={s.avatarWpapper}>
            <Image
              alt="profile avatar"
              className={s.avatar}
              height={192}
              src={avaUrlFromServer}
              width={192}
            />
            <Button
              asComponent="button"
              className={s.deleteAvatar}
              onClick={onOpenDeleteDialog}
              variant="text"
            >
              <Close className={s.closeIcon} viewBox="0 0 24 24" />
            </Button>
          </div>
        ) : (
          <div className={s.iconWrapper}>
            <ImageIcon className={s.image} />
          </div>
        )}
      </div>
      <Button asComponent="button" onClick={onOpenAddDialog} variant="outline">
        {t.pages.profile.addProfilePhoto}
      </Button>
    </div>
  )
}
