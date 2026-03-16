export type ProjectCategory = 'sites' | 'apps'

export interface ProjectData {
  /** Короткий идентификатор проекта: 'roast', 'dr_coffee', 'cleanner' */
  id: string

  /** Название проекта */
  title: string

  /** Полное описание, как в кейсовых страницах */
  descriptionFull: string

  /** Короткое описание для карточек */
  descriptionShort: string

  /** Индустрия / тип бизнеса */
  industry: string

  /** Полная дата (например, 'декабрь 2024') */
  dateFull: string

  /** Короткий год (например, '2025') */
  dateShort: string

  /** URL продакшн‑сайта, если есть */
  websiteUrl: string | null

  /** Текстовая подпись для ссылки на сайт */
  websiteLabel: string

  /** Категория проекта для фильтров работ */
  category: ProjectCategory

  /** Коммерческий проект или нет */
  isPaid: boolean

  /** Путь к превью‑картинке (из /public/images) */
  imageSrc: string

  /** Путь к странице проекта в SPA (React‑роут) */
  pageUrl: string
}

