export const formatDate = (timestamp: string) => {
  const d = new Date(timestamp)
  return d.toLocaleDateString('fr-FR') + ' ' + d.toLocaleTimeString('fr-FR')
}

export const formatRelativeDate = (timestamp: string) => {
  const now = new Date()
  return dateDifference(timestamp, now.toISOString())
}

export const dateDifference = (oldDate: string, recentDate: string) => {
  const old = new Date(oldDate) as unknown as number
  const recent = new Date(recentDate) as unknown as number
  const diffInSeconds = Math.floor((recent - old) / 1000)

  const seconds = diffInSeconds % 60
  const minutes = Math.floor(diffInSeconds / 60) % 60
  const hours = Math.floor(diffInSeconds / 3600) % 24
  const days = Math.floor(diffInSeconds / 86400)

  if (days > 0) {
    return `${days} jour${days > 1 ? 's' : ''}`
  } else if (hours > 0) {
    return `${hours} heure${hours > 1 ? 's' : ''}`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  } else if (seconds > 0) {
    return `${seconds} seconde${seconds > 1 ? 's' : ''}`
  } else {
    return 'just now'
  }
}
