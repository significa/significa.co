const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default (str: string) => {
  // Safari requires an specific format date, like DD/MM/YYYY
  const fixDate = str.split('T')[0].replace(/-/gm, '/')

  const date = new Date(fixDate)
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return `${monthNames[monthIndex]} ${year}`
}
