import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Header from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { MobileMenu } from '../MobileMenu/MobileMenu'

export function Layout() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isCasePage =
    pathname.startsWith('/works/roast') ||
    pathname.startsWith('/works/dr-coffee') ||
    pathname.startsWith('/works/cleanner')

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
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

