import { useLayoutEffect } from 'react'

import { usePageTransition } from '../context/PageTransitionContext'

export { usePageTransition } from '../context/PageTransitionContext'

/**
 * Один раз при монтировании страницы убирает overlay-шторку (GSAP).
 * Для страниц с асинхронными данными: `const { pageReady } = usePageTransition()` — вызвать вручную.
 */
export function usePageReady() {
  const { pageReady } = usePageTransition()

  useLayoutEffect(() => {
    pageReady()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- только при входе на страницу
  }, [])
}
