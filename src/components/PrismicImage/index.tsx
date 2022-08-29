import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData,
} from 'gatsby-plugin-image'
import React, { CSSProperties } from 'react'

type Props = GatsbyImageProps & {
  src?: string
  image?: IGatsbyImageData
  alt?: string
  className?: string
  fallbackImgStyle?: CSSProperties
}

/**
 * More info on why this component is needed:
 * https://github.com/angeloashmore/gatsby-source-prismic/blob/v3-beta/docs/previews.md#images
 */
const PrismicImage: React.FC<Props> = ({
  src,
  image,
  alt,
  className,
  fallbackImgStyle = {},
  ...props
}) => {
  return src ? (
    <div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <picture>
        <img
          width="100%"
          height="100%"
          src={src}
          loading="lazy"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            ...fallbackImgStyle,
          }}
          alt={alt}
        />
      </picture>
    </div>
  ) : (
    <GatsbyImage image={image} className={className} alt={alt} {...props} />
  )
}

export default PrismicImage
