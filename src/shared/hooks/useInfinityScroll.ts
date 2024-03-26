import { MutableRefObject, useEffect } from 'react'

export interface UseInfinityScrollOptions {
  callback?: () => void
  hasMore?: boolean
  triggerRef: MutableRefObject<HTMLElement | null>
}

/**
 * Кастомный хук бесконечного скролла.
 *
 * @param {useInfinityScroll} callback - фукнция, которая вызовется, когда элемент покажется во вьюпорте
 * @param {useInfinityScroll} triggerRef - элемент, который должен показаться во вьюпорте
 */

export const useInfinityScroll = ({
  callback,
  hasMore = true,
  triggerRef,
}: UseInfinityScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null

    //* запоминаем наш реф, чтобы при переходе на другую страницу, нормально отписаться от observe()
    const trigger = triggerRef.current

    if (callback && trigger) {
      observer = new IntersectionObserver(([entry]) => {
        //* isIntersecting - равен true, когда наблюдаемый элемент хотя бы на 1 пиксель пересекает вьюпорт
        if (entry.isIntersecting && hasMore) {
          callback()
        }
      })

      observer.observe(trigger)
    }

    return () => {
      if (observer && trigger) {
        observer.unobserve(trigger)
        observer = null
      }
    }
  }, [callback, triggerRef, hasMore])
}
