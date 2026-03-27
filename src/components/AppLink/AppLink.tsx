import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { TransitionLink, type TransitionLinkProps } from '../TransitionLink/TransitionLink'

type Shared = {
  children: ReactNode
  className?: string
}

export type AppLinkExternalProps = Shared & {
  href: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>

export type AppLinkInternalProps = Shared & {
  to: string
} & Omit<TransitionLinkProps, 'to' | 'children' | 'className'>

export type AppLinkProps = AppLinkExternalProps | AppLinkInternalProps

export function AppLink(props: AppLinkProps) {
  if ('href' in props) {
    const { href, children, className, ...anchorRest } = props
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorRest}
      >
        {children}
      </a>
    )
  }

  if ('to' in props) {
    const { to, children, className, ...linkRest } = props
    return (
      <TransitionLink to={to} className={className} {...linkRest}>
        {children}
      </TransitionLink>
    )
  }
}
