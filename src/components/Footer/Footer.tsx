import { MenuLink } from '../MenuLink/MenuLink'

import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.line}>
          <hr />
          <div className={styles.cat}>
            <img src="/images/cat_03.svg" alt="Кот рыбачит" width={307} height={248} />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.contacts}>
            <MenuLink href="https://t.me/rorrich" className="menu-item--wide">
              telegram
            </MenuLink>
          </div>
          <p className={styles.copyright}>
            ©{year}&nbsp;rorrich
          </p>
        </div>
      </div>
    </footer>
  )
}

