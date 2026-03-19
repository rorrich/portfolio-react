import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { useTheme } from '../../hooks/useTheme'
import { MenuLink } from '../MenuLink/MenuLink'

import styles from './Header.module.css'

const DESKTOP_MQ = '(min-width: 971px)'
const SCROLLED_Y_PX = 50
// Без "зоны безопасности" — реагируем максимально сразу.
const TOP_VISIBLE_Y_PX = 0
const SCROLL_DOWN_THRESHOLD_PX = 0

interface HeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
  isTransparentStart?: boolean
}

export default function Header({
  isMenuOpen,
  onToggleMenu,
  isTransparentStart = false,
}: HeaderProps) {
  const { pathname } = useLocation()
  const { toggleTheme } = useTheme()

  const headerRef = useRef<HTMLElement | null>(null)
  const prevScrollYRef = useRef(0)
  const isDesktopRef = useRef(false)

  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const isAboutActive = pathname.startsWith('/about')
  const isWorksActive = pathname.startsWith('/works')

  // При входе на case-страницу шапка должна быть видна
  // (в состоянии прозрачности), даже если она была скрыта на предыдущей странице.
  useEffect(() => {
    if (!isTransparentStart) return
    setIsHidden(false)
  }, [isTransparentStart])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia(DESKTOP_MQ)

    const syncDesktop = () => {
      isDesktopRef.current = mq.matches
      if (!mq.matches) {
        setIsScrolled(false)
        setIsHidden(false)
        prevScrollYRef.current = window.scrollY
      }
    }

    syncDesktop()
    prevScrollYRef.current = window.scrollY
    mq.addEventListener('change', syncDesktop)

    const handleScroll = () => {
      if (!isDesktopRef.current) return

      const y = window.scrollY
      if (isTransparentStart) {
        // В самом верху всегда transparent state.
        if (y <= 0) {
          setIsScrolled(false)
          // Не перетираем вычислениями по геометрии — на первом кадре
          // bounding box может ещё не быть стабильным (особенно на Cleanner).
          return
        }

        const headerEl = headerRef.current
        const caseHeroEl = document.querySelector<HTMLElement>('.case-hero')
        const heroContentEl = document.querySelector<HTMLElement>('.case-hero__content')

        // Прозрачность должна включаться, когда шапка попадает в зону case-hero__content
        if (headerEl && (caseHeroEl || heroContentEl)) {
          const headerRect = headerEl.getBoundingClientRect()

          const containerRect = caseHeroEl
            ? caseHeroEl.getBoundingClientRect()
            : heroContentEl!.getBoundingClientRect()

          // Требование: прозрачность включаем, когда шапка "полностью наехала" на case-hero,
          // то есть нижняя граница шапки всё ещё находится внутри высоты секции.
          const isHeaderFullyCovered =
            containerRect.top <= headerRect.top && containerRect.bottom >= headerRect.bottom

          setIsScrolled(!isHeaderFullyCovered)
        } else {
          // Fallback, если почему-то не нашли элемент
          setIsScrolled(y > SCROLLED_Y_PX)
        }
      } else {
        // На не-case страницах этими классами мы всё равно не пользуемся,
        // но чтобы состояние не влияло — выключаем.
        setIsScrolled(false)
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

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      mq.removeEventListener('change', syncDesktop)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMenuOpen, isTransparentStart])

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
  // - в самом верху (scrollY < 50) шапка прозрачная
  // - при скролле ниже 50 — белая с чёрным текстом
  // Для остальных страниц (home/works/about) шапка всегда с var-цветами и var-бордером.
  const transparentStart = isTransparentStart && !isScrolled
  const shouldUseScrolledDesktop = isTransparentStart && isScrolled

  return (
    <header
      ref={headerRef}
      className={clsx(
        'header',
        styles.header,
        transparentStart && styles.transparentStartDesktop,
          shouldUseScrolledDesktop && styles.scrolledDesktop,
        isHidden && styles.hiddenDesktop,
      )}
    >
      <div className={`header__container ${styles.headerContainer}`}>
        <div className={`header__logo ${styles.logo}`}>
          <Link to="/" className={styles.logoLink} aria-label="На главную">
            <svg
              className={styles.logoSvg}
              width="56"
              height="47"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/images/sprite.svg#icon-logo" />
            </svg>
          </Link>
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
          <img src="/images/burger.svg" alt="Меню" className={styles.burgerIcon} />
          <img
            src="/images/burger-close.svg"
            alt="Закрыть"
            className={styles.burgerCloseIcon}
          />
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

