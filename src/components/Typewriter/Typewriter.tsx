import type { FC } from 'react'

import { useTypewriter } from '../../hooks/useTypewriter'

interface TypewriterProps {
  words: string[]
  wrapperClassName?: string
  cursorClassName?: string
  cursorNoBlinkClassName?: string
}

export const Typewriter: FC<TypewriterProps> = ({
  words,
  wrapperClassName,
  cursorClassName,
  cursorNoBlinkClassName,
}) => {
  const { text, isBlinking } = useTypewriter(words)

  const cursorClasses = [cursorClassName, !isBlinking && cursorNoBlinkClassName].filter(Boolean).join(' ')

  return (
    <div className={wrapperClassName}>
      <span>{text}</span>
      <span className={cursorClasses || undefined} />
    </div>
  )
}
