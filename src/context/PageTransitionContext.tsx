import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

export type PageTransitionContextValue = {
  takeSnapshotAndNavigate: (href: string) => void
  pageReady: () => void
  isTransitioning: boolean
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

/** Съём оверлея (сек) — без изменений; раньше конца см. OVERLAY_EXIT_RELEASE_PROGRESS */
const OVERLAY_EXIT_DURATION = 0.65

/** Когда отпускать isTransitioning: 0.8 ≈ на 20% раньше полного конца анимации */
const OVERLAY_EXIT_RELEASE_PROGRESS = 0.8

interface PageTransitionProviderProps {
  children: ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isTransitioningRef = useRef(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
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

    let releasedTransitioning = false
    const releaseTransitioning = () => {
      if (releasedTransitioning) return
      releasedTransitioning = true
      isTransitioningRef.current = false
      setIsTransitioning(false)
    }

    gsap.to(overlay, {
      yPercent: 100,
      duration: OVERLAY_EXIT_DURATION,
      ease: 'power3.inOut',
      onUpdate() {
        if (this.progress() >= OVERLAY_EXIT_RELEASE_PROGRESS) {
          releaseTransitioning()
        }
      },
      onComplete: () => {
        gsap.set(overlay, { display: 'none', yPercent: -100 })
        releaseTransitioning()
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
      setIsTransitioning(true)
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
          duration: 0.59,
          ease: 'power3.inOut',
        })
      }

      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.83,
        ease: 'power3.inOut',
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
      isTransitioning,
    }),
    [takeSnapshotAndNavigate, pageReady, isTransitioning],
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
