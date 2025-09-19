import 'server-only'

const trackers: Record<string, { count: number; expiryDate: number }> = {}
type TLimiter = { isExceed: false; count: number } | { isExceed: true; remainingSeconds: number }

export function rateLimiter(identifier: string, attempt: number, expiredInSecond = 30): TLimiter {
  const existingTracker = trackers[identifier]
  if (!existingTracker) {
    trackers[identifier] = { count: attempt, expiryDate: Date.now() + expiredInSecond * 1000 }
    return { isExceed: false, count: trackers[identifier].count }
  }

  if (trackers[identifier].expiryDate - Date.now() < 1) {
    delete trackers[identifier]
    trackers[identifier] = { count: attempt, expiryDate: Date.now() + expiredInSecond * 1000 }
    return { isExceed: false, count: trackers[identifier].count }
  }

  if (trackers[identifier].expiryDate)
    if (trackers[identifier].count <= 1) {
      const remainingSeconds = Math.floor((trackers[identifier].expiryDate - Date.now()) / 1000)
      return { isExceed: true, remainingSeconds }
    }

  trackers[identifier].count = existingTracker.count - 1
  return { isExceed: false, count: existingTracker.count - 1 }
}

setInterval(
  () => {
    console.log('TRACKERS: ', { trackers })
    const expiredTrackersIdentifer = Object.keys(trackers).filter(key => trackers[key].expiryDate - Date.now() < 1)
    if (expiredTrackersIdentifer.length > 0) expiredTrackersIdentifer.map(expiredTrackerIdentifier => delete trackers[expiredTrackerIdentifier])
  },
  60_000 * 60 * 6, // 6 hours
).unref()
