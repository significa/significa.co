import React from 'react'

export type IconOptions = 'arrow'

const iconsMap: { [key in IconOptions]: any } = {
  arrow: require('./icons/arrow.svg'),
}

type IconProp = React.HTMLProps<HTMLOrSVGImageElement> & {
  asset: IconOptions
}

const Icon: React.FC<IconProp> = ({ asset, ...props }) => {
  const Asset = iconsMap[asset].default

  return <Asset {...props} />
}

export default Icon
