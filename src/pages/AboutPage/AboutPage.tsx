import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { AppLink } from '../../components/AppLink/AppLink'
import { ArrowItem } from '../../components/ArrowElement/ArrowItem'
import { SplitTextReveal } from '../../components/SplitTextReveal/SplitTextReveal'
import { useCardImageParallaxReveal } from '../../hooks/useCardImageParallaxReveal'
import { useFadeInReveal } from '../../hooks/useFadeInReveal'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { usePageReady } from '../../hooks/usePageReady'
import { useWorkCardsReveal } from '../../hooks/useWorkCardsReveal'

import styles from './AboutPage.module.css'

export function AboutPage() {
  usePageReady()
  useDocumentTitle('Обо мне')
  const rootRef = useRef<HTMLDivElement | null>(null)

  const heroCatRevealRef = useRef<HTMLDivElement | null>(null)
  const aboutMeTextGridRevealRef = useRef<HTMLDivElement | null>(null)

  const infoBlocksRef = useRef<HTMLDivElement | null>(null)
  const aboutPhotoRevealRef = useRef<HTMLDivElement | null>(null)

  useFadeInReveal(heroCatRevealRef, 0.35, { axis: 'x', offset: 40, duration: 0.7 })
  useFadeInReveal(aboutMeTextGridRevealRef, 0.45)
  useWorkCardsReveal(aboutPhotoRevealRef)

  useGSAP(
    () => {
      if (infoBlocksRef.current) {
        const blocks = Array.from(infoBlocksRef.current.children).filter(
          (el) => el instanceof HTMLElement,
        ) as HTMLElement[]

        gsap.fromTo(
          blocks,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: infoBlocksRef.current,
              start: 'top 80%',
            },
          },
        )
      }
    },
    { scope: rootRef },
  )

  useCardImageParallaxReveal(aboutPhotoRevealRef)

  return (
    <div ref={rootRef} className={styles['about-me']}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.hero__content}>
            <SplitTextReveal
              text="who я"
              as="h1"
              className={styles.hero__title}
              stagger={0.084}
              duration={0.78}
            />
            <div ref={heroCatRevealRef} className={styles['about-me__cat']}>
              <img
                src="/images/cat_03.svg"
                alt="Кот"
                width={399}
                height={322}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles['about-me__text']}>
        <div className="container">
          <div ref={aboutMeTextGridRevealRef} className={styles.aboutMeTextGrid}>
            <div className={styles['about-me__text-content']}>
              <p>
                Занимаюсь UI/UX-дизайном с 2024 года. Проектирую сайты и приложения, совмещая
                эстетику с логикой. Кроме интерфейсов, рисую векторные иллюстрации и углубляюсь
                в техническую часть — сейчас изучаю фронтенд, в будущем планирую освоить 3D.
              </p>
              <p>
                В свободное время рисую для души и играю в видеоигры. Praise the Sun! \[T]/
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['about-me__info']}>
        <div className="container">
          <div className={styles.aboutMeInfoGrid}>
            <div ref={infoBlocksRef} className={styles['about-me__info-blocks']}>
              <div className={styles['about-me__info-block']}>
                <ArrowItem
                  variant="static"
                  className={styles['about-me__info-heading']}
                >
                  настоящее время
                </ArrowItem>
                <p className={styles['about-me__info-text']}>работаю над коммерческими проектами</p>
              </div>

              <div className={styles['about-me__info-block']}>
                <p className={styles['about-me__info-date']}>июнь 2023 – декабрь 2023</p>
                <p className={styles['about-me__info-text']}>
                  закончила курсы на UX/UI дизайнера от онлайн-школы TeachMeSkills
                </p>
                <AppLink
                  href="/documents/certificate.pdf"
                  className={styles['about-me__info-link']}
                >
                  <ArrowItem>сертификат</ArrowItem>
                </AppLink>
              </div>
            </div>

            <div
              ref={aboutPhotoRevealRef}
              className={styles['about-me__image-block']}
            >
              <div
                className={styles.aboutMePhotoSlotMask}
                data-home-work-card-slot=""
              >
                <div
                  className={styles.aboutMePhotoCardInner}
                  data-work-card-reveal-inner=""
                >
                  <ArrowItem variant="static" className={styles['about-me__image-label']}>
                    а это я
                  </ArrowItem>

                  <div className={styles['about-me__image']}>
                    <div className={styles.aboutMePhotoParallaxWrap}>
                      <img
                        className={styles.aboutMePhotoParallaxImg}
                        src="/images/photo_about.avif"
                        alt="Алина"
                        data-home-card-parallax-img=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

