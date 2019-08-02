export default (doc: { type: string; uid: string }): string => {
  if (doc.type === 'project') {
    return `/showcase/${doc.uid}`
  }

  if (doc.type === 'position') {
    return `/careers/${doc.uid}`
  }

  if (doc.type === 'handbook_chapter') {
    return `/handbook/${doc.uid}`
  }

  return '/'
}
