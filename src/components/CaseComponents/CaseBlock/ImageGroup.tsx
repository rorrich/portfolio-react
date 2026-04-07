import clsx from 'clsx'
import styles from './ImageGroup.module.css'

interface ImageGroupImage {
  src: string
  alt: string
}

interface ImageGroupProps {
  images: ImageGroupImage[]
  layout?: 'row' | 'column'
  bleed?: boolean
  fit?: 'contain' | 'cover'
  className?: string
  imageClassName?: string
}

export const ImageGroup = ({
  images,
  layout = 'row',
  bleed = false,
  fit,
  className,
  imageClassName,
}: ImageGroupProps) => (
  <div
    className={clsx(
      styles.imageGroup,
      styles[layout],
      bleed && styles.bleed,
      fit === 'cover' && styles.fitCover,
      className,
    )}
  >
    {images.map((img, i) => (
      <img
        key={i}
        src={img.src}
        alt={img.alt}
        className={clsx(styles.image, imageClassName)}
        loading="lazy"
        decoding="async"
      />
    ))}
  </div>
)
