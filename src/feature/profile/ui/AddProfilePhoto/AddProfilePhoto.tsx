import Close from '@/shared/assets/icons/common/close.svg'
import ImageIcon from '@/shared/assets/icons/fill/image.svg'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

import s from './AddProfilePhoto.module.scss'

type Props = {
  setOpen: (open: boolean) => void
  url?: string
}

export const AddProfilePhoto = ({ setOpen, url }: Props) => {
  const handleOpen = () => setOpen(true)

  return (
    <div className={s.container}>
      <div className={s.circle}>
        {url ? (
          <div className={s.avatarWpapper}>
            <Image alt="profile avatar" className={s.avatar} height={192} src={url} width={192} />
            <Button
              asComponent="button"
              className={s.deleteAvatar}
              onClick={handleOpen}
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
      <Button asComponent="button" variant="outline">
        Add a Profile Photo
      </Button>
    </div>
  )
}
