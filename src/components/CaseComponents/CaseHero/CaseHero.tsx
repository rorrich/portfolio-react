import type { ReactNode } from 'react'
import styles from './CaseHero.module.css'

export interface CaseMetaItem {
  label: string
  value: ReactNode
}

interface CaseHeroProps {
  backgroundImage: string
  title: string
  subtitle: string
  meta: CaseMetaItem[]
}

export function CaseHero({ backgroundImage, title, subtitle, meta }: CaseHeroProps) {
  return (
    <section
      className={styles.caseHero}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
      data-id={title}
      data-case-hero
    >
      <div className={styles.caseHeroContent} data-case-hero-content>
        <div className={styles.caseHeroMainInfo}>
          <h3 className={styles.caseHeroTitle}>{title}</h3>
          <p className={styles.caseHeroSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.caseHeroMeta}>
          {meta.map((item) => (
            <div key={item.label} className={styles.caseMetaItem}>
              <span className={styles.caseMetaLabel}>{item.label}</span>
              <div className={styles.caseMetaValue}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
