import { useAppDispatch } from '@/app/store/store'
import { ImageObj, postsActions } from '@/feature/post/api/post-slice'
import { Expand } from '@/shared/assets/icons/common/index'
import {
  HorizontalRectangle,
  Image as ImageIcon,
  Square,
  VerticalRectangle,
} from '@/shared/assets/icons/outline/index'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './ExpandBtn.module.scss'

type Props = {
  activeIndex: number
  className?: string
  images: ImageObj[]
  isOpenExpand: boolean
  setIsOpenExpand: (isOpenExpand: boolean) => void
}

export const ExpandBtn = ({
  activeIndex,
  className,
  images,
  isOpenExpand,
  setIsOpenExpand,
}: Props) => {
  const dispatch = useAppDispatch()
  const image = images[activeIndex]

  const onAspectHandler = (aspect: number) => () => {
    dispatch(
      postsActions.setImages(
        images.map(img => (img.imageURL === image?.imageURL ? { ...img, aspect } : img))
      )
    )
  }

  return (
    <div className={className}>
      <Button
        className={s.expandBtn}
        onClick={() => setIsOpenExpand(!isOpenExpand)}
        startIcon={<Expand className={clsx(isOpenExpand && s.isOpenIcon)} height={24} width={24} />}
      />

      {isOpenExpand && (
        <div className={s.expandContainer}>
          <div className={s.expandWrapper}>
            <Typography>Original</Typography>
            <Button
              className={s.squareBtn}
              onClick={onAspectHandler(0)}
              startIcon={
                <ImageIcon
                  color={image?.aspect === 0 ? 'var(--light-100)' : 'var(--light-900)'}
                  height={24}
                  width={24}
                />
              }
              style={{ marginRight: -3 }}
              variant="text"
            />
          </div>

          <div className={s.expandWrapper}>
            <Typography>1:1 </Typography>
            <Button
              className={s.squareBtn}
              onClick={onAspectHandler(1)}
              startIcon={
                <Square color={image?.aspect === 1 ? 'var(--light-100)' : 'var(--light-900)'} />
              }
              variant="text"
            />
          </div>

          <div className={s.expandWrapper}>
            <Typography>4:5</Typography>
            <Button
              className={s.squareBtn}
              onClick={onAspectHandler(4 / 5)}
              startIcon={
                <VerticalRectangle
                  color={image?.aspect === 4 / 5 ? 'var(--light-100)' : 'var(--light-900)'}
                />
              }
              variant="text"
            />
          </div>

          <div className={s.expandWrapper}>
            <Typography> 16:9</Typography>
            <Button
              className={s.squareBtn}
              onClick={onAspectHandler(16 / 9)}
              startIcon={
                <HorizontalRectangle
                  color={image?.aspect === 16 / 9 ? 'var(--light-100)' : 'var(--light-900)'}
                />
              }
              variant="text"
            />
          </div>
        </div>
      )}
    </div>
  )
}
