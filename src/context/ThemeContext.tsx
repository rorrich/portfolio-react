import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { isCasePagePath } from '../constants/caseRoutes'

type UserTheme = 'light' | 'dark' | 'blue' | 'green' | 'soft'
type Theme = UserTheme | 'static'

const USER_THEMES: UserTheme[] = ['light', 'dark', 'blue', 'green', 'soft']
const THEME_STORAGE_KEY = 'portfolio-theme'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  isWorkPage: boolean
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return

  const { body } = document
  requestAnimationFrame(() => {
    if (theme === 'light') {
      body.removeAttribute('data-theme')
    } else {
      body.setAttribute('data-theme', theme)
    }
  })
}

function saveTheme(theme: UserTheme): void {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore storage errors
  }
}

function loadTheme(isWorkPage: boolean): UserTheme {
  if (isWorkPage || typeof window === 'undefined') {
    return 'light'
  }

  try {
    const saved = window.sessionStorage.getItem(THEME_STORAGE_KEY) as UserTheme | null
    if (saved && USER_THEMES.includes(saved)) {
      return saved
    }
  } catch {
    // ignore
  }
  return 'light'
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { pathname } = useLocation()
  const isWorkPage = isCasePagePath(pathname)

  const [theme, setTheme] = useState<UserTheme>(() => loadTheme(isCasePagePath(pathname)))

  // Применяем тему к body при монтировании и изменении
  useLayoutEffect(() => {
    if (isWorkPage) {
      applyTheme('static')
      return
    }
    applyTheme(theme)
  }, [theme, isWorkPage])

  const toggleTheme = useCallback(() => {
    if (isCasePagePath(pathname)) {
      return
    }

    setTheme((prev) => {
      const currentIndex = USER_THEMES.indexOf(prev)
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % USER_THEMES.length : 0
      const nextTheme = USER_THEMES[nextIndex]

      saveTheme(nextTheme)

      return nextTheme
    })
  }, [pathname])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      isWorkPage,
    }),
    [theme, toggleTheme, isWorkPage],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return ctx
}

