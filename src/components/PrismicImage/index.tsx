import React, { CSSProperties } from 'react'
import Img, { FluidObject, FixedObject, GatsbyImageProps } from 'gatsby-image'

type Props = GatsbyImageProps & {
  src?: string
  fixed?: FixedObject
  fluid?: FluidObject
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
  fixed,
  fluid,
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
          // @ts-ignore loading is a new attr that will be added eventually
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
    <Img
      className={className}
      alt={alt}
      fluid={fluid}
      fixed={fixed}
      {...props}
    />
  )
}

export default PrismicImage
