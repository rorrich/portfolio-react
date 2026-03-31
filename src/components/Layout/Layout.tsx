import { useCallback, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { isCasePagePath } from '../../constants/caseRoutes'
import Header from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { MobileMenu } from '../MobileMenu/MobileMenu'

/**
 * Корневой layout приложения.
 *
 * Контракт шапки и мобильного меню:
 * - `isMenuOpen` живёт здесь: один источник правды для Header (бургер) и MobileMenu (оверлей).
 * - Активные разделы навигации: конфиг `src/navigation/mainNav.ts` и `useLocation` в хуке/меню.
 * - `isCasePage` из pathname: Header (casesTransparent / casesFilled) и MobileMenu (`overlayCase`).
 * - `canChangeTheme` также вычисляется тут: на кейс-страницах переключатель темы отключён.
 * - Закрытие меню при навигации: MobileMenu вызывает `onClose` при смене pathname; `handleCloseMenu`
 *   синхронизирует состояние с шапкой.
 */
export function Layout() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isCasePage = isCasePagePath(pathname)
  const canChangeTheme = !isCasePage

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleToggleMenu}
        isCasePage={isCasePage}
        canChangeTheme={canChangeTheme}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} isCasePage={isCasePage} />
      <main id="page-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

