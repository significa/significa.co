import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

const Medium = (props: any) => (
  <Svg {...props} width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 0h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm1.423 6.04v5.567a.662.662 0 0 1-.162.553L3 13.765v.211h3.574v-.211l-1.26-1.605a.685.685 0 0 1-.174-.553V6.792l3.137 7.184h.364l2.695-7.184v5.727c0 .152 0 .182-.095.282l-.97.987V14h4.707v-.212l-.936-.964a.301.301 0 0 1-.106-.282V5.458a.301.301 0 0 1 .106-.282L15 4.212V4h-3.317L9.32 10.19 6.63 4H3.151v.212l1.12 1.416c.11.105.167.257.152.412z"
      fill="#111314"
      fillRule="evenodd"
    />
  </Svg>
)

export default Medium
