import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import styles from './MenuLink.module.css'

type MenuLinkProps = {
  children: ReactNode
  to?: string
  href?: string
  className?: string
  counter?: string
}

export function MenuLink({ children, to, href, className, counter }: MenuLinkProps) {
  const content = (
    <>
      <span className={`element-anim ${styles.elementAnim}`} aria-hidden="true">
        <svg
          className={styles.elementAnimSvg}
          width="12"
          height="9"
          viewBox="0 0 13 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
        >
          <use href="/images/sprite.svg#icon-arrow-right" />
        </svg>
      </span>
      <span>{children}</span>
      {counter && <span className={`menu-item__number ${styles.counter}`}>{counter}</span>}
    </>
  )

  const classes = clsx('menu-item', styles.menuItem, className)

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link className={classes} to={to}>
        {content}
      </Link>
    )
  }

  return <button type="button" className={classes}>{content}</button>
}

