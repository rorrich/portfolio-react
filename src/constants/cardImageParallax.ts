/**
 * Скролл-параллах картинок в слотах маски + дефолты для `useWorkCardsReveal`
 * (duration / ease / точка старта ScrollTrigger).
 */
export const CARD_IMAGE_PARALLAX = {
  duration: 1.2,
  ease: 'power4.out',
  scrollStart: 'top 90%',
  fromYPercent: -12,
} as const

export const CARD_PARALLAX_IMG_SELECTOR = '[data-home-card-parallax-img]'
export const CARD_REVEAL_SLOT_SELECTOR = '[data-home-work-card-slot]'
