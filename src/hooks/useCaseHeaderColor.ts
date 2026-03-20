import { useEffect } from 'react'

import { CASE_HEADER_TOP_GUARD_PX } from '../constants/caseHeader'

export function useCaseHeaderColor() {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const header = document.querySelector('.header') as HTMLElement | null
    if (!header) return

    // По умолчанию: белый (на тёмном hero) -> не добавляем header--light
    header.classList.remove('header--light')

    const lightSections = Array.from(
      document.querySelectorAll<HTMLElement>('.case-section:not(.case-section--dark)'),
    )

    if (!lightSections.length) return

    const readHeaderHeight = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
        .trim()
      const parsed = Number.parseFloat(raw)
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 100
    }

    const intersectingSet = new Set<HTMLElement>()

    const syncHeaderLightFromScroll = () => {
      const y = window.scrollY
      // У верхнего края не доверяем полосе IO — светлая секция может «зажиматься»
      // под хедером на микродвижениях и щёлкать контраст.
      if (y < CASE_HEADER_TOP_GUARD_PX) {
        header.classList.remove('header--light')
        return
      }
      header.classList.toggle('header--light', intersectingSet.size > 0)
    }

    const createObserver = () => {
      const headerHeight = readHeaderHeight()
      const bottomShrink = -(window.innerHeight - headerHeight)

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const target = entry.target as HTMLElement
            if (entry.isIntersecting) intersectingSet.add(target)
            else intersectingSet.delete(target)
          }

          syncHeaderLightFromScroll()
        },
        {
          root: null,
          threshold: 0,
          // Обрезаем root снизу так, чтобы Intersection проверялся только в зоне высоты хедера
          rootMargin: `0px 0px ${bottomShrink}px 0px`,
        },
      )

      for (const section of lightSections) observer.observe(section)
      return observer
    }

    const observer = createObserver()

    syncHeaderLightFromScroll()
    window.addEventListener('scroll', syncHeaderLightFromScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncHeaderLightFromScroll)
      observer.disconnect()
    }
  }, [])
}

