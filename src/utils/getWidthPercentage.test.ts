import { getWidthPercentage } from './getWidthPercentage'

describe('Get width percentage from string', () => {
  it('returns 50% with 1/2', () => {
    expect(getWidthPercentage('1/2')).toBe('50%')
  })

  it('returns 25% with 3/12', () => {
    expect(getWidthPercentage('3/12')).toBe('25%')
  })

  it('returns 100% with some rubbish', () => {
    expect(getWidthPercentage('foo')).toBe('100%')
  })
})
