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

  const isAboutActive = pathname.startsWith('/about')
  const isWorksActive = pathname.startsWith('/works')

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
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
          className={styles.colorChanger}
          aria-label="Сменить цветовую тему"
          onClick={toggleTheme}
        >
          какой ты сегодня
        </button>

        <button
          type="button"
          className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
          aria-expanded={isMenuOpen}
          aria-label="Открыть меню"
          onClick={onToggleMenu}
        >
          <img src="/images/burger.svg" alt="Меню" className={styles.burgerIcon} />
          <img src="/images/burger-close.svg" alt="Закрыть" className={styles.burgerCloseIcon} />
        </button>

        <nav className={styles.nav} aria-label="Главная навигация">
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

