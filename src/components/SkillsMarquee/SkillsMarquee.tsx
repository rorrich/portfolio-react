import type { FC } from 'react'

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

export interface HomePageStyles {
  skillsAnimation: string
  skillsContainer: string
  skillsTrack: string
  skillsTrackLeft: string
  skillsTrackRight: string
  marqueeGroup: string
  skillTag: string
  skillArrow: string
}

interface SkillsMarqueeProps {
  styles: Record<string, string>
}

export const SkillsMarquee: FC<SkillsMarqueeProps> = ({ styles }) => {
  const renderRow = (keyPrefix: string) =>
    skills.flatMap((skill, index) => [
      <div key={`${keyPrefix}-arrow-${index}`} className={styles.skillArrow}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <use href="/images/sprite.svg#icon-arrow-up" />
        </svg>
      </div>,
      <div key={`${keyPrefix}-tag-${index}`} className={styles.skillTag}>
        {skill}
      </div>,
    ])

  return (
    <section className={styles.skillsAnimation}>
      <div className={styles.skillsContainer}>
        <div className={`${styles.skillsTrack} ${styles.skillsTrackLeft}`}>
          <div className={styles.marqueeGroup}>{renderRow('left-1')}</div>
          <div className={styles.marqueeGroup} aria-hidden="true">
            {renderRow('left-2')}
          </div>
        </div>
        <div className={`${styles.skillsTrack} ${styles.skillsTrackRight}`}>
          <div className={styles.marqueeGroup}>{renderRow('right-1')}</div>
          <div className={styles.marqueeGroup} aria-hidden="true">
            {renderRow('right-2')}
          </div>
        </div>
      </div>
    </section>
  )
}
