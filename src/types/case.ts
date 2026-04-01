export type CaseCategory = 'sites' | 'apps'

export interface CaseData {
  /** Короткий идентификатор кейса: 'roast', 'dr_coffee', 'cleanner' */
  id: string

  /** Название кейса */
  title: string

  /** Полное описание, как на кейс-страницах */
  descriptionFull: string

  /** Короткое описание для карточек */
  descriptionShort: string

  /** Индустрия / тип бизнеса */
  industry: string

  /** Полная дата (например, 'декабрь 2024') */
  dateFull: string

  /** Короткий год (например, '2025') */
  dateShort: string

  /** URL продакшн-сайта, если есть */
  websiteUrl: string | null

  /** Текстовая подпись для ссылки на сайт */
  websiteLabel: string

  /** Категория кейса для фильтров работ */
  category: CaseCategory

  /** Коммерческий проект или нет */
  isPaid: boolean

  /** Путь к превью-картинке (из /public/images) */
  imageSrc: string

  /** Путь к странице кейса в SPA (React-router) */
  pageUrl: string
}
