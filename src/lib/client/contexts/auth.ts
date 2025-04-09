import type { UserContext } from '$lib/shared/models'
import { getContext, setContext } from 'svelte'

const contextId = Symbol('authContext')

export function provideAuthContext(data: () => UserContext) {
  setContext(contextId, data)
}

export function useAuthContext(): () => UserContext {
  return getContext(contextId)
}
