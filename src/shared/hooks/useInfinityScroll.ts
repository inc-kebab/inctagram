import { MutableRefObject, useEffect } from 'react'

interface UseInfinityScrollOptions {
  callback?: () => void
  hasMore?: boolean
  triggerRef: MutableRefObject<HTMLElement | null>
}

/**
 * Кастомный хук бесконечного скролла.
 *
 * @param {useInfinityScroll} callback - фукнция, которая вызовется, когда элемент покажется во вьюпорте
 * @param {useInfinityScroll} hasMore - флаг, который обозначает, будут ли еще элементы при запросе следующей страницы
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
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            callback()
          }
        },
        { threshold: 0.8 }
      )

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
