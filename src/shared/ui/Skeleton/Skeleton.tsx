import { CSSProperties } from 'react'

import clsx from 'clsx'

import s from './Skeleton.module.scss'

interface SkeletonPT {
  border?: string
  className?: string
  height?: number | string
  width?: number | string
}

export const Skeleton = ({ border, className, height, width }: SkeletonPT) => {
  const styles: CSSProperties = {
    borderRadius: border,
    height,
    width,
  }

  return <div className={clsx(s.Skeleton, className)} style={styles}></div>
}
