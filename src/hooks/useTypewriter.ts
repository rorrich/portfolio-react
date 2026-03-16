import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}

interface UseTypewriterResult {
  text: string
  isBlinking: boolean
}

/**
 * Анимация печатающегося текста:
 * печать → пауза 0.5s → мигание курсора (pauseTime) → стирание → следующее слово.
 */
export function useTypewriter(
  words: string[],
  {
    typingSpeed = 105,
    deletingSpeed = 48,
    pauseTime = 3000,
  }: UseTypewriterOptions = {},
): UseTypewriterResult {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    if (!words.length) return

    let timeoutId: number | undefined
    let blinkTimeoutId: number | undefined

    const currentWord = words[wordIndex]

    const type = () => {
      setIsBlinking(false)

      if (isDeleting) {
        // Стираем текст
        const nextLength = charIndex - 1
        setText(currentWord.substring(0, nextLength))
        setCharIndex(nextLength)

        // Если слово полностью стерто — переходим к следующему
        if (nextLength <= 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }

        timeoutId = window.setTimeout(type, deletingSpeed)
      } else {
        // Печатаем текст
        const nextLength = charIndex + 1
        setText(currentWord.substring(0, nextLength))
        setCharIndex(nextLength)

        // Если слово полностью напечатано
        if (nextLength === currentWord.length) {
          // Включаем мигание через 0.5 секунды
          blinkTimeoutId = window.setTimeout(() => {
            setIsBlinking(true)

            // Через pauseTime начинаем стирать
            timeoutId = window.setTimeout(() => {
              setIsBlinking(false)
              setIsDeleting(true)
              type()
            }, pauseTime)
          }, 500)
        } else {
          timeoutId = window.setTimeout(type, typingSpeed)
        }
      }
    }

    // Запускаем цикл
    timeoutId = window.setTimeout(type, typingSpeed)

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      if (blinkTimeoutId) window.clearTimeout(blinkTimeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, wordIndex, isDeleting, charIndex, typingSpeed, deletingSpeed, pauseTime])

  return { text, isBlinking }
}

