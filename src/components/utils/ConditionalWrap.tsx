import React from 'react'

interface IConditionalWrap {
  condition: boolean
  wrap: (children: React.ReactNode) => React.ReactNode
  children: React.ReactNode
}

const ConditionalWrap = ({
  condition,
  wrap,
  children,
}: IConditionalWrap): any => (condition ? wrap(children) : children)

export default ConditionalWrap
