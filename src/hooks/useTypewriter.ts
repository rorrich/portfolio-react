import { useEffect, useRef, useState } from 'react'

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
  const [isBlinking, setIsBlinking] = useState(false)

  const wordsRef = useRef(words)
  const charIndexRef = useRef(0)
  const wordIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  // Константы (из опций) храним в ref, чтобы эффект был []
  const baseTypingSpeedRef = useRef(typingSpeed)
  const baseDeletingSpeedRef = useRef(deletingSpeed)
  const basePauseTimeRef = useRef(pauseTime)

  // Текущая задержка следующего тика (мутабельная)
  const typingSpeedRef = useRef(baseTypingSpeedRef.current)

  const timeoutRef = useRef<number | undefined>(undefined)
  const blinkTimeoutRef = useRef<number | undefined>(undefined)
  const deleteStartTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const clearAll = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      if (blinkTimeoutRef.current) window.clearTimeout(blinkTimeoutRef.current)
      if (deleteStartTimeoutRef.current) window.clearTimeout(deleteStartTimeoutRef.current)
    }

    function type() {
      const wordsList = wordsRef.current
      if (!wordsList.length) return

      const currentWord = wordsList[wordIndexRef.current] ?? ''

      if (isDeletingRef.current) {
        charIndexRef.current -= 1
        setText(currentWord.substring(0, charIndexRef.current))
        typingSpeedRef.current = baseDeletingSpeedRef.current
      } else {
        charIndexRef.current += 1
        setText(currentWord.substring(0, charIndexRef.current))
        typingSpeedRef.current = baseTypingSpeedRef.current
      }

      // Слово полностью напечатано
      if (!isDeletingRef.current && charIndexRef.current === currentWord.length) {
        setIsBlinking(false)

        blinkTimeoutRef.current = window.setTimeout(() => {
          setIsBlinking(true)

          deleteStartTimeoutRef.current = window.setTimeout(() => {
            isDeletingRef.current = true
            setIsBlinking(false)
            type()
          }, basePauseTimeRef.current)
        }, 500)

        return
      }

      // Слово полностью стёрто
      if (isDeletingRef.current && charIndexRef.current === 0) {
        isDeletingRef.current = false
        wordIndexRef.current = (wordIndexRef.current + 1) % wordsList.length
      }

      timeoutRef.current = window.setTimeout(type, typingSpeedRef.current)
    }

    if (!wordsRef.current.length) return
    timeoutRef.current = window.setTimeout(type, typingSpeedRef.current)

    return () => {
      clearAll()
    }
  }, [])

  return { text, isBlinking }
}

