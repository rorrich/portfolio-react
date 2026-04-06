import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'

import { usePageTransition } from './usePageReady'

function getRevealChildren(el: HTMLElement) {
  return Array.from(el.children).filter((node): node is HTMLElement => node instanceof HTMLElement)
}

export type UseFadeInRevealOptions = {
  /** Смещение по оси: по умолчанию 40 и для `x`, и для `y` */
  axis?: 'x' | 'y'
  offset?: number
  duration?: number
  stagger?: number
  ease?: string
}

function getFromVars(axis: 'x' | 'y', offset: number): gsap.TweenVars {
  return axis === 'x'
    ? { opacity: 0, x: offset }
    : { opacity: 0, y: offset }
}

function getToVars(duration: number, stagger: number, ease: string, delay: number): gsap.TweenVars {
  return {
    opacity: 1,
    x: 0,
    y: 0,
    duration,
    ease,
    stagger,
    delay,
  }
}

/**
 * Анимация появления прямых дочерних узлов контейнера после закрытия transition-шторки.
 * Один прогон за монтирование (до cleanup).
 *
 * Очистка: в cleanup вызывается `ctx.kill()`, а не `revert()` — намеренно.
 * `revert()` откатил бы твин к «from» (opacity 0, сдвиг); cleanup может сработать
 * при смене `isTransitioning`, пока узлы ещё в DOM (шторка, без полного unmount),
 * и контент бы «пропал». `kill()` гасит анимацию и обычно сохраняет последние
 * инлайны — визуально уже показанное остаётся. `useWorkCardsReveal` делает то же
 * (`kill()` в cleanup): иначе при шторке `revert()` откатывал бы inner к `yPercent: 100`
 * и карточки пропадали бы; ScrollTrigger всё равно отцепляется при `kill()` твина.
 */
export function useFadeInReveal(
  ref: RefObject<HTMLElement | null>,
  delay = 0,
  options: UseFadeInRevealOptions = {},
) {
  const { isTransitioning } = usePageTransition()
  const playedRef = useRef(false)

  const axis = options.axis ?? 'y'
  const offset = options.offset ?? 40
  const duration = options.duration ?? 0.7
  const stagger = options.stagger ?? 0.12
  const ease = options.ease ?? 'power2.out'

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const children = getRevealChildren(el)
    if (children.length === 0) return

    gsap.set(children, getFromVars(axis, offset))
  }, [ref, axis, offset])

  useEffect(() => {
    if (isTransitioning || playedRef.current) return

    const el = ref.current
    if (!el) return

    const children = getRevealChildren(el)
    if (children.length === 0) return

    playedRef.current = true

    const from = getFromVars(axis, offset)
    const to = getToVars(duration, stagger, ease, delay)

    const ctx = gsap.context(() => {
      gsap.fromTo(children, from, to)
    }, el)

    return () => {
      // См. JSDoc у хука: kill, не revert — см. `useWorkCardsReveal` для контраста.
      ctx.kill()
      playedRef.current = false
    }
  }, [isTransitioning, ref, delay, axis, offset, duration, stagger, ease])
}
