import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark' | 'blue' | 'green' | 'soft'

const THEMES: Theme[] = ['light', 'dark', 'blue', 'green', 'soft']
const THEME_STORAGE_KEY = 'portfolio-theme'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  isWorkPage: boolean
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function isWorkPagePath(pathname: string): boolean {
  // Страницы кейсов: тема всегда light
  const workPaths = ['/works/roast', '/works/dr-coffee', '/works/cleanner']
  return workPaths.some((base) => pathname.startsWith(base))
}

function getRouteFromHash(): string {
  // HashRouter: путь лежит в location.hash как "#/roast"
  if (typeof window === 'undefined') return ''
  const raw = window.location.hash ?? ''
  return raw.replace(/^#/, '')
}

function isWorkPageNow(): boolean {
  return isWorkPagePath(getRouteFromHash())
}

function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return

  const { body } = document
  if (theme === 'light') {
    body.removeAttribute('data-theme')
  } else {
    body.setAttribute('data-theme', theme)
  }
}

function saveTheme(theme: Theme): void {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore storage errors
  }
}

function loadTheme(isWorkPage: boolean): Theme {
  if (isWorkPage || typeof window === 'undefined') {
    return 'light'
  }

  try {
    const saved = window.sessionStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    if (saved && THEMES.includes(saved)) {
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
  const initialIsWorkPage = useMemo(() => {
    const route = getRouteFromHash()
    return isWorkPagePath(route)
  }, [])

  const [isWorkPage, setIsWorkPage] = useState<boolean>(initialIsWorkPage)
  const [theme, setTheme] = useState<Theme>(() => loadTheme(initialIsWorkPage))

  // Применяем тему к body при монтировании и изменении
  useEffect(() => {
    if (isWorkPage) {
      applyTheme('light')
      return
    }
    applyTheme(theme)
  }, [theme, isWorkPage])

  // Обновляем isWorkPage при смене hash-роута, чтобы кейсы всегда получали light-тему,
  // независимо от того, какая тема была выбрана на главной/работах ранее.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => setIsWorkPage(isWorkPageNow())

    update()

    let lastHash = window.location.hash
    const intervalId = window.setInterval(() => {
      if (window.location.hash !== lastHash) {
        lastHash = window.location.hash
        update()
      }
    }, 250)

    window.addEventListener('hashchange', update)
    window.addEventListener('popstate', update)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('hashchange', update)
      window.removeEventListener('popstate', update)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    // Используем текущее значение маршрута на момент клика,
    // чтобы не зависеть от возможной несинхронизации isWorkPage.
    if (isWorkPageNow()) {
      return
    }

    if (typeof document === 'undefined') return

    const { body } = document
    // Отключаем анимации на время смены темы
    body.classList.add('no-transition')

    setTheme((prev) => {
      const currentIndex = THEMES.indexOf(prev)
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % THEMES.length : 0
      const nextTheme = THEMES[nextIndex]

      applyTheme(nextTheme)
      saveTheme(nextTheme)

      // Включаем анимации обратно после двух кадров
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          body.classList.remove('no-transition')
        })
      })

      return nextTheme
    })
  }, [isWorkPage])

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

