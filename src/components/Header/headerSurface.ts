import type { CaseHeaderMode } from '../../hooks/useHeaderScrollBehavior'

/**
 * Какие модульные классы шапки вешать для кейс-страниц (см. Header.module.css).
 * - caseTransparent: прозрачный фон, светлый текст на тёмном hero
 * - caseFilled: светлая полоса (как после скролла); для моб. меню поверх белой шторки
 *   используем тот же вид, пока меню открыто и логический режим ещё transparent
 */
export type CaseHeaderSurface = 'none' | 'caseTransparent' | 'caseFilled'

export function resolveCaseHeaderSurface(
  isCasePage: boolean,
  caseHeaderMode: CaseHeaderMode,
  isMenuOpen: boolean,
): CaseHeaderSurface {
  if (!isCasePage) return 'none'
  if (isMenuOpen && caseHeaderMode === 'transparent') return 'caseFilled'
  if (caseHeaderMode === 'transparent') return 'caseTransparent'
  return 'caseFilled'
}
