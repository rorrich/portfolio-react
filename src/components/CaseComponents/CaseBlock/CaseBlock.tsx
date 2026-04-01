import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './CaseBlock.module.css'

interface CaseBlockProps {
  text?: ReactNode
  images?: ReactNode
  bg?: string
  theme?: 'light' | 'dark'
  className?: string
}

export const CaseBlock = ({ text, images, bg, theme = 'light', className }: CaseBlockProps) => (
  <section
    className={clsx(styles.block, className)}
    style={bg ? { backgroundColor: bg } : undefined}
    data-theme={theme}
  >
    {text}
    {images}
  </section>
)
