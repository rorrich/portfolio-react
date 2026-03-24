import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { CASE_HEADER_TOP_GUARD_PX } from '../../constants/caseHeader'
import { useTheme } from '../../hooks/useTheme'
import { MenuLink } from '../MenuLink/MenuLink'
import { TransitionLink } from '../TransitionLink/TransitionLink'

import styles from './Header.module.css'

const DESKTOP_MQ = '(min-width: 971px)'
const SCROLLED_Y_PX = 50
// Без "зоны безопасности" — реагируем максимально сразу.
const TOP_VISIBLE_Y_PX = 0
const SCROLL_DOWN_THRESHOLD_PX = 0

interface HeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
  isCasePage?: boolean
}

export default function Header({
  isMenuOpen,
  onToggleMenu,
  isCasePage = false,
}: HeaderProps) {
  const { pathname } = useLocation()
  const { toggleTheme } = useTheme()

  const headerRef = useRef<HTMLElement | null>(null)
  const prevScrollYRef = useRef(0)
  const isDesktopRef = useRef(false)
  const scrollRafRef = useRef<number | null>(null)

  const [caseHeaderMode, setCaseHeaderMode] = useState<'transparent' | 'filled'>('transparent')
  const [isHidden, setIsHidden] = useState(false)

  const isAboutActive = pathname.startsWith('/about')
  const isWorksActive = pathname.startsWith('/works')

  // При входе на case-страницу шапка должна быть видна
  // (в состоянии прозрачности), даже если она была скрыта на предыдущей странице.
  useEffect(() => {
    if (!isCasePage) return
    setIsHidden(false)
  }, [isCasePage])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia(DESKTOP_MQ)

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
        // cases-transparent: у верхнего края — стабильное прозрачное состояние
        // (общая «мёртвая зона» для стабильного переключения состояний у верхней границы).
        if (y < CASE_HEADER_TOP_GUARD_PX) {
          setCaseHeaderMode('transparent')
          // Не перетираем вычислениями по геометрии — bbox может быть нестабильным на первых px.
        } else {
          const headerEl = headerRef.current
          const caseHeroEl = document.querySelector<HTMLElement>('.case-hero')
          const heroContentEl = document.querySelector<HTMLElement>('.case-hero__content')

            // cases-filled включаем, когда шапка вышла из зоны полного покрытия hero-контентом.
          if (headerEl && (caseHeroEl || heroContentEl)) {
            const headerRect = headerEl.getBoundingClientRect()

            const containerRect = caseHeroEl
              ? caseHeroEl.getBoundingClientRect()
              : heroContentEl!.getBoundingClientRect()

            // Требование: cases-transparent, когда шапка "полностью наехала" на case-hero,
            // то есть нижняя граница шапки всё ещё находится внутри высоты секции.
            const isHeaderFullyCovered =
              containerRect.top <= headerRect.top && containerRect.bottom >= headerRect.bottom

            setCaseHeaderMode(isHeaderFullyCovered ? 'transparent' : 'filled')
          } else {
            // Fallback, если почему-то не нашли элемент
            setCaseHeaderMode(y > SCROLLED_Y_PX ? 'filled' : 'transparent')
          }
        }
      } else {
        // На обычных страницах active состояние — default.
        // но чтобы состояние не влияло — выключаем.
        setCaseHeaderMode('transparent')
      }

      // Если меню открыто — шапка всегда видима
      if (isMenuOpen) {
        setIsHidden(false)
        prevScrollYRef.current = y
        return
      }

      // В самом верху — всегда видна
      if (y <= TOP_VISIBLE_Y_PX) {
        setIsHidden(false)
        prevScrollYRef.current = y
        return
      }

      // На мобилке шапка всегда видима: нам нужен только пересчёт cases-filled для контраста.
      if (!isDesktopRef.current) {
        setIsHidden(false)
        prevScrollYRef.current = y
        return
      }

      const prevY = prevScrollYRef.current
      const delta = y - prevY
      prevScrollYRef.current = y

      // Скроллим вверх — показываем сразу
      if (delta < 0) {
        setIsHidden(false)
        return
      }

      // Скроллим вниз — скрываем сразу после фактического движения вниз
      if (delta > SCROLL_DOWN_THRESHOLD_PX) {
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
  }, [isMenuOpen, isCasePage])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const setHeaderHeightVar = (el: HTMLElement) => {
      document.documentElement.style.setProperty('--header-height', `${el.offsetHeight}px`)
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement
        const box = entry.borderBoxSize?.[0]
        const height = box?.blockSize ?? target.offsetHeight
        document.documentElement.style.setProperty('--header-height', `${height}px`)
      }
    })

    observer.observe(header)
    setHeaderHeightVar(header)

    return () => observer.disconnect()
  }, [])

  // Для страниц кейсов:
  // states:
  // - cases-transparent: вверху case-страницы (scrollY < CASE_HEADER_TOP_GUARD_PX)
  // - cases-filled: ниже, когда вышли из зоны полного покрытия hero
  // - default: все обычные страницы
  const isCaseHeaderTransparent = isCasePage && caseHeaderMode === 'transparent'
  const isCaseHeaderFilled = isCasePage && caseHeaderMode === 'filled'

  return (
    <header
      ref={headerRef}
      className={clsx(
        'header',
        styles.header,
        isCaseHeaderTransparent && styles.casesTransparent,
        isCaseHeaderFilled && styles.casesFilled,
        isHidden && styles.hiddenDesktop,
      )}
    >
      <div className={`header__container ${styles.headerContainer}`}>
        <div className={`header__logo ${styles.logo}`}>
          <TransitionLink to="/" className={styles.logoLink} aria-label="На главную">
            <svg
              className={styles.logoSvg}
              width="56"
              height="47"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/images/sprite.svg#icon-logo" />
            </svg>
          </TransitionLink>
        </div>

        <button
          type="button"
          className={`header__color-changer ${styles.colorChanger}`}
          aria-label="Сменить цветовую тему"
          onClick={toggleTheme}
        >
          какой ты сегодня
        </button>

        <button
          type="button"
          className={`header__burger ${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
          aria-expanded={isMenuOpen}
          aria-label="Открыть меню"
          onClick={onToggleMenu}
        >
          {!isMenuOpen ? (
            <img src="/images/burger.svg" alt="Меню" className={styles.burgerIcon} />
          ) : (
            <img src="/images/burger-close.svg" alt="Закрыть" className={styles.burgerCloseIcon} />
          )}
        </button>

        <nav className={`header__menu ${styles.nav}`} aria-label="Главная навигация">
          <MenuLink
            to="/about"
            className={isAboutActive ? 'menu-item--active' : undefined}
          >
            who я
          </MenuLink>
          <MenuLink
            to="/works"
            className={isWorksActive ? 'menu-item--active' : undefined}
            counter="[3]"
          >
            работы
          </MenuLink>
        </nav>
      </div>
    </header>
  )
}

