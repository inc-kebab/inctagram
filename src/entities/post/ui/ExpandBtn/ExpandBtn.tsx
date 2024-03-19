import { useState } from 'react'

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
  aspect: number
  setAspect: (aspect: number) => void
}

export const ExpandBtn = ({ aspect, setAspect }: Props) => {
  const [isOpenExpand, setIsOpenExpand] = useState(false)

  return (
    <>
      <Button
        className={s.expandBtn}
        onClick={() => setIsOpenExpand(!isOpenExpand)}
        startIcon={<Expand className={clsx(isOpenExpand && s.isOpenIcon)} height={21} width={21} />}
      />
      {isOpenExpand && (
        <div className={s.expandContainer}>
          <div className={s.expandWrapper}>
            <Typography>Original</Typography>
            <Button
              className={s.squareBtn}
              onClick={() => setAspect(0)}
              startIcon={
                <ImageIcon
                  color={aspect === 0 ? 'var(--light-100)' : 'var(--light-900)'}
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
              onClick={() => setAspect(1)}
              startIcon={<Square color={aspect === 1 ? 'var(--light-100)' : 'var(--light-900)'} />}
              variant="text"
            />
          </div>
          <div className={s.expandWrapper}>
            <Typography>4:5</Typography>
            <Button
              className={s.squareBtn}
              onClick={() => setAspect(4 / 5)}
              startIcon={
                <VerticalRectangle
                  color={aspect === 4 / 5 ? 'var(--light-100)' : 'var(--light-900)'}
                />
              }
              variant="text"
            />
          </div>
          <div className={s.expandWrapper}>
            <Typography> 16:9</Typography>
            <Button
              className={s.squareBtn}
              onClick={() => setAspect(16 / 9)}
              startIcon={
                <HorizontalRectangle
                  color={aspect === 16 / 9 ? 'var(--light-100)' : 'var(--light-900)'}
                />
              }
              variant="text"
            />
          </div>
        </div>
      )}
    </>
  )
}
