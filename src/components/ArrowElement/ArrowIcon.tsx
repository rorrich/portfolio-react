export type ArrowIconType = 'right' | 'up'

export interface ArrowIconProps {
  type: ArrowIconType
  className?: string
}

const configByType: Record<
  ArrowIconType,
  { width: number; height: number; viewBox: string; spriteHref: string }
> = {
  right: {
    width: 12,
    height: 9,
    viewBox: '0 0 13 10',
    spriteHref: '/images/sprite.svg#icon-arrow-right',
  },
  up: {
    width: 12,
    height: 12,
    viewBox: '0 0 12 12',
    spriteHref: '/images/sprite.svg#icon-arrow-up',
  },
}

export function ArrowIcon({ type, className }: ArrowIconProps) {
  const cfg = configByType[type]

  return (
    <svg
      className={className}
      width={cfg.width}
      height={cfg.height}
      viewBox={cfg.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
    >
      <use href={cfg.spriteHref} />
    </svg>
  )
}

