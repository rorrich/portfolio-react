/**
 * Единая граница «десктоп / мобилка» для matchMedia и @media.
 * Десктоп: min-width: 970px · Мобилка: max-width: 969px (без двойного срабатывания на 970).
 */
export const LAYOUT_DESKTOP_MIN_PX = 970

export const layoutDesktopMinWidthMediaQuery = `(min-width: ${LAYOUT_DESKTOP_MIN_PX}px)`

/**
 * Кейс-шапка: пока scrollY ниже этого порога, не доверяем геометрии hero для transparent/filled
 * и не скрываем шапку на десктопе при скролле вниз — стабильнее у самого верха страницы.
 */
export const CASE_HEADER_TOP_GUARD_PX = 80

/**
 * Кейс-шапка: если в DOM нет .case-hero / .case-hero__content, переключаем filled после этого скролла.
 */
export const CASE_HEADER_FALLBACK_FILLED_SCROLL_Y_PX = 50
