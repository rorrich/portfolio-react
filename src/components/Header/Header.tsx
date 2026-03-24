import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { useHeaderScrollBehavior } from '../../hooks/useHeaderScrollBehavior'
import { useTheme } from '../../hooks/useTheme'
import { MenuLink } from '../MenuLink/MenuLink'
import { TransitionLink } from '../TransitionLink/TransitionLink'
import { resolveCaseHeaderSurface } from './headerSurface'

import styles from './Header.module.css'

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

  const { caseHeaderMode, isHidden } = useHeaderScrollBehavior({
    isCasePage,
    isMenuOpen,
    headerRef,
  })

  const isAboutActive = pathname.startsWith('/about')
  const isWorksActive = pathname.startsWith('/works')

  const surface = resolveCaseHeaderSurface(isCasePage, caseHeaderMode, isMenuOpen)

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

  return (
    <header
      ref={headerRef}
      className={clsx(
        'header',
        styles.header,
        surface === 'caseTransparent' && styles.casesTransparent,
        surface === 'caseFilled' && styles.casesFilled,
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

        {!isCasePage ? (
          <button
            type="button"
            className={`header__color-changer ${styles.colorChanger}`}
            aria-label="Сменить цветовую тему"
            onClick={toggleTheme}
          >
            какой ты сегодня
          </button>
        ) : null}

        <button
          type="button"
          className={`header__burger ${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={onToggleMenu}
        >
          <span className={styles.burgerLines} aria-hidden>
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
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
