import styled from '../../theme'
import { Link as GatsbyLink } from 'gatsby'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 1.45rem;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`

const Link = styled(GatsbyLink)`
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
`

const Secondary = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
`
const Medium = styled.p`
  color: ${({ theme }) => theme.colors.medium};
`
const Subtle = styled.p`
  color: ${({ theme }) => theme.colors.subtle};
`

export { Wrapper, Content, Link, Secondary, Medium, Subtle }
