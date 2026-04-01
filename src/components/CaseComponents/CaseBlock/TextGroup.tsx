import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './TextGroup.module.css'

interface TextGroupProps {
  label: string
  // Expected JSX with <p> nodes for paragraph spacing rules in .description > p
  description: ReactNode
  layout?: 'row' | 'column'
  className?: string
}

export const TextGroup = ({ label, description, layout = 'row', className }: TextGroupProps) => (
  <div className={clsx(styles.textGroup, styles[layout], className)}>
    <span className={styles.label}>{label}</span>
    <div className={styles.description}>{description}</div>
  </div>
)
