import type { ReactNode } from 'react'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface CaseSectionProps {
  backgroundColor?: string
  isDark?: boolean
  children: ReactNode
}

export function CaseSection({ backgroundColor, isDark, children }: CaseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const sectionEl = sectionRef.current
      const targets = Array.from(sectionEl.children) as HTMLElement[]
      if (!targets.length) return

      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 80%',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className={`case-section ${isDark ? 'case-section--dark' : ''}`.trim()}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      {children}
    </section>
  )
}

