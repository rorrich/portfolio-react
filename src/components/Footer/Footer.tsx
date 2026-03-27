import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ArrowItem } from '../ArrowElement/ArrowItem'
import { AppLink } from '../AppLink/AppLink'

import styles from './Footer.module.css'

export function Footer() {
  const { pathname } = useLocation()
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement | null>(null)
  const [footerBg, setFooterBg] = useState<string>('')

  useEffect(() => {
    const footerEl = footerRef.current
    if (!footerEl) return

    // На обычных страницах оставляем текущую тему/фон как есть.
    if (!pathname.startsWith('/works/')) {
      setFooterBg('')
      return
    }

    const isTransparent = (value: string) =>
      value === 'transparent' || value === 'rgba(0, 0, 0, 0)'

    const resolveBackground = () => {
      const mainEl = footerEl.previousElementSibling as HTMLElement | null
      if (!mainEl) {
        setFooterBg('')
        return
      }

      const lastContentBlock = mainEl.lastElementChild as HTMLElement | null
      const candidates = [lastContentBlock, mainEl].filter(Boolean) as HTMLElement[]

      for (const candidate of candidates) {
        const bg = window.getComputedStyle(candidate).backgroundColor
        if (!isTransparent(bg)) {
          setFooterBg(bg)
          return
        }
      }

      setFooterBg('')
    }

    resolveBackground()
    window.addEventListener('resize', resolveBackground)
    return () => window.removeEventListener('resize', resolveBackground)
  }, [pathname])

  return (
    <footer
      ref={footerRef}
      className={styles.footer}
      style={footerBg ? { backgroundColor: footerBg } : undefined}
    >
      <div className={styles.line}>
        <hr />
        <div className={styles.lineInner}>
          <div className={styles.cat}>
            <img src="/images/cat_03.svg" alt="Кот рыбачит" width={307} height={248} />
          </div>
        </div>
      </div>
      <div className={`container ${styles.container}`}>
        <div className={styles.info}>
          <div className={styles.contacts}>
            <AppLink href="https://t.me/rorrich">
              <ArrowItem className={styles.contactItem}>telegram</ArrowItem>
            </AppLink>
          </div>
          <p className={styles.copyright}>
            ©{year}&nbsp;rorrich
          </p>
        </div>
      </div>
    </footer>
  )
}

