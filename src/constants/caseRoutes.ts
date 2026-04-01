/**
 * Базовые пути страниц кейсов (совпадают с `pageUrl` в `data/cases`).
 * Общие стили кейсов подключаются отдельно — здесь только маршрутизация и логика UI.
 */
export const CASE_PAGE_PATHS = ['/works/roast', '/works/dr-coffee', '/works/cleanner'] as const

export function isCasePagePath(pathname: string): boolean {
  return CASE_PAGE_PATHS.some((base) => pathname.startsWith(base))
}
