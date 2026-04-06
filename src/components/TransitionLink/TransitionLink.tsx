import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'

import { usePageTransition } from '../../context/PageTransitionContext'

export type TransitionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick'
> & {
  to: string
  children?: ReactNode
  /** Вызывается перед navigate (например, закрыть мобильное меню) */
  onBeforeNavigate?: () => void
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink(
    { to, className, style, children, onBeforeNavigate, onClick, ...rest },
    ref,
  ) {
    const { takeSnapshotAndNavigate } = usePageTransition()
    const path = to.startsWith('/') ? to : `/${to}`
    const href = path

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey) {
        return
      }
      e.preventDefault()
      onClick?.(e)
      onBeforeNavigate?.()
      takeSnapshotAndNavigate(path)
    }

    return (
      <a
        ref={ref}
        href={href}
        className={className}
        style={style}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    )
  },
)
