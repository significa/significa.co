import * as React from 'react'

import Adamant from '../../assets/Adamant'
import Coletiv from '../../assets/Coletiv'

export type CompanyType = 'coletiv' | 'adamant'

const companies: { [key in CompanyType]: React.FC<Record<string, never>> } = {
  coletiv: Coletiv,
  adamant: Adamant,
}

const CompanyLogo: React.FC<{ company: CompanyType }> = ({ company }) => {
  const Logo = companies[company] || ''

  return <Logo />
}

export default CompanyLogo
