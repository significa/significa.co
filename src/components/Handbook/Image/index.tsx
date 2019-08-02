import React from 'react'

const Image: React.FC<{ url: string; alt: string }> = ({ url, alt }) => {
  return (
    <figure>
      <img src={url} alt={alt} />
      <figcaption>{alt}</figcaption>
    </figure>
  )
}

export default Image
