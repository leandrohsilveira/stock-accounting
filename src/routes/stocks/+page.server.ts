import type { RequestEvent } from './$types'

export async function load({ url, locals: { auth, stock } }: RequestEvent) {
  const user = await auth.requireAuth()

  const search = String(url.searchParams.get('search') ?? '')
  const page = Number(url.searchParams.get('page') ?? '1')
  const limit = Number(url.searchParams.get('limit') ?? '10')
  const offset = page * limit - limit

  const result = await stock.list(user.id, search, { offset, limit })

  return {
    search,
    page,
    limit,
    result,
  }
}
