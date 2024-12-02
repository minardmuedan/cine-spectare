import 'server-only'

import tryCatchWrapper from '../helpers/try-catch'

export const TMDBFetcher = <T>(url: string) =>
  tryCatchWrapper(async () => {
    const res = await fetch(`https://api.themoviedb.org/3${url}`, {
      cache: 'force-cache',
      headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
    })

    if (!res.ok) {
      const error: { status_message: string } = await res.json()
      throw new Error(error.status_message)
    }

    const data: T = await res.json()
    return data
  })
