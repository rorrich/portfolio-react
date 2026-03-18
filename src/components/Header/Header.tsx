import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useTheme } from '../../hooks/useTheme'
import { MenuLink } from '../MenuLink/MenuLink'

import styles from './Header.module.css'

interface HeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export function Header({ isMenuOpen, onToggleMenu }: HeaderProps) {
  const { pathname } = useLocation()
  const { toggleTheme } = useTheme()
  const headerRef = useRef<HTMLElement | null>(null)

  const isAboutActive = pathname.startsWith('/about')
  const isWorksActive = pathname.startsWith('/works')

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height
        document.documentElement.style.setProperty('--header-height', `${height}px`)
      }
    })

    observer.observe(header)

    // Устанавливаем начальное значение сразу (fallback в CSS убирает скачок при первом рендере)
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)

    return () => observer.disconnect()
  }, [])

  return (
    <header ref={headerRef} className={`header ${styles.header}`}>
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
          <img src="/images/burger-close.svg" alt="Закрыть" className={styles.burgerCloseIcon} />
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

