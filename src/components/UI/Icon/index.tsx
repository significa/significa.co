import React from 'react'

export type IconOptions = 'arrow' | 'chevron' | 'clear' | 'clip'

const iconsMap: { [key in IconOptions]: any } = {
  arrow: require('./icons/arrow.svg'),
  chevron: require('./icons/chevron.svg'),
  clear: require('./icons/clear.svg'),
  clip: require('./icons/clip.svg'),
}

type IconProp = React.HTMLProps<HTMLOrSVGImageElement> & {
  asset: IconOptions
}

const Icon: React.FC<IconProp> = ({ asset, ...props }) => {
  if (iconsMap[asset].ReactComponent) {
    const Asset = iconsMap[asset].ReactComponent

    return <Asset {...props} />
  }

  return <img src={iconsMap[asset].default} className={props.className} />
}

export default Icon
