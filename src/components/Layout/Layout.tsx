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
 * - Header не управляет маршрутом; активные пункты в шапке читает из `useLocation` сам.
 * - `isCasePage` вычисляется из pathname и передаётся только в Header — для прозрачной/светлой
 *   логики кейсов и скрытия переключателя темы. MobileMenu о кейсах не знает (стили через body).
 * - Закрытие меню при навигации: MobileMenu вызывает `onClose` при смене pathname; `handleCloseMenu`
 *   синхронизирует состояние с шапкой.
 */
export function Layout() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isCasePage = isCasePagePath(pathname)

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
      />
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
      <main id="page-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

