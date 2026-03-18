import type { FC } from 'react'
import { Link } from 'react-router-dom'

import type { ProjectData } from '../../types/project'

type WorkCardSize = 'large' | 'medium' | 'small'

export interface HomePageWorkCardStyles {
  workCard: string
  workCardLarge: string
  workCardMedium: string
  workCardSmall: string
  workCardContent: string
  workCardPicture: string
  workCardDescription: string
  workCardDetails: string
  workCardType: string
  workCardYear: string
  workCardTitle: string
}

interface WorkCardProps {
  project: ProjectData
  size: WorkCardSize
  styles: HomePageWorkCardStyles
}

const sizeClassMap = {
  large: 'workCardLarge',
  medium: 'workCardMedium',
  small: 'workCardSmall',
} as const

export const WorkCard: FC<WorkCardProps> = ({ project, size, styles }) => {
  const sizeClass = styles[sizeClassMap[size]]

  return (
    <Link
      to={project.pageUrl}
      className={`${styles.workCard} ${sizeClass}`}
      data-id={project.id}
    >
      <div className={styles.workCardContent}>
        <div className={styles.workCardPicture}>
          <img
            src={project.imageSrc}
            alt={project.title}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.workCardDescription}>
          <div className={styles.workCardDetails}>
            <span className={styles.workCardType}>{project.descriptionShort}</span>
            <span className={styles.workCardYear}>{project.dateShort}</span>
          </div>
          <h3 className={styles.workCardTitle}>{project.title}</h3>
        </div>
      </div>
    </Link>
  )
}
