import { useLayoutEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { useEnterAfterTransition } from '../../hooks/useEnterAfterTransition'

import styles from './HomeHeroHeadline.module.css'

const LINE1 = 'просто делаю'
const LINE2_VARIANTS = ['сайты', 'мобилки', 'приложения'] as const

/** Как hero «работы»: SplitTextReveal stagger / duration */
const WORD_STAGGER = 0.084
const WORD_DURATION = 0.78
const HOLD_DURATION = 2
const EXIT_DURATION = 0.3

function splitLineToWords(line: string): string[] {
  return line.trim().split(/\s+/).filter(Boolean)
}

type HomeHeroHeadlineProps = {
  className?: string
}

/**
 * Hero: слова как в футере (маски + yPercent), старт синхронизирован со шторкой
 * через паузу таймлайна и `useEnterAfterTransition` (как `SplitTextReveal` на других страницах).
 * Первая строка фиксирована; вторая циклически меняется — только она уезжает вниз.
 */
export function HomeHeroHeadline({ className }: HomeHeroHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null)
  const introTlRef = useRef<gsap.core.Timeline | null>(null)
  const [line2Index, setLine2Index] = useState(0)
  const initialIntroDoneRef = useRef(false)

  const line1Words = splitLineToWords(LINE1)
  const line2Text = LINE2_VARIANTS[line2Index]
  const line2Words = splitLineToWords(line2Text)

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const line1Els = root.querySelectorAll<HTMLElement>('[data-hero-words="1"] [data-hero-word]')
    const line2Row = root.querySelector<HTMLElement>('[data-hero-line-row][data-hero-words="2"]')
    const line2Els = root.querySelectorAll<HTMLElement>('[data-hero-words="2"] [data-hero-word]')
    if (!line2Row || line1Els.length === 0 || line2Els.length === 0) return

    gsap.set([...line1Els, ...line2Els], { yPercent: 100, y: 0 })
    gsap.set(line2Row, { yPercent: 0, y: 0 })

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        initialIntroDoneRef.current = true
        setLine2Index((i) => (i + 1) % LINE2_VARIANTS.length)
      },
    })

    tl.fromTo(
      [...line1Els, ...line2Els],
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: WORD_DURATION,
        stagger: WORD_STAGGER,
        ease: 'power2.out',
      },
    )
    tl.to({}, { duration: HOLD_DURATION })
    tl.to(line2Row, { yPercent: 100, duration: EXIT_DURATION, ease: 'power2.in' })

    introTlRef.current = tl

    return () => {
      tl.kill()
      introTlRef.current = null
    }
  }, [])

  useEnterAfterTransition(introTlRef)

  useGSAP(
    () => {
      if (!initialIntroDoneRef.current) return

      const root = containerRef.current
      if (!root) return

      const line2Row = root.querySelector<HTMLElement>('[data-hero-line-row][data-hero-words="2"]')
      const line2Els = root.querySelectorAll<HTMLElement>('[data-hero-words="2"] [data-hero-word]')
      if (!line2Row || line2Els.length === 0) return

      gsap.set(line2Els, { yPercent: 100, y: 0 })
      gsap.set(line2Row, { yPercent: 0, y: 0 })

      const tl = gsap.timeline({
        onComplete: () => setLine2Index((i) => (i + 1) % LINE2_VARIANTS.length),
      })

      tl.fromTo(
        line2Els,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: WORD_DURATION,
          stagger: WORD_STAGGER,
          ease: 'power2.out',
        },
      )
      tl.to({}, { duration: HOLD_DURATION })
      tl.to(line2Row, { yPercent: 100, duration: EXIT_DURATION, ease: 'power2.in' })

      return () => {
        tl.kill()
      }
    },
    {
      scope: containerRef,
      dependencies: [line2Index],
      revertOnUpdate: true,
    },
  )

  return (
    <h1 ref={containerRef} className={clsx(styles.root, className)}>
      <div className={styles.line}>
        <div className={styles.lineRow} data-hero-words="1">
          {line1Words.map((word, wIdx) => (
            <span
              key={`l1-${wIdx}-${word}`}
              className={clsx(styles.wordMask, word === 'просто' && styles.line1WordHideMobile)}
            >
              <span className={styles.wordInner} data-hero-word="">
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className={styles.line} key={`l2-${line2Index}`}>
        <div className={styles.lineRow} data-hero-line-row="" data-hero-words="2">
          {line2Words.map((word, wIdx) => (
            <span key={`${line2Index}-${line2Text}-${wIdx}`} className={styles.wordMask}>
              <span className={styles.wordInner} data-hero-word="">
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>
    </h1>
  )
}
