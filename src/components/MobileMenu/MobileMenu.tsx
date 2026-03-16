import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const TELEGRAM_URL = 'https://t.me/rorrich'

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isClosing, setIsClosing] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useGSAP(
    () => {
      if (!isOpen || !overlayRef.current) return

      const overlay = overlayRef.current
      const links = linkRefs.current.filter(Boolean) as HTMLElement[]

      gsap.set(overlay, { opacity: 0 })
      gsap.set(links, { opacity: 0, y: -24 })

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      tl.to(links, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, '-=0.1')
    },
    { dependencies: [isOpen], scope: overlayRef, revertOnUpdate: true }
  )

  const runCloseAnimation = () => {
    const overlay = overlayRef.current
    const links = linkRefs.current.filter(Boolean) as HTMLElement[]

    if (!overlay) {
      onClose()
      return
    }

    setIsClosing(true)
    const tl = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: () => {
        onClose()
        setIsClosing(false)
      },
    })
    tl.to(links, { opacity: 0, y: -16, duration: 0.2, stagger: 0.04 })
    tl.to(overlay, { opacity: 0, duration: 0.2 }, '-=0.2')
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

  const handleLinkClick = () => {
    runCloseAnimation()
  }

  if (!isOpen && !isClosing) return null

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-label="Меню"
      aria-modal="true"
    >
      <div className={styles.wrapper}>
        <nav className={styles.links} aria-label="Навигация">
          <Link
            ref={(el) => { linkRefs.current[0] = el }}
            to="/"
            className={styles.link}
            onClick={handleLinkClick}
          >
            главная
          </Link>
          <Link
            ref={(el) => { linkRefs.current[1] = el }}
            to="/about"
            className={styles.link}
            onClick={handleLinkClick}
          >
            who я
          </Link>
          <Link
            ref={(el) => { linkRefs.current[2] = el }}
            to="/works"
            className={styles.link}
            onClick={handleLinkClick}
          >
            работы<span className={styles.number}>[3]</span>
          </Link>
        </nav>
        <div className={styles.contacts}>
          <a
            ref={(el) => { linkRefs.current[3] = el }}
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contact}
            onClick={handleLinkClick}
          >
            telegram
          </a>
        </div>
      </div>
    </div>
  )
}
