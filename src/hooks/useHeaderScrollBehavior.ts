import { useEffect, useRef, useState, type RefObject } from 'react'

import {
  CASE_HEADER_FALLBACK_FILLED_SCROLL_Y_PX,
  CASE_HEADER_TOP_GUARD_PX,
  layoutDesktopMinWidthMediaQuery,
} from '../constants/layout'

export type CaseHeaderMode = 'transparent' | 'filled'

interface UseHeaderScrollBehaviorParams {
  isCasePage: boolean
  isMenuOpen: boolean
  headerRef: RefObject<HTMLElement | null>
}

/**
 * Скролл, matchMedia и логика transparent/filled для кейсов + скрытие шапки на десктопе при скролле вниз.
 */
export function useHeaderScrollBehavior({
  isCasePage,
  isMenuOpen,
  headerRef,
}: UseHeaderScrollBehaviorParams) {
  const prevScrollYRef = useRef(0)
  const isDesktopRef = useRef(false)
  const scrollRafRef = useRef<number | null>(null)

  const [caseHeaderMode, setCaseHeaderMode] = useState<CaseHeaderMode>('transparent')
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (!isCasePage) return
    setIsHidden(false)
  }, [isCasePage])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia(layoutDesktopMinWidthMediaQuery)

    const syncDesktop = () => {
      isDesktopRef.current = mq.matches
      if (!mq.matches) {
        setCaseHeaderMode('transparent')
        setIsHidden(false)
        prevScrollYRef.current = window.scrollY
      }
    }

    syncDesktop()
    prevScrollYRef.current = window.scrollY
    mq.addEventListener('change', syncDesktop)

    const processScroll = () => {
      const y = window.scrollY
      if (isCasePage) {
        if (y < CASE_HEADER_TOP_GUARD_PX) {
          setCaseHeaderMode('transparent')
        } else {
          const headerEl = headerRef.current
          const caseHeroEl = document.querySelector<HTMLElement>('.case-hero')
          const heroContentEl = document.querySelector<HTMLElement>('.case-hero__content')

          if (headerEl && (caseHeroEl || heroContentEl)) {
            const headerRect = headerEl.getBoundingClientRect()
            const containerRect = caseHeroEl
              ? caseHeroEl.getBoundingClientRect()
              : heroContentEl!.getBoundingClientRect()

            const isHeaderFullyCovered =
              containerRect.top <= headerRect.top && containerRect.bottom >= headerRect.bottom

            setCaseHeaderMode(isHeaderFullyCovered ? 'transparent' : 'filled')
          } else {
            setCaseHeaderMode(
              y > CASE_HEADER_FALLBACK_FILLED_SCROLL_Y_PX ? 'filled' : 'transparent',
            )
          }
        }
      } else {
        setCaseHeaderMode('transparent')
      }

      if (isMenuOpen) {
        setIsHidden(false)
        prevScrollYRef.current = y
        return
      }

      if (y <= 0) {
        setIsHidden(false)
        prevScrollYRef.current = y
        return
      }

      if (isCasePage && y < CASE_HEADER_TOP_GUARD_PX) {
        setIsHidden(false)
        prevScrollYRef.current = y
        return
      }

      if (!isDesktopRef.current) {
        setIsHidden(false)
        prevScrollYRef.current = y
        return
      }

      const prevY = prevScrollYRef.current
      const delta = y - prevY
      prevScrollYRef.current = y

      if (delta < 0) {
        setIsHidden(false)
        return
      }

      if (delta > 0) {
        setIsHidden(true)
      }
    }

    const handleScroll = () => {
      if (scrollRafRef.current != null) return
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null
        processScroll()
      })
    }

    processScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      mq.removeEventListener('change', syncDesktop)
      window.removeEventListener('scroll', handleScroll)
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current)
        scrollRafRef.current = null
      }
    }
  }, [isMenuOpen, isCasePage, headerRef])

  return { caseHeaderMode, isHidden }
}
