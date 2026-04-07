import { useLayoutEffect } from 'react'

/**
 * document.title для SEO и вкладки браузера при SPA-переходах.
 */
export function useDocumentTitle(title: string) {
  useLayoutEffect(() => {
    document.title = title
  }, [title])
}
