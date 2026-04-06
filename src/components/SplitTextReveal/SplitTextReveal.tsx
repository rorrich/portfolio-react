import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'

import { useEnterAfterTransition } from '../../hooks/useEnterAfterTransition'

import styles from './SplitTextReveal.module.css'

export interface SplitTextRevealProps {
  text: string
  as?: ElementType
  className?: string
  /** Задержка перед стартом (сек), после шторки */
  delay?: number
  /** Сдвиг между строками (сек) */
  stagger?: number
  /** Длительность движения каждой строки (сек) */
  duration?: number
}

export function SplitTextReveal({
  text,
  as: Tag = 'h1',
  className,
  delay = 0,
  stagger = 0.1,
  duration = 0.84,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const lines = text.split('\n')

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const inners = el.querySelectorAll<HTMLElement>(`.${styles.lineInner}`)
    if (inners.length === 0) return

    gsap.set(inners, { yPercent: 100, y: 0 })

    const tl = gsap.timeline({ paused: true, delay })
    tlRef.current = tl

    tl.fromTo(
      inners,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration,
        stagger,
        ease: 'power2.out',
      },
    )

    return () => {
      tl.progress(1)
      tl.kill()
      if (tlRef.current === tl) {
        tlRef.current = null
      }
    }
  }, [text, delay, stagger, duration])

  useEnterAfterTransition(tlRef)

  const lineNodes: ReactNode[] = []

  lines.forEach((line, lineIndex) => {
    const parts = line.split(/\s+/).filter(Boolean)
    lineNodes.push(
      <span key={`line-${lineIndex}`} className={styles.lineWrap}>
        <span className={styles.lineInner}>
          {parts.map((word, wordIndex) => (
            <span key={`w-${lineIndex}-${wordIndex}`} className={styles.word}>
              {word}
            </span>
          ))}
        </span>
      </span>,
    )
    if (lineIndex < lines.length - 1) {
      lineNodes.push(<br key={`br-${lineIndex}`} />)
    }
  })

  const readableLabel = text.replace(/\n/g, ' ').trim()

  return (
    <Tag
      ref={containerRef as never}
      className={clsx(className)}
      aria-label={readableLabel}
    >
      {lineNodes}
    </Tag>
  )
}
