export const formatDate = (timestamp: string) => {
  const d = new Date(timestamp)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}
