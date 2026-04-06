import { type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import {
  CARD_IMAGE_PARALLAX,
  CARD_PARALLAX_IMG_SELECTOR,
  CARD_REVEAL_SLOT_SELECTOR,
} from '../constants/cardImageParallax'

/**
 * Скролл-параллах для картинок в слотах маски: `yPercent` из {@link CARD_IMAGE_PARALLAX.fromYPercent} → 0.
 * Как в {@link useWorkCardsReveal}: `paused` + `onEnter` → `restart(true)`, чтобы не дожимать кадр при уже пройденном start.
 */
export function useCardImageParallaxReveal(
  rootRef: RefObject<HTMLElement | null>,
  /** Как у `useGSAP`: пересоздать анимации при смене данных (например список карточек). */
  dependencies: unknown[] = [],
) {
  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const { duration, ease, scrollStart, fromYPercent } = CARD_IMAGE_PARALLAX

      const images = root.querySelectorAll<HTMLElement>(CARD_PARALLAX_IMG_SELECTOR)

      images.forEach((img) => {
        const slot = img.closest(CARD_REVEAL_SLOT_SELECTOR)
        if (!slot) return

        gsap.set(img, { yPercent: fromYPercent })

        const tween = gsap.fromTo(
          img,
          { yPercent: fromYPercent },
          {
            yPercent: 0,
            duration,
            ease,
            paused: true,
            immediateRender: false,
          },
        )

        ScrollTrigger.create({
          trigger: slot,
          start: scrollStart,
          once: true,
          onEnter: () => {
            tween.restart(true)
          },
        })
      })
    },
    { scope: rootRef, dependencies },
  )
}
