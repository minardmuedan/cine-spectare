export function timeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ]

  const result = intervals
    .map(({ label, seconds: intervalSeconds }) => {
      const count = Math.floor(seconds / intervalSeconds)
      if (label === 'year' && count >= 1) {
        return date.toLocaleDateString('en-US')
      }
      return count >= 1 ? `${count} ${label}${count > 1 ? 's' : ''} ago` : null
    })
    .find(Boolean)

  return result || 'just now'
}
