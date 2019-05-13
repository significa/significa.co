import * as React from 'react'

import Coletiv from '../../assets/Coletiv'
import Adamant from '../../assets/Adamant'

export type CompanyType = 'coletiv' | 'adamant'

const companies: { [key in CompanyType]: React.FC<{}> } = {
  coletiv: Coletiv,
  adamant: Adamant,
}

const CompanyLogo: React.FC<{ company: CompanyType }> = ({ company }) => {
  const Logo = companies[company] || ''

  return <Logo />
}

export default CompanyLogo
