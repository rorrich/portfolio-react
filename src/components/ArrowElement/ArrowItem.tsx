import type { ReactNode } from 'react'
import clsx from 'clsx'

import { ArrowIcon } from './ArrowIcon'
import styles from './ArrowItem.module.css'

export type ArrowItemProps = {
  children: ReactNode
  counter?: string
  className?: string
  /** Визуальный стиль: интерактивный с ховером ('default') или декоративный без анимации ('static') */
  variant?: 'default' | 'static'
  /** Интерактивное состояние: является ли этот пункт меню текущей страницей */
  isCurrent?: boolean
}

/**
 * Пункт навигации "стрелка+текст" с hover/active состояниями.
 */
export function ArrowItem({
  children,
  counter,
  className,
  variant = 'default',
  isCurrent = false,
}: ArrowItemProps) {
  return (
    <span
      className={clsx(
        styles.arrowItem,
        styles[variant], // Подставит styles.default или styles.static
        className,
      )}
      data-current={isCurrent} // Это добавит в HTML data-current="true" или "false"
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
