import tryCatchWrapper from './try-catch'

/** /api */
export const clientFetcher = async <T>(url: string): Promise<T | null> =>
  tryCatchWrapper(
    async () => {
      const res = await fetch(`/api${url}`)
      if (!res.ok) {
        if ([400, 401, 403, 404, 409].includes(res.status)) return null // status code that doesn't need a retry | refetch

        const err: string = await res.json()
        throw new Error(err)
      }

      const data: T = await res.json()
      return data
    },
    { throwOnError: true },
  )
