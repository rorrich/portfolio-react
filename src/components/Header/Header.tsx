import { useEffect, useRef } from 'react'
import clsx from 'clsx'

import { useHeaderScrollBehavior } from '../../hooks/useHeaderScrollBehavior'
import { useMainNavHeaderItems } from '../../hooks/useMainNavHeader'
import { useTheme } from '../../hooks/useTheme'
import { ArrowItem } from '../ArrowElement/ArrowItem'
import { AppLink } from '../AppLink/AppLink'
import { TransitionLink } from '../TransitionLink/TransitionLink'
import { resolveCaseHeaderSurface } from './headerSurface'

import styles from './Header.module.css'

interface HeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
  isCasePage?: boolean
  canChangeTheme?: boolean
}

export default function Header({
  isMenuOpen,
  onToggleMenu,
  isCasePage = false,
  canChangeTheme = true,
}: HeaderProps) {
  const mainNavItems = useMainNavHeaderItems()
  const { toggleTheme } = useTheme()

  const headerRef = useRef<HTMLElement | null>(null)

  const { caseHeaderMode, isHidden } = useHeaderScrollBehavior({
    isCasePage,
    isMenuOpen,
    headerRef,
  })

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
        styles.header,
        surface === 'caseTransparent' && styles.casesTransparent,
        surface === 'caseFilled' && styles.casesFilled,
        isHidden && styles.hiddenDesktop,
      )}
    >
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
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

        {canChangeTheme ? (
          <button
            type="button"
            className={styles.colorChanger}
            aria-label="Сменить цветовую тему"
            onClick={toggleTheme}
          >
            какой ты сегодня
          </button>
        ) : null}

        <button
          type="button"
          className={clsx(styles.burger, isMenuOpen && styles.burgerActive)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={onToggleMenu}
        >
          <span className={styles.burgerLines} aria-hidden>
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>

        <nav className={styles.nav} aria-label="Главная навигация">
          {mainNavItems.map((item) => (
            <AppLink
              key={item.id}
              to={item.to}
              aria-current={item.isCurrent ? 'page' : undefined}
            >
              <ArrowItem counter={item.counter} variant={item.isCurrent ? 'current' : 'default'}>
                {item.label}
              </ArrowItem>
            </AppLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
