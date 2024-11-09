import { z } from 'zod'

export const viewHistoryIdSchema = z.object({ id: z.string().min(1, 'id of history is required') })
