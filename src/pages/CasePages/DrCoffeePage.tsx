import { useEffect, useMemo } from 'react'
import { projects } from '../../data/projects'

import { CaseHero } from '../../components/CaseComponents/CaseHero'
import { CaseSection } from '../../components/CaseComponents/CaseSection'
import { useCaseHeaderColor } from '../../hooks/useCaseHeaderColor'

import '../../../../portfolio_code/css/case-layout.css'
import '../../../../portfolio_code/css/_responsive.css'

export function DrCoffeePage() {
  useCaseHeaderColor()

  useEffect(() => {
    document.body.classList.add('dr-coffee-page')
    return () => {
      document.body.classList.remove('dr-coffee-page')
    }
  }, [])

  const drCoffee = useMemo(() => projects.find((p) => p.id === 'dr_coffee'), [])
  if (!drCoffee) return null

  return (
    <>
      <CaseHero
        backgroundImage="/images/dr_coffee/dr_coffee_main.webp"
        title={drCoffee.title}
        subtitle={drCoffee.descriptionFull}
        meta={[
          { label: 'индустрия', value: drCoffee.industry },
          { label: 'дата', value: drCoffee.dateFull },
          { label: 'сайт', value: drCoffee.websiteLabel },
        ]}
      />

      {/* 1. Почему редизайн */}
      <CaseSection>
        <div className="container">
          <div className="text-stack">
            <h4 className="text-stack__head">Почему редизайн?</h4>
            <div className="text-stack__body">
              <p>
                Сайт морально устарел и перестал отвечать задачам бизнеса. Структура вводила пользователей в заблуждение:
                например, в разделе «Услуги» вместо списка работ выводились только бренды оборудования. Ситуацию усугублял
                дефицит важной информации — отсутствие прайса, сроков и гарантий мешало принять решение. Финальным барьером
                было отсутствие формы обратной связи: клиенты не могли оставить заявку онлайн и были вынуждены звонить, что
                снижало конверсию.
              </p>
            </div>
          </div>

          <div className="image-grid">
            <div className="dc-card dc-card--dark">
              <img
                src="/images/dr_coffee/dr_coffee_research.webp"
                alt="Процесс исследований"
                className="case-image"
              />
              <span className="dc-card__label">процесс</span>
            </div>
            <div className="dc-card dc-card--orange">
              <img
                src="/images/dr_coffee/dr_coffee_structure.webp"
                alt="Структура сайта"
                className="case-image"
              />
              <span className="dc-card__label">структура</span>
            </div>
          </div>
        </div>
      </CaseSection>

      {/* 2. Подход */}
      <CaseSection backgroundColor="#F3F4F6">
        <div className="container">
          <div className="text-split">
            <p className="text-split__head">подход</p>
            <div className="text-split__body">
              <p>
                Компания использовала неформальный стиль: игривый шрифт в логотипе и маскот — доктор с кофейным шприцом.
                Моей задачей было не просто обновить дизайн, а сохранить и усилить эту дружелюбную атмосферу.
              </p>
              <p>
                Чтобы поддержать настроение, я использовала мягкие скругленные формы и крупную, открытую типографику. Тексты
                интерфейса также работают на образ: формулировки намеренно сделаны легкими и с долей юмора, чтобы общение
                с сервисом вызывало улыбку, а не стресс от поломки.
              </p>
            </div>
          </div>
        </div>

        <div className="image-stack">
          <img src="/images/dr_coffee/dr_coffee_coffee_machine.avif" alt="Кофемашина" className="case-image" />
          <img src="/images/dr_coffee/dr_coffee_about.avif" alt="О компании" className="case-image" />
        </div>
      </CaseSection>

      {/* 3. Забота */}
      <CaseSection>
        <div className="container">
          <div className="text-split">
            <p className="text-split__head">забота</p>
            <div className="text-split__body">
              <p>
                Поломка техники — это всегда стресс. Пользователь не обязан разбираться в устройстве кофемашины, но хочет
                заранее понимать порядок цен, не дожидаясь диагностики.
              </p>
              <p>
                Чтобы снизить тревожность, я сгруппировала прайс-лист по понятным «симптомам» (например, «не греет воду»
                или «шумит»), а не техническим узлам. При этом для продвинутых клиентов оставила возможность увидеть
                профессиональные названия неисправностей.
              </p>
            </div>
          </div>

          <div className="image-grid">
            <div className="dc-card">
              <img
                src="/images/dr_coffee/dr_coffee_price1.webp"
                alt="Цены вариант 1"
                className="case-image"
              />
            </div>
            <div className="dc-card">
              <img
                src="/images/dr_coffee/dr_coffee_price2.webp"
                alt="Цены вариант 2"
                className="case-image"
              />
            </div>
          </div>
        </div>
      </CaseSection>

      {/* 4. Проблемка (dark) */}
      <CaseSection
        backgroundColor="#282828"
        isDark
      >
        {/* background-image в оригинале идёт через style; тут оставляем цвет, как минимум визуально контраст выдержан */}
        <div className="container">
          <div className="text-split">
            <p className="text-split__head">проблемка</p>
            <div className="text-split__body">
              <div className="work-main-text">
                <p>
                  Изначально я сделала ставку на минимализм: бренды выделялись крупными логотипами, что упрощало
                  визуальный поиск и сохраняло «воздух» в интерфейсе.
                </p>
                <p>
                  Однако SEO-стратегия требовала наличия текстового описания для каждой карточки. Пришлось переработать
                  дизайн и добавить текст. Лично мне это решение кажется спорным — интерфейс стал визуально тяжелее, а
                  польза описаний для юзера неочевидна. Но в данном случае приоритет был отдан требованиям продвижения, а
                  не эстетике.
                </p>
              </div>
            </div>
          </div>

          <div className="image-grid">
            <div className="dc-before-after">
              <span className="dc-before-after__label">было</span>
              <img
                src="/images/dr_coffee/dr_coffee_repairlist_old.webp"
                alt="Было"
                className="case-image"
              />
            </div>
            <div className="dc-before-after">
              <span className="dc-before-after__label">стало</span>
              <img
                src="/images/dr_coffee/dr_coffee_repairlist_new.webp"
                alt="Стало"
                className="case-image"
              />
            </div>
          </div>
        </div>
      </CaseSection>

      {/* 5. Бренды и контакты */}
      <CaseSection backgroundColor="#F3F4F6">
        <div className="image-stack">
          <img src="/images/dr_coffee/dr_coffee_brandpage.avif" alt="Бренд Jura" className="case-image" />
          <img src="/images/dr_coffee/dr_coffee_articles.avif" alt="Статьи" className="case-image" />
          <img src="/images/dr_coffee/dr_coffee_contacts.avif" alt="Контакты" className="case-image" />
        </div>
      </CaseSection>

      {/* 6. Мобилка (dark) */}
      <CaseSection backgroundColor="#141313" isDark>
        <img src="/images/dr_coffee/dr_coffee_mobile.avif" alt="Мобильная версия" className="case-image" />
      </CaseSection>
    </>
  )
}

