import { theme } from '@theme'
import { themeGet } from './themeGet'

describe('Theme getter util', () => {
  it('returns one level deep', () => {
    expect(themeGet('colors.foreground', 'black')({ theme })).toEqual(
      theme.colors.foreground
    )
  })

  it('returns default value when not found', () => {
    expect(themeGet('foo', 'bar')({ theme })).toEqual('bar')
  })

  it('returns default value when not a string or number (function)', () => {
    expect(themeGet('transitions.ease', 'bar')({ theme })).toEqual('bar')
  })

  it('returns default value when not a string or number (array)', () => {
    expect(themeGet('space', 'bar')({ theme })).toEqual('bar')
  })
})
