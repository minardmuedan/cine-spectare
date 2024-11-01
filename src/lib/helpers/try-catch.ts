// typescript overloading

export default async function tryCatchWrapper<T>(fn: () => Promise<T>, options: { throwOnError: true }): Promise<T>

export default async function tryCatchWrapper<T>(fn: () => Promise<T>, options?: { throwOnError: false }): Promise<[undefined, T] | [Error]>

export default async function tryCatchWrapper<T>(fn: () => Promise<T>, options?: { throwOnError: boolean }): Promise<T | [undefined, T] | [Error]> {
  try {
    const data = await fn()
    return options?.throwOnError ? data : [undefined, data]
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    if (options?.throwOnError) throw error
    return [error]
  }
}
