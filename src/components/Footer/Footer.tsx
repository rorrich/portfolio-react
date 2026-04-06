import { useMainNavHeaderItems } from '../../hooks/useMainNavHeader'
import { AppLink } from '../AppLink/AppLink'
import { ArrowIcon } from '../ArrowElement/ArrowIcon'
import { ArrowItem } from '../ArrowElement/ArrowItem'

import { FooterPhraseCycle } from './FooterPhraseCycle'
import { FooterBrandMark } from './FooterBrandMark'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()
  const mainNavItems = useMainNavHeaderItems()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerContext}>
          <FooterPhraseCycle className={styles.footerHeading} />
        </div>

        <div className={styles.footerNavigation}>
          <div className={styles.footerContent}>
            <nav className={styles.footerNav} aria-label="Главная навигация">
              {mainNavItems.map((item) => (
                <AppLink
                  key={item.id}
                  to={item.to}
                  aria-current={item.isCurrent ? 'page' : undefined}
                >
                  <ArrowItem counter={item.counter} isCurrent={item.isCurrent}>
                    {item.label}
                  </ArrowItem>
                </AppLink>
              ))}
            </nav>
            <AppLink href="https://t.me/rorrich">
              <ArrowItem className={styles.contactItem}>telegram</ArrowItem>
            </AppLink>
          </div>

          <div className={styles.footerScroll}>
            <button
              type="button"
              className={styles.scrollTop}
              aria-label="Наверх"
              onClick={scrollToTop}
            >
              <ArrowIcon type="up" className={styles.scrollTopIcon} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.footerBrand} aria-hidden="true">
        <FooterBrandMark className={styles.footerBrandSvg} />
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          ©{year}&nbsp;rorrich
        </p>
      </div>
    </footer>
  )
}
