import type { LayoutServerLoadEvent } from './$types'

export async function load({ locals: { auth } }: LayoutServerLoadEvent) {
  const currentUser = await auth.getCurrentUser()
  return {
    currentUser,
  }
}
