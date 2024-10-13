'use client'

import { setupServerActionHooks } from 'zsa-react-query'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'

export const useServerActionMutation = setupServerActionHooks({
  hooks: { useQuery: useQuery, useMutation: useMutation, useInfiniteQuery: useInfiniteQuery },
}).useServerActionMutation
