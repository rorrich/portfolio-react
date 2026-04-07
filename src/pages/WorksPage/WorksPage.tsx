import { useMemo, useRef, useState } from 'react'

import { CaseCard } from '../../components/CaseCard/CaseCard'
import { SplitTextReveal } from '../../components/SplitTextReveal/SplitTextReveal'
import { cases } from '../../data/cases'
import { useFadeInReveal } from '../../hooks/useFadeInReveal'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { usePageReady } from '../../hooks/usePageReady'
import { useWorkCardsReveal } from '../../hooks/useWorkCardsReveal'

import styles from './WorksPage.module.css'

type Filter = 'all' | 'sites' | 'apps'

export function WorksPage() {
  usePageReady()
  useDocumentTitle('Проекты')
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const heroImageRevealRef = useRef<HTMLDivElement | null>(null)
  const heroCountRevealRef = useRef<HTMLDivElement | null>(null)
  const tabsButtonsRevealRef = useRef<HTMLDivElement | null>(null)
  const listRevealRef = useRef<HTMLDivElement | null>(null)

  const filteredProjects = useMemo(
    () => cases.filter((p) => activeFilter === 'all' || p.category === activeFilter),
    [activeFilter],
  )

  useFadeInReveal(heroImageRevealRef, 0.35, { axis: 'x', offset: 40, duration: 0.7 })
  useFadeInReveal(heroCountRevealRef, 0.2)
  useFadeInReveal(tabsButtonsRevealRef, 0.25)
  useWorkCardsReveal(listRevealRef, 0, { slotListKey: filteredProjects })

  const countLabel = `[${cases.length}]`

  return (
    <div className={styles.worksPage}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContainer}>
            <div className={styles.heroTop}>
              <div className={styles.heroTitleGroup}>
                <SplitTextReveal
                  text="работы"
                  as="h1"
                  className={styles.heroTitle}
                  stagger={0.084}
                  duration={0.78}
                />
                <div ref={heroCountRevealRef} className={styles.heroCountReveal}>
                  <span className={styles.heroCount}>{countLabel}</span>
                </div>
              </div>
              <div ref={heroImageRevealRef} className={styles.heroImage}>
                <img src="/images/cat_working.svg" alt="Cat working" loading="eager" />
              </div>
            </div>

            <div className={styles.tabs}>
              <div ref={tabsButtonsRevealRef} className={styles.tabsButtons}>
                <button
                  type="button"
                  className={`${styles.tab} ${activeFilter === 'all' ? styles.tabActive : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  <span>Все</span>
                </button>
                <button
                  type="button"
                  className={`${styles.tab} ${activeFilter === 'sites' ? styles.tabActive : ''}`}
                  onClick={() => setActiveFilter('sites')}
                >
                  <span>Сайты</span>
                </button>
                <button
                  type="button"
                  className={`${styles.tab} ${activeFilter === 'apps' ? styles.tabActive : ''}`}
                  onClick={() => setActiveFilter('apps')}
                >
                  <span>Приложения</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.listSection}>
        <div ref={listRevealRef} className={`container ${styles.listContainer}`}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.listRowMask}>
              <div className={styles.listRowInner} data-work-card-reveal-inner="">
                <div className={styles.listRow}>
                  <CaseCard variant="large" project={project} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

