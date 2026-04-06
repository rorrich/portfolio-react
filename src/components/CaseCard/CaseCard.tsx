import clsx from 'clsx'

import { ArrowIcon } from '../ArrowElement/ArrowIcon'
import { TransitionLink } from '../TransitionLink/TransitionLink'

import type { CaseData } from '../../types/case'

import styles from './CaseCard.module.css'

export type CaseCardVariant = 'compact' | 'large'

export interface CaseCardProps {
  variant: CaseCardVariant
  project: CaseData
  /** Доп. класс на корневой ссылке (например для анимаций на странице) */
  className?: string
}

export function CaseCard({ variant, project, className }: CaseCardProps) {
  const {
    id,
    title,
    descriptionShort,
    descriptionFull,
    dateShort,
    industry,
    pageUrl,
    imageSrc,
  } = project

  if (variant === 'compact') {
    return (
      <TransitionLink
        to={pageUrl}
        className={clsx(styles.compactRoot, className)}
        data-id={id}
        data-home-work-card=""
      >
        <div className={styles.compactInner}>
          <div className={styles.compactPicture}>
            <div className={styles.compactPictureParallaxWrap}>
              <img
                className={styles.compactPictureParallaxImg}
                src={imageSrc}
                alt={title}
                loading="lazy"
                decoding="async"
                data-home-card-parallax-img=""
              />
            </div>
          </div>
          <div className={styles.compactDescription}>
            <div className={styles.compactDetails}>
              <span className={styles.compactType}>{descriptionShort}</span>
              <span className={styles.compactYear}>{dateShort}</span>
            </div>
            <div className={styles.compactTitleRow}>
              <h3 className={styles.compactTitle}>{title}</h3>
              <span className={styles.compactTitleArrow} aria-hidden="true">
                <ArrowIcon type="right" className={styles.compactTitleArrowIcon} />
              </span>
            </div>
          </div>
        </div>
      </TransitionLink>
    )
  }

  return (
    <TransitionLink
      to={pageUrl}
      className={clsx(styles.largeRoot, className)}
      data-id={id}
      data-works-row=""
    >
      <div className={styles.largeImageWrap}>
        <img src={imageSrc} alt={title} loading="lazy" decoding="async" />
      </div>
      <div className={styles.largeInfo}>
        <div className={styles.largeHeader}>
          <h2 className={styles.largeTitle}>{title}</h2>
          <p className={clsx(styles.largeSubtitle, styles.largeSubtitleFull)}>{descriptionFull}</p>
          <p className={clsx(styles.largeSubtitle, styles.largeSubtitleShort)}>{descriptionShort}</p>
        </div>
        <div className={styles.largeDetails}>
          <div className={styles.largeMetaGroup}>
            <div className={styles.largeMeta}>
              <span className={styles.largeMetaLabel}>год</span>
              <span className={styles.largeMetaValue}>{dateShort}</span>
            </div>
            <div className={styles.largeMeta}>
              <span className={styles.largeMetaLabel}>индустрия</span>
              <span className={styles.largeMetaValue}>{industry}</span>
            </div>
          </div>
          <div className={styles.largeLinkIcon}>
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/images/sprite.svg#icon-arrow-link" />
            </svg>
          </div>
        </div>
      </div>
    </TransitionLink>
  )
}
