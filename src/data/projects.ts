import type { ProjectData } from '../types/project'

/**
 * Порядок записей в `projects`: от новых к старым (как на /works).
 * Превью на главной — первые три элемента.
 */
export function getHomePreviewProjects(list: readonly ProjectData[]): ProjectData[] {
  return list.slice(0, 3)
}

export const projects: ProjectData[] = [
  {
    id: 'roast',
    title: 'Roast',
    descriptionFull:
      'оптовый сайт по продаже кофе, чая и кофейных аксессуаров',
    descriptionShort: 'оптовый сайт по продаже кофе и чая',
    industry: 'интернет-магазин',
    dateFull: 'август 2025',
    dateShort: '2025',
    websiteUrl: null,
    websiteLabel: 'в разработке',
    category: 'sites',
    isPaid: true,
    imageSrc: '/images/picture_roast.webp',
    pageUrl: '/works/roast',
  },
  {
    id: 'dr_coffee',
    title: 'Doctor Coffee',
    descriptionFull: 'редизайн сайта по ремонту кофемашин',
    descriptionShort: 'редизайн сайта по ремонту кофемашин',
    industry: 'сфера услуг',
    dateFull: 'январь 2025',
    dateShort: '2025',
    websiteUrl: 'https://doctorcoffee.by/',
    websiteLabel: 'doctorcoffee.by',
    category: 'sites',
    isPaid: true,
    imageSrc: '/images/picture_d.coffee.avif',
    pageUrl: '/works/dr-coffee',
  },
  {
    id: 'cleanner',
    title: 'Cleanner',
    descriptionFull: 'мобильное приложение для робота пылесоса',
    descriptionShort: 'приложение для робота пылесоса',
    industry: 'смарт-техника',
    dateFull: 'декабрь 2024',
    dateShort: '2024',
    websiteUrl: null,
    websiteLabel: '¯\\_(ツ)_/¯',
    category: 'apps',
    isPaid: false,
    imageSrc: '/images/picture_cleanner2.webp',
    pageUrl: '/works/cleanner',
  },
]

