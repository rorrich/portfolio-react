import { useMemo } from 'react'

import { CaseBlock } from '../../../components/CaseComponents/CaseBlock/CaseBlock'
import { ImageGroup } from '../../../components/CaseComponents/CaseBlock/ImageGroup'
import { TextGroup } from '../../../components/CaseComponents/CaseBlock/TextGroup'
import { CaseHero } from '../../../components/CaseComponents/CaseHero/CaseHero'
import { cases } from '../../../data/cases'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { usePageReady } from '../../../hooks/usePageReady'

export function CleannerPage() {
  usePageReady()
  useDocumentTitle('Cleanner — мобильное приложение для робота пылесоса')

  const cleanner = useMemo(() => cases.find((p) => p.id === 'cleanner'), [])
  if (!cleanner) return null

  return (
    <>
      <CaseHero
        backgroundImage="/images/cleanner/cleanner_main.avif"
        title={cleanner.title}
        subtitle={cleanner.descriptionFull}
        meta={[
          { label: 'индустрия', value: cleanner.industry },
          { label: 'дата', value: cleanner.dateFull },
          { label: 'сайт', value: cleanner.websiteLabel },
        ]}
      />

      <CaseBlock
        text={
          <TextGroup
            label="А зачем оно вообще надо?"
            layout="column"
            description={
              <>
                <p>
                  Это учебный проект, посвященный платформенному дизайну и принципам Material Design 3. Главная цель —
                  спроектировать приложение для управления умным устройством, следуя нативным паттернам Android.
                </p>
                <p>
                  Почему робот-пылесос? Я активный пользователь робота-пылесоса и каждый день сталкиваюсь с недостатками его
                  текущего приложения. Некоторые сценарии переусложнены, а нужных функций просто нет под рукой. Я решила
                  превратить этот пользовательский опыт в дизайн-задачу: исправить UX-ошибки и сделать управление устройством
                  интуитивным.
                </p>
              </>
            }
          />
        }
        images={
          <ImageGroup
            fit="cover"
            images={[
              { src: '/images/cleanner/cleanner_mockup.avif', alt: 'Mockup' },
              { src: '/images/cleanner/cleanner_mainbtn.avif', alt: 'Main button' },
            ]}
          />
        }
      />

      <CaseBlock
        bg="#111114"
        theme="dark"
        text={
          <TextGroup
            label="главный экран"
            description={
              <>
                <p>
                  На главном экране — только ключевая информация: текущий статус, заряд и заполненность пылесборника. Здесь
                  же доступна диагностика расходников с визуализацией их расположения.
                </p>
                <p>
                  Особый акцент сделан на эмоциональной фиче — кастомной озвучке. Возможность менять реплики робота
                  превращает рутину в развлечение и генерирует виральный контент для соцсетей. Функцию можно гибко настроить
                  или отключить. В отдельный блок вынесены уведомления о завершении уборки и ошибках.
                </p>
              </>
            }
          />
        }
        images={<ImageGroup images={[{ src: '/images/cleanner/cleanner_screenshots1.avif', alt: 'Screenshots' }]} />}
      />

      <CaseBlock
        bg="#111114"
        theme="dark"
        images={<ImageGroup bleed images={[{ src: '/images/cleanner/cleanner_robot.avif', alt: 'Robot' }]} />}
      />

      <CaseBlock
        bg="#111114"
        theme="dark"
        text={
          <TextGroup
            label="карта"
            description={
              <>
                <p>
                  При первом запуске робот сканирует помещение, отображая статус процесса через прогресс-бар. Итогом
                  становится интерактивная карта с автоматически размеченными комнатами.
                </p>
                <p>
                  Пользователь получает полный контроль над навигацией: может переименовывать помещения, двигать границы зон и
                  добавлять новые. Критически важная функция — настройка виртуальных стен («стоп-зон»), исключающая
                  застревание в проводах или наезд на миски животных.
                </p>
              </>
            }
          />
        }
        images={<ImageGroup images={[{ src: '/images/cleanner/cleanner_screenshots2.avif', alt: 'Screenshots' }]} />}
      />

      <CaseBlock
        bg="#111114"
        theme="dark"
        images={
          <ImageGroup
            images={[
              { src: '/images/cleanner/cleanner_mockups_phone.avif', alt: 'Phone mockups' },
              { src: '/images/cleanner/cleanner_robot2.avif', alt: 'Robot 2' },
            ]}
          />
        }
      />
    </>
  )
}
