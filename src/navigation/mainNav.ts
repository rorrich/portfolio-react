/**
 * Единый список внутренних разделов, по которым в UI определяется «текущая страница»
 * (шапка, мобильное меню, подсветка маршрута).
 *
 * Порядок совпадает с мобильным overlay (индексы 0…n − 1 используются в анимации ссылок).
 */
export type MainNavItem = {
  id: string
  to: string
  label: string
  counter?: string
  /** exact: только точный путь; prefix: путь и его вложенные сегменты */
  match?: 'exact' | 'prefix'
}

export const MAIN_APP_NAV_ITEMS: MainNavItem[] = [
  { id: 'home', to: '/', label: 'главная', match: 'exact' },
  { id: 'about', to: '/about', label: 'who я', match: 'exact' },
  { id: 'works', to: '/works', label: 'работы', counter: '[3]', match: 'exact' },
]

/**
 * Десктопная шапка: без «главной» — на десктопе она только через лого.
 */
export const MAIN_NAV_HEADER_ITEMS: MainNavItem[] = MAIN_APP_NAV_ITEMS.filter(
  (item) => item.to !== '/',
)

/**
 * Сопоставление pathname с пунктом навигации.
 * `/` — только точное совпадение; остальные to — сам путь или вложенные сегменты.
 */
export function isRouteActive(pathname: string, to: string): boolean {
  return isRouteActiveByMatch(pathname, { to, match: 'prefix' })
}

export function isRouteActiveByMatch(pathname: string, item: Pick<MainNavItem, 'to' | 'match'>) {
  const normalized = item.to.startsWith('/') ? item.to : `/${item.to}`
  const match = item.match ?? (normalized === '/' ? 'exact' : 'prefix')
  if (match === 'exact') {
    return pathname === normalized
  }
  return pathname === normalized || pathname.startsWith(`${normalized}/`)
}
