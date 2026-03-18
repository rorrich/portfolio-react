import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import type { ProjectData } from '../../types/project'

import styles from './WorksItem.module.css'

interface WorksItemProps {
  project: ProjectData
}

export const WorksItem: FC<WorksItemProps> = ({ project }) => {
  return (
    <motion.div
      className={styles.worksItemWrapper}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={project.pageUrl} className={styles.worksItem}>
        <div className={styles.imageContainer}>
          <img src={project.imageSrc} alt={project.title} loading="lazy" decoding="async" />
        </div>
        <div className={styles.info}>
          <div className={styles.header}>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={`${styles.subtitle} ${styles.subtitleFull}`}>{project.descriptionFull}</p>
            <p className={`${styles.subtitle} ${styles.subtitleShort}`}>{project.descriptionShort}</p>
          </div>
          <div className={styles.details}>
            <div className={styles.metaGroup}>
              <div className={styles.meta}>
                <span className={styles.metaLabel}>год</span>
                <span className={styles.metaValue}>{project.dateShort}</span>
              </div>
              <div className={styles.meta}>
                <span className={styles.metaLabel}>индустрия</span>
                <span className={styles.metaValue}>{project.industry}</span>
              </div>
            </div>
            <div className={styles.linkIcon}>
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
      </Link>
    </motion.div>
  )
}

