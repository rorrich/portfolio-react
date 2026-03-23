import { useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { AnimatePresence } from 'framer-motion'

import { projects } from '../../data/projects'
import { WorksItem } from '../../components/WorksItem/WorksItem'
import { usePageReady } from '../../hooks/usePageReady'

import styles from './WorksPage.module.css'

gsap.registerPlugin(useGSAP)

type Filter = 'all' | 'sites' | 'apps'

export function WorksPage() {
  usePageReady()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const filteredProjects = useMemo(
    () => projects.filter((p) => activeFilter === 'all' || p.category === activeFilter),
    [activeFilter],
  )

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(`.${styles.heroTitleGroup} h1`, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
    })
      .from(
        `.${styles.heroImage}`,
        {
          opacity: 0,
          x: 24,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3',
      )
      .from(
        `.${styles.tabs}`,
        {
          opacity: 0,
          y: 16,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.2',
      )
  }, [])

  const countLabel = `[${projects.length}]`

  return (
    <div className={styles.worksPage}>
      <section className={styles.hero}>
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
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <WorksItem
                key={project.id}
                project={project}
                isLast={index === filteredProjects.length - 1}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

