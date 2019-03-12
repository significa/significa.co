import React from 'react'

import * as S from './styled'

interface IButton {
  pending?: boolean
  [key: string]: any
}

const Button: React.FC<IButton> = ({ pending, ...props }) => (
  <S.Button {...props}>
    {props.children}
    {pending ? <S.Loader /> : <S.Arrow />}
  </S.Button>
)

export default Button
