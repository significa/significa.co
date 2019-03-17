import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import * as S from './styled'

interface IGeneralContacts {
  contactYaml: {
    contacts: {
      title: string
      columns: Array<{
        title: string
        mail?: string
        phone?: string
        address1?: string
        address2?: string
      }>
    }
  }
}

const Contacts: React.FC<IGeneralContacts> = ({
  contactYaml: { contacts },
}) => {
  return (
    <S.Wrapper>
      <S.Title>{contacts.title}</S.Title>
      <S.Columns>
        {contacts.columns.map((column, index) => {
          return (
            <div key={index}>
              <S.ColumnTitle>{column.title}</S.ColumnTitle>
              {column.mail && (
                <S.MailLink href={`mailto:${column.mail}`}>
                  {column.mail}
                </S.MailLink>
              )}
              {column.phone && (
                <S.PhoneLink
                  href={`tel:00${column.phone.replace(/[ +()]/gi, '')}`}
                >
                  {column.phone}
                </S.PhoneLink>
              )}
              {column.address1 && <S.Text>{column.address1}</S.Text>}
              {column.address2 && <S.Text>{column.address2}</S.Text>}
            </div>
          )
        })}
      </S.Columns>
    </S.Wrapper>
  )
}

const ConnectedContacts = () => {
  return (
    <StaticQuery
      query={generalContactsQuery}
      render={(data: IGeneralContacts) => <Contacts {...data} />}
    />
  )
}

const generalContactsQuery = graphql`
  query GeneralContactsQuery {
    contactYaml {
      contacts {
        title
        columns {
          title
          mail
          phone
          address1
          address2
        }
      }
    }
  }
`

export default ConnectedContacts
