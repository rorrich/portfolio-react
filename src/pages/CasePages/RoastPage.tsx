import { useEffect, useMemo } from 'react'
import { projects } from '../../data/projects'

import { CaseHero } from '../../components/CaseComponents/CaseHero'
import { CaseSection } from '../../components/CaseComponents/CaseSection'
import { useCaseHeaderColor } from '../../hooks/useCaseHeaderColor'
import { usePageReady } from '../../hooks/usePageReady'

import '../../styles/case-pages/case-layout.css'
import '../../styles/case-pages/_case-responsive.css'

export function RoastPage() {
  usePageReady()
  useCaseHeaderColor()

  useEffect(() => {
    document.body.classList.add('roast-page')
    return () => {
      document.body.classList.remove('roast-page')
    }
  }, [])

  const roast = useMemo(() => projects.find((p) => p.id === 'roast'), [])
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

      <CaseSection>
        <div className="container">
          <div className="text-stack">
            <h4 className="text-stack__head">Что и зачем?</h4>
            <div className="text-stack__body">
              <p>
                «Roast.by» — белорусская компания по обжарке кофе, работающая на рынке с 2010 года в сегментах B2B и B2C.
                За это время команда выстроила мощное производство и наладила регулярные поставки для сотен кофеен, офисов и
                розничных сетей. Ранее оптовые продажи держались на телефонных звонках и ручном труде менеджеров, но масштабирование
                бизнеса потребовало перемен. Главной целью стала разработка B2B-платформы, которая автоматизирует прием заявок,
                снимет рутинную нагрузку с сотрудников и станет удобным инструментом закупки для партнеров.
              </p>
            </div>
          </div>

          <div className="image-grid">
            <img src="/images/roast/roast_mockup_ipad.avif" alt="iPad Mockup" className="case-image" />
            <img src="/images/roast/roast_picture.avif" alt="Picture" className="case-image" />
          </div>
        </div>
      </CaseSection>

      <CaseSection backgroundColor="#F4F5F6">
        <div className="container">
          <div className="text-split">
            <p className="text-split__head">подход</p>
            <div className="text-split__body">
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
            </div>
          </div>
        </div>

        <div className="image-stack">
          <img src="/images/roast/roast_pc_catalog.avif" alt="PC Catalog" className="case-image" />
          <img src="/images/roast/roast_mobile1.avif" alt="Mobile View 1" className="case-image" />
        </div>
      </CaseSection>

      <CaseSection backgroundColor="#282828" isDark>
        <div className="container">
          <div className="image-grid">
            <img src="/images/roast/roast_picture2.avif" alt="Picture 2" className="case-image" />
            <img src="/images/roast/roast_mockup_mob.avif" alt="Mobile Mockup" className="case-image" />
          </div>
        </div>
      </CaseSection>

      <CaseSection backgroundColor="#F4F5F6">
        <div className="container">
          <div className="text-split">
            <p className="text-split__head">проблема и решение</p>
            <div className="text-split__body">
              <p>
                До появления платформы заказы обрабатывались вручную: клиенты не видели складских остатков, а индивидуальные прайс-листы
                требовали постоянной сверки. Это затягивало выставление счетов и перегружало менеджеров.
              </p>
              <p>
                Внедрение Личного кабинета решило эти проблемы, обеспечив партнерам доступ к актуальным стокам и персональным ценам 24/7.
                Теперь клиенты могут самостоятельно формировать заказы, а функция повтора заказа значительно экономит время постоянных покупателей.
              </p>
            </div>
          </div>
        </div>

        <img src="/images/roast/roast_pc_other.avif" alt="PC Other" className="case-image" />
      </CaseSection>

      <CaseSection backgroundColor="#282828" isDark>
        <img src="/images/roast/roast_mobile2.avif" alt="Mobile View 2" className="case-image" />
      </CaseSection>
    </>
  )
}

