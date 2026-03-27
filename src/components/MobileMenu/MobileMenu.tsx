import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

import { MAIN_APP_NAV_ITEMS, isRouteActiveByMatch } from '../../navigation/mainNav'
import { ArrowItem } from '../ArrowElement/ArrowItem'
import { TransitionLink } from '../TransitionLink/TransitionLink'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const TELEGRAM_URL = 'https://t.me/rorrich'

type PanelStatus = 'closed' | 'open' | 'closing'

function normalizePath(to: string) {
  return to.startsWith('/') ? to : `/${to}`
}

const PRIMARY_NAV_COUNT = MAIN_APP_NAV_ITEMS.length

/** Целевая opacity пункта после открытия (GSAP перебивает CSS — задаём здесь). */
function navLinkOpacity(index: number, path: string): number {
  if (index >= PRIMARY_NAV_COUNT) return 1
  const item = MAIN_APP_NAV_ITEMS[index]
  if (!item) return 1
  return isRouteActiveByMatch(path, item) ? 0.4 : 1
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useLocation()
  const overlayRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const prevPathnameRef = useRef(pathname)
  const [status, setStatus] = useState<PanelStatus>('closed')

  useEffect(() => {
    if (isOpen) {
      setStatus('open')
    } else {
      setStatus((s) => (s === 'open' ? 'closing' : s))
    }
  }, [isOpen])

  useLayoutEffect(() => {
    const pathChanged = prevPathnameRef.current !== pathname
    if (pathChanged) {
      prevPathnameRef.current = pathname
      const el = overlayRef.current
      if (el) {
        const links = linkRefs.current.filter(Boolean) as HTMLElement[]
        gsap.killTweensOf([el, ...links])
        setStatus('closed')
        onClose()
      }
      return
    }

    const el = overlayRef.current
    if (!el || status === 'closed') return

    const links = linkRefs.current.filter(Boolean) as HTMLElement[]

    if (status === 'open') {
      gsap.killTweensOf([el, ...links])
      gsap.set(el, { yPercent: -100 })
      gsap.set(links, { opacity: 0, y: -12 })

      const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
      tl.to(el, { yPercent: 0, duration: 0.77 })
      tl.to(
        links,
        {
          opacity: (i: number) => navLinkOpacity(i, pathname),
          y: 0,
          duration: 0.55,
          ease: 'expo.out',
          stagger: 0.05,
        },
        '-=0.5',
      )

      return () => {
        tl.kill()
        gsap.killTweensOf([el, ...links])
      }
    }

    if (status === 'closing') {
      gsap.killTweensOf([el, ...links])
      const tl = gsap.timeline({
        onComplete: () => {
          setStatus((prev) => (prev === 'closing' ? 'closed' : prev))
        },
      })
      tl.to(
        links,
        {
          opacity: 0,
          y: -10,
          duration: 0.22,
          ease: 'power2.in',
          stagger: 0.04,
        },
        0,
      )
      tl.to(
        el,
        {
          yPercent: -100,
          duration: 0.65,
          ease: 'expo.inOut',
        },
        0.06,
      )

      return () => {
        tl.kill()
        gsap.killTweensOf([el, ...links])
      }
    }
  }, [pathname, status, onClose])

  useEffect(() => {
    if (status !== 'closed') {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [status])

  const closeIfAlreadyOnPage = (to: string) => {
    if (pathname === normalizePath(to)) {
      onClose()
    }
  }

  if (status === 'closed') return null

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-label="Меню"
      aria-modal="true"
    >
      <div className={styles.wrapper}>
        <nav className={styles.links} aria-label="Навигация">
          {MAIN_APP_NAV_ITEMS.map((item, index) => (
            <TransitionLink
              key={item.id}
              ref={(el) => {
                linkRefs.current[index] = el
              }}
              to={item.to}
              className={styles.link}
              aria-current={isRouteActiveByMatch(pathname, item) ? 'page' : undefined}
              onClick={() => closeIfAlreadyOnPage(item.to)}
            >
              {item.label}
              {item.counter ? <span className={styles.number}>{item.counter}</span> : null}
            </TransitionLink>
          ))}
        </nav>
        <div className={styles.contacts}>
          <a
            ref={(el) => {
              linkRefs.current[PRIMARY_NAV_COUNT] = el
            }}
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contact}
            onClick={() => {
              onClose()
            }}
          >
            <ArrowItem className={styles.contactItem}>telegram</ArrowItem>
          </a>
        </div>
      </div>
    </div>
  )
}
