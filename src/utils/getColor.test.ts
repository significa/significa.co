import { theme } from '@theme'
import { getColor } from './getColor'

describe('Get color util', () => {
  it('returns foreground  by default', () => {
    expect(getColor({ theme })).toEqual(theme.colors.foreground)
  })

  it('returns highlight', () => {
    expect(getColor({ color: 'highlight', theme })).toEqual(
      theme.colors.highlight
    )
  })

  it('returns background', () => {
    expect(getColor({ color: 'background', theme })).toEqual(
      theme.colors.background
    )
  })

  it('returns foreground', () => {
    expect(getColor({ color: 'foreground', theme })).toEqual(
      theme.colors.foreground
    )
  })

  it('returns medium', () => {
    expect(getColor({ color: 'medium', theme })).toEqual(theme.colors.medium)
  })

  it('returns subtle', () => {
    expect(getColor({ color: 'subtle', theme })).toEqual(theme.colors.subtle)
  })

  it('returns error', () => {
    expect(getColor({ color: 'error', theme })).toEqual(theme.colors.error)
  })
})
