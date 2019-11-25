import React from 'react'

const SvgComponent = (props: any) => (
  <svg width={20} height={20} {...props}>
    <title>{'3. Icons/20x20/Website'}</title>
    <defs>
      <rect id="prefix__a" x={3} y={3} width={14} height={14} rx={7} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h20v20H0z" />
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <use stroke="#131415" xlinkHref="#prefix__a" />
      <ellipse
        stroke="#131415"
        mask="url(#prefix__b)"
        cx={10}
        cy={10}
        rx={3}
        ry={7}
      />
      <ellipse
        stroke="#131415"
        mask="url(#prefix__b)"
        transform="rotate(-90 10 4)"
        cx={10}
        cy={4}
        rx={3}
        ry={7}
      />
      <ellipse
        stroke="#131415"
        mask="url(#prefix__b)"
        transform="rotate(-90 10 16)"
        cx={10}
        cy={16}
        rx={3}
        ry={7}
      />
      <path stroke="#131415" mask="url(#prefix__b)" d="M3 10h14" />
    </g>
  </svg>
)

export default SvgComponent
