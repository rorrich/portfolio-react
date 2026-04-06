import { useEffect, useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CARD_IMAGE_PARALLAX } from '../constants/cardImageParallax'
import { usePageTransition } from './usePageReady'

/** Внутренняя обёртка карточки в разметке страницы (см. `data-work-card-reveal-inner`). */
const INNER_SELECTOR = '[data-work-card-reveal-inner]'

function getRevealChildren(el: HTMLElement) {
  return Array.from(el.children).filter((node): node is HTMLElement => node instanceof HTMLElement)
}

export type UseWorkCardsRevealOptions = {
  duration?: number
  ease?: string
  /**
   * Доп. поля ScrollTrigger; `trigger` игнорируется — на каждый слот маски свой.
   * По умолчанию: `start` как у {@link CARD_IMAGE_PARALLAX.scrollStart}, `once: true`.
   * Собственный `onEnter` (если есть) вызывается после внутреннего `tween.restart()`.
   */
  scrollTrigger?: Partial<ScrollTrigger.Vars>
  /** Пересобрать слоты при смене списка: стабильная ссылка (`useMemo`-массив) или примитив (фильтр). */
  slotListKey?: unknown
}

/**
 * Карточки в маске (overflow hidden на слоте): внутренний блок заезжает снизу вверх, как у SplitTextReveal.
 * Прямые дет контейнера — слоты; внутри каждого — узел с `data-work-card-reveal-inner`.
 *
 * Cleanup: `ctx.kill()`, не `revert()` — та же семантика, что у `useFadeInReveal`. При смене
 * `isTransitioning` cleanup идёт до unmount; `revert()` вернул бы inner к `yPercent: 100`
 * (состояние «from»), и карточки с картинками визуально пропадали бы под маской во время шторки.
 * У твинов со ScrollTrigger `kill()` всё равно снимает триггеры с реестра.
 *
 * Твин `paused` + `restart()` в `onEnter`: если `start` уже пройден при создании триггера,
 * стандартный `fromTo` с встроенным ScrollTrigger дожимал progress к 1 без полной длительности.
 */
export function useWorkCardsReveal(
  ref: RefObject<HTMLElement | null>,
  delay = 0,
  options: UseWorkCardsRevealOptions = {},
) {
  const { isTransitioning } = usePageTransition()

  const duration = options.duration ?? CARD_IMAGE_PARALLAX.duration
  const ease = options.ease ?? CARD_IMAGE_PARALLAX.ease
  const scrollSt = options.scrollTrigger
  const slotListKey = options.slotListKey

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const slots = getRevealChildren(el)
    if (slots.length === 0) return

    for (const slot of slots) {
      const inner = slot.querySelector<HTMLElement>(INNER_SELECTOR)
      if (inner) gsap.set(inner, { yPercent: 100, y: 0 })
    }
  }, [ref, slotListKey])

  useEffect(() => {
    if (isTransitioning) return

    const el = ref.current
    if (!el) return

    const slots = getRevealChildren(el)
    if (slots.length === 0) return

    const rawSt = scrollSt ? { ...scrollSt } : {}
    delete (rawSt as { trigger?: unknown }).trigger
    const { onEnter: userOnEnter, ...restScrollTrigger } = rawSt as Partial<ScrollTrigger.Vars>

    const ctx = gsap.context(() => {
      for (const slot of slots) {
        const inner = slot.querySelector<HTMLElement>(INNER_SELECTOR)
        if (!inner) continue

        const tween = gsap.fromTo(
          inner,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration,
            ease,
            delay,
            paused: true,
            immediateRender: false,
          },
        )

        ScrollTrigger.create({
          trigger: slot,
          start: CARD_IMAGE_PARALLAX.scrollStart,
          once: true,
          ...restScrollTrigger,
          onEnter: (self) => {
            tween.restart(true)
            userOnEnter?.(self)
          },
        })
      }
    }, el)

    return () => {
      // См. JSDoc: kill вместо revert при transition — иначе карточки откатываются в маску.
      ctx.kill()
    }
  }, [isTransitioning, ref, delay, duration, ease, scrollSt, slotListKey])
}
