import { useMemo } from 'react'

import { CaseBlock } from '../../../components/CaseComponents/CaseBlock/CaseBlock'
import { ImageGroup } from '../../../components/CaseComponents/CaseBlock/ImageGroup'
import { TextGroup } from '../../../components/CaseComponents/CaseBlock/TextGroup'
import { CaseHero } from '../../../components/CaseComponents/CaseHero/CaseHero'
import { projects } from '../../../data/projects'
import { usePageReady } from '../../../hooks/usePageReady'

import styles from './DrCoffee.module.css'

export function DrCoffeePage() {
  usePageReady()

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

      <CaseBlock
        text={
          <TextGroup
            label="Почему редизайн?"
            layout="column"
            description={
              <p>
                Сайт морально устарел и перестал отвечать задачам бизнеса. Структура вводила пользователей в заблуждение:
                например, в разделе «Услуги» вместо списка работ выводились только бренды оборудования. Ситуацию усугублял
                дефицит важной информации — отсутствие прайса, сроков и гарантий мешало принять решение. Финальным барьером
                было отсутствие формы обратной связи: клиенты не могли оставить заявку онлайн и были вынуждены звонить, что
                снижало конверсию.
              </p>
            }
          />
        }
        images={
          <div className={styles.drCardGrid}>
            <div className={`${styles.drCard} ${styles.drCardDark}`}>
              <img src="/images/dr_coffee/dr_coffee_research.webp" alt="Процесс исследований" className={styles.coverImage} />
              <span className={styles.drCardLabel}>процесс</span>
            </div>
            <div className={`${styles.drCard} ${styles.drCardOrange}`}>
              <img src="/images/dr_coffee/dr_coffee_structure.webp" alt="Структура сайта" className={styles.coverImage} />
              <span className={styles.drCardLabel}>структура</span>
            </div>
          </div>
        }
      />

      <CaseBlock
        bg="#F3F4F6"
        text={
          <TextGroup
            label="подход"
            description={
              <>
                <p>
                  Компания использовала неформальный стиль: игривый шрифт в логотипе и маскот — доктор с кофейным шприцом.
                  Моей задачей было не просто обновить дизайн, а сохранить и усилить эту дружелюбную атмосферу.
                </p>
                <p>
                  Чтобы поддержать настроение, я использовала мягкие скругленные формы и крупную, открытую типографику.
                  Тексты интерфейса также работают на образ: формулировки намеренно сделаны легкими и с долей юмора, чтобы
                  общение с сервисом вызывало улыбку, а не стресс от поломки.
                </p>
              </>
            }
          />
        }
        images={
          <ImageGroup
            layout="column"
            bleed
            className={styles.imageStackLarge}
            images={[
              { src: '/images/dr_coffee/dr_coffee_coffee_machine.avif', alt: 'Кофемашина' },
              { src: '/images/dr_coffee/dr_coffee_about.avif', alt: 'О компании' },
            ]}
          />
        }
      />

      <CaseBlock
        text={
          <TextGroup
            label="забота"
            description={
              <>
                <p>
                  Поломка техники — это всегда стресс. Пользователь не обязан разбираться в устройстве кофемашины, но хочет
                  заранее понимать порядок цен, не дожидаясь диагностики.
                </p>
                <p>
                  Чтобы снизить тревожность, я сгруппировала прайс-лист по понятным «симптомам» (например, «не греет воду»
                  или «шумит»), а не техническим узлам. При этом для продвинутых клиентов оставила возможность увидеть
                  профессиональные названия неисправностей.
                </p>
              </>
            }
          />
        }
        images={
          <ImageGroup
            fit="cover"
            images={[
              { src: '/images/dr_coffee/dr_coffee_price1.webp', alt: 'Цены вариант 1' },
              { src: '/images/dr_coffee/dr_coffee_price2.webp', alt: 'Цены вариант 2' },
            ]}
          />
        }
      />

      <CaseBlock
        bg="#282828"
        theme="dark"
        text={
          <TextGroup
            label="проблемка"
            description={
              <>
                <p>
                  Изначально я сделала ставку на минимализм: бренды выделялись крупными логотипами, что упрощало визуальный
                  поиск и сохраняло «воздух» в интерфейсе.
                </p>
                <p>
                  Однако SEO-стратегия требовала наличия текстового описания для каждой карточки. Пришлось переработать
                  дизайн и добавить текст. Лично мне это решение кажется спорным — интерфейс стал визуально тяжелее, а
                  польза описаний для юзера неочевидна. Но в данном случае приоритет был отдан требованиям продвижения, а не
                  эстетике.
                </p>
              </>
            }
          />
        }
        images={
          <div className={styles.beforeAfterGrid}>
            <div className={styles.beforeAfterItem}>
              <span className={styles.beforeAfterLabel}>было</span>
              <img src="/images/dr_coffee/dr_coffee_repairlist_old.webp" alt="Было" className={styles.coverImage} />
            </div>
            <div className={styles.beforeAfterItem}>
              <span className={styles.beforeAfterLabel}>стало</span>
              <img src="/images/dr_coffee/dr_coffee_repairlist_new.webp" alt="Стало" className={styles.coverImage} />
            </div>
          </div>
        }
      />

      <CaseBlock
        bg="#F3F4F6"
        images={
          <ImageGroup
            layout="column"
            bleed
            className={styles.imageStackLarge}
            images={[
              { src: '/images/dr_coffee/dr_coffee_brandpage.avif', alt: 'Бренд Jura' },
              { src: '/images/dr_coffee/dr_coffee_articles.avif', alt: 'Статьи' },
              { src: '/images/dr_coffee/dr_coffee_contacts.avif', alt: 'Контакты' },
            ]}
          />
        }
      />

      <CaseBlock
        bg="#141313"
        theme="dark"
        images={<ImageGroup bleed images={[{ src: '/images/dr_coffee/dr_coffee_mobile.avif', alt: 'Мобильная версия' }]} />}
      />
    </>
  )
}
