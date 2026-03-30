import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

export type PageTransitionContextValue = {
  takeSnapshotAndNavigate: (href: string) => void
  pageReady: () => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

interface PageTransitionProviderProps {
  children: ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isTransitioningRef = useRef(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const dimmerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => {
      document.body.classList.remove('page-transitioning')
    }
  }, [])

  const pageReady = useCallback(() => {
    const overlay = overlayRef.current
    const dimmer = dimmerRef.current
    if (!overlay) return
    // Первый заход в SPA: шторка не поднималась — не анимируем
    if (!isTransitioningRef.current) return

    gsap.killTweensOf(overlay)
    if (dimmer) {
      gsap.killTweensOf(dimmer)
      gsap.set(dimmer, { display: 'none', opacity: 0 })
    }

    gsap.to(overlay, {
      yPercent: 100,
      duration: 0.6,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(overlay, { display: 'none', yPercent: -100 })
        isTransitioningRef.current = false
        document.body.classList.remove('page-transitioning')
      },
    })
  }, [])

  const takeSnapshotAndNavigate = useCallback(
    (href: string) => {
      const path = href.startsWith('/') ? href : `/${href}`
      if (location.pathname === path) {
        return
      }

      if (isTransitioningRef.current) {
        return
      }

      const overlay = overlayRef.current
      const dimmer = dimmerRef.current
      if (!overlay) {
        navigate(path)
        return
      }

      isTransitioningRef.current = true
      document.body.classList.add('page-transitioning')
      gsap.killTweensOf(overlay)
      if (dimmer) {
        gsap.killTweensOf(dimmer)
      }

      gsap.set(overlay, { display: 'block', yPercent: -100 })
      if (dimmer) {
        gsap.set(dimmer, { display: 'block', opacity: 0 })
        gsap.to(dimmer, {
          opacity: 0.6,
          duration: 0.55,
          ease: 'expo.inOut',
        })
      }

      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.77,
        ease: 'expo.inOut',
        onComplete: () => {
          navigate(path)
        },
      })
    },
    [location.pathname, navigate],
  )

  const value = useMemo<PageTransitionContextValue>(
    () => ({
      takeSnapshotAndNavigate,
      pageReady,
    }),
    [takeSnapshotAndNavigate, pageReady],
  )

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div
        id="transition-dimmer"
        ref={dimmerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: '#000',
          display: 'none',
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      />
      <div
        id="transition-overlay"
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'var(--color-bg, #fff)',
          display: 'none',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition(): PageTransitionContextValue {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) {
    throw new Error('usePageTransition must be used within PageTransitionProvider')
  }
  return ctx
}
