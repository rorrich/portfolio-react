import { useLocation } from 'react-router-dom'

import { MAIN_NAV_HEADER_ITEMS, isRouteActiveByMatch, type MainNavItem } from '../navigation/mainNav'

export type MainNavHeaderItemWithCurrent = MainNavItem & { isCurrent: boolean }

export function useMainNavHeaderItems(): MainNavHeaderItemWithCurrent[] {
  const { pathname } = useLocation()

  return MAIN_NAV_HEADER_ITEMS.map((item) => ({
    ...item,
    isCurrent: isRouteActiveByMatch(pathname, item),
  }))
}
