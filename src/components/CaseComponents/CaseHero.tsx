import type { ReactNode } from 'react'

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
    <section className="case-hero" style={{ backgroundImage: `url('${backgroundImage}')` }} data-id={title}>
      <div className="case-hero__content">
        <div className="case-hero__main-info">
          <h3 className="case-hero__title">{title}</h3>
          <p className="case-hero__subtitle">{subtitle}</p>
        </div>

        <div className="case-hero__meta">
          {meta.map((item) => (
            <div key={`${item.label}-${String(item.value)}`} className="case-meta-item">
              <span className="case-meta__label">{item.label}</span>
              <span className="case-meta__value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

