import { AppLink } from '../../components/AppLink/AppLink'
import { ArrowItem } from '../../components/ArrowElement/ArrowItem'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { usePageReady } from '../../hooks/usePageReady'

import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  usePageReady()
  useDocumentTitle('Страница не найдена')

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>ошибка 404</h1>
      <div className={styles.cat}>
        <img src="/images/cat_huh.svg" alt="Кот" width={215} height={280} loading="lazy" />
      </div>
      <AppLink to="/" className={styles.homeLink}>
        <ArrowItem labelSize="m" className={styles.homeArrow}>
          вернуться на главную
        </ArrowItem>
      </AppLink>
    </div>
  )
}
