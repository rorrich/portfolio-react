import { useState, useRef } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import styles from './FooterPhraseCycle.module.css'

/** Тексты в футере (две строки — через \\n). Последняя без запятой после «меня». */
const PHRASES = [
  'Make it exist first,\nmake it good later',
  'Design with empathy,\nbuild with logic',
  'Complex logic,\nsimple interfaces',
  'Возьмите меня\nна работу уже (」°ロ°)」',
] as const satisfies readonly string[]

const WORD_SEL = '[data-footer-word]'
const LINE_ROW_SEL = '[data-footer-line-row]'

const WORD_STAGGER = 0.06
const WORD_DURATION = 0.48
const HOLD_DURATION = 2
/** На ~40% быстрее, чем 0.5 с */
const EXIT_DURATION = 0.3

function splitLineToWords(line: string): string[] {
  return line.trim().split(/\s+/).filter(Boolean)
}

type FooterPhraseCycleProps = {
  className?: string
}

/**
 * Футер: после входа блока в вьюпорт — слова по очереди (stagger), пауза 2 с,
 * обе строки одновременно уезжают вниз, следующая фраза.
 */
export function FooterPhraseCycle({ className }: FooterPhraseCycleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [scrollArmed, setScrollArmed] = useState(false)

  useGSAP(
    () => {
      const root = containerRef.current
      if (!root) return

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 88%',
        once: true,
        onEnter: () => setScrollArmed(true),
      })

      return () => st.kill()
    },
    { scope: containerRef },
  )

  useGSAP(
    () => {
      if (!scrollArmed) return

      const root = containerRef.current
      if (!root) return

      const words = root.querySelectorAll<HTMLElement>(WORD_SEL)
      const lineRows = root.querySelectorAll<HTMLElement>(LINE_ROW_SEL)
      if (words.length === 0 || lineRows.length === 0) return

      gsap.set(words, { yPercent: 100, y: 0 })
      gsap.set(lineRows, { yPercent: 0, y: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          setPhraseIndex((i) => (i + 1) % PHRASES.length)
        },
      })

      tl.fromTo(
        words,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: WORD_DURATION,
          stagger: WORD_STAGGER,
          ease: 'power2.out',
        },
      )
      tl.to({}, { duration: HOLD_DURATION })
      tl.to(lineRows, {
        yPercent: 100,
        duration: EXIT_DURATION,
        stagger: 0,
        ease: 'power2.in',
      })

      return () => {
        tl.kill()
      }
    },
    {
      scope: containerRef,
      dependencies: [phraseIndex, scrollArmed],
      revertOnUpdate: true,
    },
  )

  const lineTexts = PHRASES[phraseIndex].split('\n').map((l) => l.trim())
  const ariaLabel = PHRASES.join('. ').replace(/\n/g, ' ')

  return (
    <div
      ref={containerRef}
      className={clsx(styles.taglineRoot, className)}
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {lineTexts.map((lineText, lineIdx) => {
        const words = splitLineToWords(lineText)
        return (
          <div key={`${phraseIndex}-line-${lineIdx}`} className={styles.line}>
            <div className={styles.lineRow} data-footer-line-row="">
              {words.map((word, wIdx) => (
                <span
                  key={`${phraseIndex}-${lineIdx}-w-${wIdx}`}
                  className={styles.wordMask}
                >
                  <span className={styles.wordInner} data-footer-word="">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
