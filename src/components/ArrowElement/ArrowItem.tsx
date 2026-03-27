import type { ReactNode } from 'react'
import clsx from 'clsx'

import { ArrowIcon } from './ArrowIcon'
import styles from './ArrowItem.module.css'

export type ArrowItemProps = {
  children: ReactNode
  counter?: string
  className?: string
  /** Только визуальный режим, не связан с роутером напрямую */
  variant?: 'default' | 'current' | 'emphasized'
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
        styles.item,
        variant === 'current' && styles.itemCurrent,
        variant === 'emphasized' && styles.itemEmphasized,
        className,
      )}
      data-app-link="true"
    >
      <span className={styles.iconWrapper} data-app-link-icon aria-hidden="true">
        <ArrowIcon type="right" className={styles.icon} />
      </span>
      <span>{children}</span>
      {counter && (
        <span className={styles.counter} data-app-link-counter>
          {counter}
        </span>
      )}
    </span>
  )
}
