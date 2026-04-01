import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { AppLink } from '../../components/AppLink/AppLink'
import { SkillsMarquee } from '../../components/SkillsMarquee/SkillsMarquee'
import { Typewriter } from '../../components/Typewriter/Typewriter'
import { CaseCard } from '../../components/CaseCard/CaseCard'
import { cases, getHomePreviewCases } from '../../data/cases'
import { usePageReady } from '../../hooks/usePageReady'
import { ArrowIcon } from '../../components/ArrowElement/ArrowIcon'
import { ArrowItem } from '../../components/ArrowElement/ArrowItem'

import styles from './HomePage.module.css'

export function HomePage() {
  usePageReady()
  const heroRef = useRef<HTMLElement | null>(null)
  const worksRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!heroRef.current) return

      const tl = gsap.timeline()

      const titleEl = heroRef.current.querySelector(`.${styles.titleGroup} h1`)
      const typingEl = heroRef.current.querySelector(`.${styles.heroTypingWrapper}`)
      const arrowEl = heroRef.current.querySelector(`.${styles.heroArrow}`)
      const catEl = heroRef.current.querySelector(`.${styles.heroCat}`)
      const descEl = heroRef.current.querySelector(`.${styles.heroDescription}`)

      if (titleEl) {
        tl.from(titleEl, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
      if (typingEl && arrowEl) {
        tl.from(
          [typingEl, arrowEl],
          {
            opacity: 0,
            y: 8,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.3',
        )
      }
      if (catEl) {
        tl.from(
          catEl,
          {
            opacity: 0,
            x: 32,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2',
        )
      }
      if (descEl) {
        tl.from(
          descEl,
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2',
        )
      }
    },
    { scope: heroRef },
  )

  useGSAP(
    () => {
      if (!worksRef.current) return

      const cards = worksRef.current.querySelectorAll('[data-home-work-card]')

      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: worksRef.current,
          start: 'top 80%',
        },
      })
    },
    { scope: worksRef },
  )

  const homePreviewCases = useMemo(() => getHomePreviewCases(cases), [cases])

  const homeGridSlots = [styles.worksGridSlot1, styles.worksGridSlot2, styles.worksGridSlot3]

  return (
    <>
      <section ref={heroRef} className={styles.mainHero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.titleGroup}>
              <h1>просто делаю</h1>
              <div className={styles.heroTypingWrapper}>
                <div className={styles.heroArrowWrapper}>
                  <div className={styles.heroArrow}>
                    <ArrowIcon type="right" />
                  </div>
                </div>
                <Typewriter
                  words={['сайты', 'мобилки']}
                  wrapperClassName={styles.heroTyping}
                  cursorClassName={styles.cursor}
                  cursorNoBlinkClassName={styles.noBlink}
                />
              </div>
            </div>
            <div className={styles.heroCat}>
              <img
                src="/images/cat_02.svg"
                alt="Кот с удочкой"
                width={307}
                height={248}
                loading="eager"
              />
            </div>
          </div>

          <div className={styles.heroBottom}>
            <div className={styles.contacts}>
              <AppLink href="https://t.me/rorrich">
                <ArrowItem className={styles.contactItem}>telegram</ArrowItem>
              </AppLink>
            </div>
            <div className={styles.heroDescription}>
              <p className={styles.aboutText}>
                Привет! Меня зовут Алина, я UX/UI-дизайнер.
              </p>
              <p className={styles.aboutText}>
                Проектирую сайты и приложения, ценю продуманные интерфейсы и внимание к{'\u00A0'}деталям.
                А ещё практикую вайб-кодинг и{'\u00A0'}изучаю фронтенд.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SkillsMarquee />

      <section ref={worksRef} className={styles.worksSection}>
        <div className={styles.worksContainer}>
          <div className={styles.worksTitle}>
            <div className={`${styles.worksTitleShortDesc} ${styles.worksTitleShortDescLeft}`}>
              <span>пока</span>
              <span>немного</span>
            </div>
            <h2>работы</h2>
            <div className={`${styles.worksTitleShortDesc} ${styles.worksTitleShortDescRight}`}>
              <span>но</span>
              <span>будет много</span>
            </div>
          </div>

          <div className={styles.worksGrid}>
            {homePreviewCases.map((item, index) => (
              <div key={item.id} className={homeGridSlots[index]}>
                <CaseCard variant="compact" project={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
