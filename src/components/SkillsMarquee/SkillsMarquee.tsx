import type { FC } from 'react'
import { ArrowIcon } from '../ArrowElement/ArrowIcon'
import styles from './SkillsMarquee.module.css'

const skills = [
  'UX/UI',
  'CJM',
  'User Flows',
  'Wireframes',
  'Prototype',
  'Variables',
  'Miro',
  'Figma',
  'Photoshop',
  'Illustrator',
  'Procreate',
  'Lottie',
  'ChatGPT',
  'Stable Diffusion',
]

export const SkillsMarquee: FC = () => {
  const renderRow = (keyPrefix: string) =>
    skills.flatMap((skill, index) => [
      <div key={`${keyPrefix}-arrow-${index}`} className={styles.skillArrow}>
        <ArrowIcon type="up" className={styles.skillArrowIcon} />
      </div>,
      <div key={`${keyPrefix}-tag-${index}`} className={styles.skillTag}>
        {skill}
      </div>,
    ])

  return (
    <section className={styles.skillsAnimation}>
      <div className={styles.skillsContainer}>
        <div className={`${styles.skillsTrack} ${styles.skillsTrackLeft}`}>
          <div className={styles.marqueeInner}>
            <div className={styles.marqueeGroup}>{renderRow('left-1')}</div>
            <div className={styles.marqueeGroup} aria-hidden="true">
              {renderRow('left-2')}
            </div>
          </div>
        </div>
        <div className={`${styles.skillsTrack} ${styles.skillsTrackRight}`}>
          <div className={styles.marqueeInner}>
            <div className={styles.marqueeGroup}>{renderRow('right-1')}</div>
            <div className={styles.marqueeGroup} aria-hidden="true">
              {renderRow('right-2')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
