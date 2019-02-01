import { hexToRgb } from './hexToRgb'

describe('Converting hex to rgb', () => {
  it('returns normal HEX converted', () => {
    const text = '#0154FF'
    const expected = '1, 84, 255'
    expect(hexToRgb(text)).toEqual(expected)
  })

  it('returns short hex converted', () => {
    const text = '#EE5'
    const expected = '238, 238, 85'
    expect(hexToRgb(text)).toEqual(expected)
  })

  it('returns short hex converted', () => {
    const text = '#AD4'
    const expected = '170, 221, 68'
    expect(hexToRgb(text)).toEqual(expected)
  })

  it('returns normal string unconverted', () => {
    const text = 'red'
    const expected = 'red'
    expect(hexToRgb(text)).toEqual(expected)
  })
})
