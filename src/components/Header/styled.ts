import styled from '../../theme'
import { Link as GatsbyLink } from 'gatsby'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand};
  margin-bottom: 1.45rem;

  transition: background-color 0.2s ease;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Link = styled(GatsbyLink)`
  color: white;
  text-decoration: none;
`

export { Wrapper, Content, Link }
