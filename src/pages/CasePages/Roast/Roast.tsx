import { useMemo } from 'react'

import { CaseBlock } from '../../../components/CaseComponents/CaseBlock/CaseBlock'
import { ImageGroup } from '../../../components/CaseComponents/CaseBlock/ImageGroup'
import { TextGroup } from '../../../components/CaseComponents/CaseBlock/TextGroup'
import { CaseHero } from '../../../components/CaseComponents/CaseHero/CaseHero'
import { cases } from '../../../data/cases'
import { usePageReady } from '../../../hooks/usePageReady'

export function RoastPage() {
  usePageReady()

  const roast = useMemo(() => cases.find((p) => p.id === 'roast'), [])
  if (!roast) return null

  return (
    <>
      <CaseHero
        backgroundImage="/images/roast/roast_main.avif"
        title={roast.title}
        subtitle={roast.descriptionFull}
        meta={[
          { label: 'индустрия', value: roast.industry },
          { label: 'дата', value: roast.dateFull },
          { label: 'сайт', value: roast.websiteLabel },
        ]}
      />

      <CaseBlock
        text={
          <TextGroup
            label="Что и зачем?"
            layout="column"
            description={
              <p>
                «Roast.by» — белорусская компания по обжарке кофе, работающая на рынке с 2010 года в сегментах B2B и B2C.
                За это время команда выстроила мощное производство и наладила регулярные поставки для сотен кофеен, офисов и
                розничных сетей. Ранее оптовые продажи держались на телефонных звонках и ручном труде менеджеров, но масштабирование
                бизнеса потребовало перемен. Главной целью стала разработка B2B-платформы, которая автоматизирует прием заявок,
                снимет рутинную нагрузку с сотрудников и станет удобным инструментом закупки для партнеров.
              </p>
            }
          />
        }
        images={
          <ImageGroup
            fit="cover"
            images={[
              { src: '/images/roast/roast_mockup_ipad.avif', alt: 'iPad Mockup' },
              { src: '/images/roast/roast_picture.avif', alt: 'Picture' },
            ]}
          />
        }
      />

      <CaseBlock
        bg="#F4F5F6"
        text={
          <TextGroup
            label="подход"
            description={
              <>
                <p>
                  Главная задача интерфейса — ускорить сборку заказа. Для этого я заменила стандартную сетку карточек на компактный
                  табличный список. Это позволяет пользователю добавлять разные фасовки в один клик, не проваливаясь внутрь товара,
                  а боковая корзина мгновенно обновляет итог. В строке товара оставила только критически важное: вкусовые дескрипторы,
                  метки акций и цены. Навигацию упростила с помощью табов и сворачиваемых блоков, добавив детальные фильтры для
                  поиска.
                </p>
                <p>
                  Оглядываясь назад, сейчас я бы сделала списки визуально легче, отказавшись от явных границ таблицы в пользу
                  «воздуха», чтобы интерфейс выглядел чище.
                </p>
              </>
            }
          />
        }
        images={
          <ImageGroup
            layout="column"
            bleed
            images={[
              { src: '/images/roast/roast_pc_catalog.avif', alt: 'PC Catalog' },
              { src: '/images/roast/roast_mobile1.avif', alt: 'Mobile View 1' },
            ]}
          />
        }
      />

      <CaseBlock
        bg="#282828"
        theme="dark"
        images={
          <ImageGroup
            fit="cover"
            images={[
              { src: '/images/roast/roast_picture2.avif', alt: 'Picture 2' },
              { src: '/images/roast/roast_mockup_mob.avif', alt: 'Mobile Mockup' },
            ]}
          />
        }
      />

      <CaseBlock
        bg="#F4F5F6"
        text={
          <TextGroup
            label="проблема и решение"
            description={
              <>
                <p>
                  До появления платформы заказы обрабатывались вручную: клиенты не видели складских остатков, а индивидуальные
                  прайс-листы требовали постоянной сверки. Это затягивало выставление счетов и перегружало менеджеров.
                </p>
                <p>
                  Внедрение Личного кабинета решило эти проблемы, обеспечив партнерам доступ к актуальным стокам и персональным
                  ценам 24/7. Теперь клиенты могут самостоятельно формировать заказы, а функция повтора заказа значительно экономит
                  время постоянных покупателей.
                </p>
              </>
            }
          />
        }
        images={
          <ImageGroup
            bleed
            images={[{ src: '/images/roast/roast_pc_other.avif', alt: 'PC Other' }]}
          />
        }
      />

      <CaseBlock
        bg="#282828"
        theme="dark"
        images={
          <ImageGroup
            bleed
            images={[{ src: '/images/roast/roast_mobile2.avif', alt: 'Mobile View 2' }]}
          />
        }
      />
    </>
  )
}
