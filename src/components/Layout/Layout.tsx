import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { MobileMenu } from '../MobileMenu/MobileMenu'

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <Header isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

