import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { MenuLink } from '../../components/MenuLink/MenuLink'

import styles from './AboutPage.module.css'

gsap.registerPlugin(ScrollTrigger)

export function AboutPage() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const heroTitleRef = useRef<HTMLHeadingElement | null>(null)
  const heroCatRef = useRef<HTMLDivElement | null>(null)

  const aboutTextRef = useRef<HTMLDivElement | null>(null)
  const infoBlocksRef = useRef<HTMLDivElement | null>(null)
  const imageWrapRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      if (heroTitleRef.current) {
        tl.from(heroTitleRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        })
      }

      if (heroCatRef.current) {
        tl.from(
          heroCatRef.current,
          {
            opacity: 0,
            x: 24,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.25',
        )
      }

      if (aboutTextRef.current) {
        const paragraphs = aboutTextRef.current.querySelectorAll('p')

        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: aboutTextRef.current,
              start: 'top 80%',
            },
          },
        )
      }

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

      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: 'top 80%',
            },
          },
        )
      }
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className={styles['about-me']}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.hero__content}>
            <h1 ref={heroTitleRef} className={styles.hero__title}>
              who я
            </h1>
            <div ref={heroCatRef} className={styles['about-me__cat']}>
              <img
                src="/images/cat_huh.svg"
                alt="Кот"
                width={215}
                height={280}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles['about-me__text']}>
        <div className="container-grid">
          <div ref={aboutTextRef} className={styles['about-me__text-content']}>
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
      </section>

      <section className={styles['about-me__info']}>
        <div className={`container-grid ${styles.aboutInfoContainerGrid}`}>
          <div className={styles['about-me__info-content']}>
            <div ref={infoBlocksRef} className={styles['about-me__info-blocks']}>
              <div className={styles['about-me__info-block']}>
                <div className={styles['about-me__info-label']}>
                  <div className={styles['decor-element']}>
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
                  </div>
                  <span>настоящее время</span>
                </div>
                <p className={styles['about-me__info-text']}>работаю над коммерческими проектами</p>
              </div>

              <div className={styles['about-me__info-block']}>
                <p className={styles['about-me__info-date']}>июнь 2023 – декабрь 2023</p>
                <p className={styles['about-me__info-text']}>
                  закончила курсы на UX/UI дизайнера от онлайн-школы TeachMeSkills
                </p>
                <MenuLink
                  href="/documents/certificate.pdf"
                  className={styles['about-me__info-link']}
                >
                  сертификат
                </MenuLink>
              </div>
            </div>

            <div ref={imageWrapRef} className={styles['about-me__image-block']}>
              <div className={styles['about-me__image-label']}>
                <div className={styles['decor-element']}>
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
                </div>
                <span>а это я</span>
              </div>

              <div className={styles['about-me__image']}>
                <img src="/images/photo_about.avif" alt="Алина" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

