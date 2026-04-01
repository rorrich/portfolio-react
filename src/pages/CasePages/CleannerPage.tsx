import { useEffect, useMemo } from 'react'
import { projects } from '../../data/projects'

import { CaseHero } from '../../components/CaseComponents/CaseHero/CaseHero'
import { CaseSection } from '../../components/CaseComponents/CaseSection'
import { usePageReady } from '../../hooks/usePageReady'

import './case-layout.css'

export function CleannerPage() {
  usePageReady()

  useEffect(() => {
    document.body.classList.add('cleanner-page')
    return () => {
      document.body.classList.remove('cleanner-page')
    }
  }, [])

  const cleanner = useMemo(() => projects.find((p) => p.id === 'cleanner'), [])
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

      {/* Блок 1: А зачем оно вообще надо? */}
      <CaseSection>
        <div className="container">
          <div className="text-stack">
            <h4 className="text-stack__head">А зачем оно вообще надо?</h4>
            <div className="text-stack__body">
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
            </div>
          </div>

          <div className="image-grid">
            <img src="/images/cleanner/cleanner_mockup.avif" alt="Mockup" className="case-image" />
            <img
              src="/images/cleanner/cleanner_mainbtn.avif"
              alt="Main button"
              className="case-image"
              style={{ backgroundColor: '#111114' }}
            />
          </div>
        </div>
      </CaseSection>

      {/* Блок 2: Главный экран */}
      <CaseSection isDark>
        <div className="container">
          <div className="text-split">
            <p className="text-split__head">главный экран</p>
            <div className="text-split__body">
              <p>
                На главном экране — только ключевая информация: текущий статус, заряд и заполненность пылесборника. Здесь
                же доступна диагностика расходников с визуализацией их расположения.
              </p>
              <p>
                Особый акцент сделан на эмоциональной фиче — кастомной озвучке. Возможность менять реплики робота
                превращает рутину в развлечение и генерирует виральный контент для соцсетей. Функцию можно гибко настроить
                или отключить. В отдельный блок вынесены уведомления о завершении уборки и ошибках.
              </p>
            </div>
          </div>

          <img src="/images/cleanner/cleanner_screenshots1.avif" alt="Screenshots" className="case-image" />
        </div>
      </CaseSection>

      {/* Блок 3: Робот */}
      <CaseSection isDark>
        <img src="/images/cleanner/cleanner_robot.avif" alt="Robot" className="case-image" />
      </CaseSection>

      {/* Блок 4: Карта */}
      <CaseSection isDark>
        <div className="container">
          <div className="text-split">
            <p className="text-split__head">карта</p>
            <div className="text-split__body">
              <p>
                При первом запуске робот сканирует помещение, отображая статус процесса через прогресс-бар. Итогом
                становится интерактивная карта с автоматически размеченными комнатами.
              </p>
              <p>
                Пользователь получает полный контроль над навигацией: может переименовывать помещения, двигать границы зон и
                добавлять новые. Критически важная функция — настройка виртуальных стен («стоп-зон»), исключающая
                застревание в проводах или наезд на миски животных.
              </p>
            </div>
          </div>

          <img src="/images/cleanner/cleanner_screenshots2.avif" alt="Screenshots" className="case-image" />
        </div>
      </CaseSection>

      {/* Блок 5: Финальные изображения */}
      <CaseSection isDark>
        <div className="container">
          <div className="image-grid">
            <img src="/images/cleanner/cleanner_mockups_phone.avif" alt="Phone mockups" className="case-image" />
            <img src="/images/cleanner/cleanner_robot2.avif" alt="Robot 2" className="case-image" />
          </div>
        </div>
      </CaseSection>
    </>
  )
}
