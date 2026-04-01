import type { SVGAttributes } from 'react'

export type ArrowIconType = 'right' | 'up'

export interface ArrowIconProps extends SVGAttributes<SVGSVGElement> {
  type: ArrowIconType
  className?: string
}

const configByType: Record<ArrowIconType, { viewBox: string; spriteHref: string }> = {
  right: {
    viewBox: '0 0 13 10',
    spriteHref: '/images/sprite.svg#icon-arrow-right',
  },
  up: {
    viewBox: '0 0 12 12',
    spriteHref: '/images/sprite.svg#icon-arrow-up',
  },
}

export function ArrowIcon({ type, className = '', ...props }: ArrowIconProps) {
  const cfg = configByType[type]

  return (
    <svg
      className={className}
      viewBox={cfg.viewBox}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <use href={cfg.spriteHref} />
    </svg>
  )
}

