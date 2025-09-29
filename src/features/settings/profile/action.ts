'use server'

import { updateUserProfileDb } from '@/db/utils/users'
import { authedProcedure } from '@/lib/helpers/authed-procedure'
import fs from 'fs/promises'
import path from 'path'
import { profileSchema } from './schema'

export const updateUserProfileAction = authedProcedure.input(profileSchema).handler(async ({ input: { username, avatar }, ctx: { userId } }) => {
  let avatarPath: string | undefined = undefined

  if (avatar) {
    const maxSize = 2 * 1024 * 1024
    if (avatar.size > maxSize) throw 'File exceeds the maximum allowed size of 2 MB'

    const extension = avatar.name.split('.').pop()
    const baseName = avatar.name.substring(0, avatar.name.lastIndexOf('.'))

    avatarPath = `/avatar/${userId}_${baseName}_${Date.now()}.${extension}`
    const fileData = Buffer.from(await avatar.arrayBuffer())

    const fullDir = path.join(process.cwd(), 'public', 'avatar')
    await fs.mkdir(fullDir, { recursive: true })

    const fullPath = path.join(process.cwd(), 'public', avatarPath)
    await fs.writeFile(fullPath, fileData)
  }

  await updateUserProfileDb({ userId, avatarUrl: avatarPath, name: username })
})
