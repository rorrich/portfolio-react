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
      <span className={styles.elementAnim} aria-hidden="true">
        <svg
          className={styles.elementAnimSvg}
          width="12"
          height="9"
          viewBox="0 0 13 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
      {counter && <span className={styles.counter}>{counter}</span>}
    </>
  )

  const classes = clsx(styles.menuItem, className)

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

