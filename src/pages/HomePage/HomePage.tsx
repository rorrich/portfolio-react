import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { MenuLink } from '../../components/MenuLink/MenuLink'
import { SkillsMarquee } from '../../components/SkillsMarquee/SkillsMarquee'
import { Typewriter } from '../../components/Typewriter/Typewriter'
import { WorkCard } from '../../components/WorkCard/WorkCard'
import { projects } from '../../data/projects'
import { usePageReady } from '../../hooks/usePageReady'

import styles from './HomePage.module.css'

gsap.registerPlugin(ScrollTrigger)

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

      const cards = worksRef.current.querySelectorAll(`.${styles.workCard}`)

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

  const roast = projects.find((p) => p.id === 'roast')
  const drCoffee = projects.find((p) => p.id === 'dr_coffee')
  const cleanner = projects.find((p) => p.id === 'cleanner')

  if (!roast || !drCoffee || !cleanner) return null

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
                    <svg
                      width="57"
                      height="42"
                      viewBox="0 0 13 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="/images/sprite.svg#icon-arrow-right" />
                    </svg>
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
              <MenuLink href="https://t.me/rorrich">telegram</MenuLink>
            </div>
            <div className={styles.heroDescription}>
              <p className={styles.aboutText}>
                Привет! Меня зовут Алина, я UI/UX-дизайнер.
              </p>
              <p className={styles.aboutText}>
                Я проектирую сайты и приложения, ценю продуманные интерфейсы и внимание к деталям.
                Этот сайт собрала с помощью нейросетей — мой небольшой эксперимент. Параллельно
                изучаю айдентику, иллюстрацию и верстку.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SkillsMarquee styles={styles} />

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
            <WorkCard project={roast} size="large" styles={styles} />
            <WorkCard project={drCoffee} size="medium" styles={styles} />
            <WorkCard project={cleanner} size="small" styles={styles} />
          </div>
        </div>
      </section>
    </>
  )
}
