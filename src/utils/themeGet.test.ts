import { theme } from '@theme'
import { themeGet } from './themeGet'

describe('Theme getter util', () => {
  it('returns one level deep', () => {
    expect(themeGet('colors.foreground', 'black')({ theme })).toEqual(
      theme.colors.foreground
    )
  })

  it('returns two levels deep', () => {
    expect(themeGet('colors.alpha.foreground.10', 'black')({ theme })).toEqual(
      theme.colors.alpha.foreground[10]
    )
  })

  it('returns default value when not found', () => {
    expect(themeGet('foo', 'bar')({ theme })).toEqual('bar')
  })

  it('returns default value when not a string or number (object)', () => {
    expect(themeGet('colors.alpha', 'bar')({ theme })).toEqual('bar')
  })

  it('returns default value when not a string or number (array)', () => {
    expect(themeGet('space', 'bar')({ theme })).toEqual('bar')
  })
})
