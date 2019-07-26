export default (doc: { type: string; uid: string }): string => {
  if (doc.type === 'project') {
    return `/showcase/${doc.uid}`
  }

  if (doc.type === 'position') {
    return `/careers/${doc.uid}`
  }

  return '/'
}
