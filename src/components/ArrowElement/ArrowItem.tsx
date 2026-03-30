import type { ReactNode } from 'react'
import clsx from 'clsx'

import { ArrowIcon } from './ArrowIcon'
import styles from './ArrowItem.module.css'

export type ArrowItemProps = {
  children: ReactNode
  counter?: string
  className?: string
  /** Только визуальный режим, не связан с роутером напрямую */
  variant?: 'default' | 'current' | 'static'
}

/**
 * Пункт навигации "текст + стрелка" с hover/active состояниями.
 */
export function ArrowItem({
  children,
  counter,
  className,
  variant = 'default',
}: ArrowItemProps) {
  return (
    <span
      className={clsx(
        styles.arrowItem,
        variant === 'current' && styles.arrowItemCurrent,
        variant === 'static' && styles.arrowItemStatic,
        className,
      )}
    >
      <span className={styles.iconWrapper} aria-hidden="true">
        <ArrowIcon type="right" className={styles.icon} />
      </span>
      <span className={styles.label}>
        <span className={styles.labelBody}>{children}</span>
        {counter ? <span className={styles.counter}>{counter}</span> : null}
      </span>
    </span>
  )
}
