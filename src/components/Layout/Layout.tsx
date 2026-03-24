import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { isCasePagePath } from '../../constants/caseRoutes'
import Header from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { MobileMenu } from '../MobileMenu/MobileMenu'

export function Layout() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isCasePage = isCasePagePath(pathname)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleToggleMenu}
        isTransparentStart={isCasePage}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
      <main id="page-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

