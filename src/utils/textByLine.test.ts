import { textByLine } from './textByLine'

describe('Text by line util', () => {
  it('returns text in array splitted by line breaks', () => {
    const text = 'First line.\nSecond line.'
    const expected = ['First line.', 'Second line.']
    expect(textByLine(text)).toEqual(expected)
  })
})
