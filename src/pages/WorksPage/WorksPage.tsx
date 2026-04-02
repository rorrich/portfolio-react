import { useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { CaseCard } from '../../components/CaseCard/CaseCard'
import { cases } from '../../data/cases'
import { usePageReady } from '../../hooks/usePageReady'
import { useEnterAfterTransition } from '../../hooks/useEnterAfterTransition'

import styles from './WorksPage.module.css'

type Filter = 'all' | 'sites' | 'apps'

export function WorksPage() {
  usePageReady()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const heroRef = useRef<HTMLElement | null>(null)
  const heroTlRef = useRef<gsap.core.Timeline | null>(null)

  const filteredProjects = useMemo(
    () => cases.filter((p) => activeFilter === 'all' || p.category === activeFilter),
    [activeFilter],
  )

  useGSAP(
    () => {
      if (!heroRef.current) return

      const tl = gsap.timeline({ paused: true })
      heroTlRef.current = tl

      const titleEl = heroRef.current.querySelector(`.${styles.heroTitleGroup} h1`)
      const imageEl = heroRef.current.querySelector(`.${styles.heroImage}`)
      const tabsEl = heroRef.current.querySelector(`.${styles.tabs}`)

      if (titleEl) {
        tl.from(titleEl, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
      if (imageEl) {
        tl.from(
          imageEl,
          {
            opacity: 0,
            x: 24,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3',
        )
      }
      if (tabsEl) {
        tl.from(
          tabsEl,
          {
            opacity: 0,
            y: 16,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2',
        )
      }
    },
    { scope: heroRef },
  )

  useEnterAfterTransition(heroTlRef)

  const countLabel = `[${cases.length}]`

  return (
    <div className={styles.worksPage}>
      <section ref={heroRef} className={styles.hero}>
        <div className="container">
          <div className={styles.heroContainer}>
            <div className={styles.heroTop}>
              <div className={styles.heroTitleGroup}>
                <h1 className={styles.heroTitle}>работы</h1>
                <span className={styles.heroCount}>{countLabel}</span>
              </div>
              <div className={styles.heroImage}>
                <img src="/images/cat_working.svg" alt="Cat working" loading="eager" />
              </div>
            </div>

            <div className={styles.tabs}>
              <div className={styles.tabsButtons}>
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
        <div className={`container ${styles.listContainer}`}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.listRow}>
              <CaseCard variant="large" project={project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

