import { useMemo, useRef } from 'react'

import { AppLink } from '../../components/AppLink/AppLink'
import { SkillsMarquee } from '../../components/SkillsMarquee/SkillsMarquee'
import { CaseCard } from '../../components/CaseCard/CaseCard'
import { HomeHeroHeadline } from '../../components/HomeHeroHeadline/HomeHeroHeadline'
import { cases, getHomePreviewCases } from '../../data/cases'
import { useCardImageParallaxReveal } from '../../hooks/useCardImageParallaxReveal'
import { useFadeInReveal } from '../../hooks/useFadeInReveal'
import { usePageReady } from '../../hooks/usePageReady'
import { useWorkCardsReveal } from '../../hooks/useWorkCardsReveal'
import { ArrowItem } from '../../components/ArrowElement/ArrowItem'

import styles from './HomePage.module.css'

export function HomePage() {
  usePageReady()
  const homeWorksGridRevealRef = useRef<HTMLDivElement | null>(null)
  const heroCatRevealRef = useRef<HTMLDivElement | null>(null)
  const heroBottomRevealRef = useRef<HTMLDivElement | null>(null)

  useFadeInReveal(heroCatRevealRef, 0.35, { axis: 'x', offset: 40, duration: 0.7 })
  useFadeInReveal(heroBottomRevealRef, 0.35)
  useWorkCardsReveal(homeWorksGridRevealRef)

  const homePreviewCases = useMemo(() => getHomePreviewCases(cases), [cases])

  useCardImageParallaxReveal(homeWorksGridRevealRef, [homePreviewCases])

  const homeGridSlots = [styles.worksGridSlot1, styles.worksGridSlot2, styles.worksGridSlot3]

  return (
    <>
      <section className={styles.mainHero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.titleGroup}>
              <HomeHeroHeadline />
            </div>
            <div ref={heroCatRevealRef} className={styles.heroCat}>
              <img
                src="/images/cat_02.svg"
                alt="Кот с удочкой"
                width={307}
                height={248}
                loading="eager"
              />
            </div>
          </div>

          <div ref={heroBottomRevealRef} className={styles.heroBottom}>
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

      <section className={styles.worksSection}>
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

          <div ref={homeWorksGridRevealRef} className={styles.worksGrid}>
            {homePreviewCases.map((item, index) => (
              <div
                key={item.id}
                className={`${homeGridSlots[index]} ${styles.worksGridSlotMask}`}
                data-home-work-card-slot=""
              >
                <div
                  className={styles.worksGridCardInner}
                  data-work-card-reveal-inner=""
                >
                  <CaseCard variant="compact" project={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
