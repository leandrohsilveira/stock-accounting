import { readListParams } from '$lib/shared/models'
import type { RequestEvent } from './$types'

export async function load({ url, locals: { auth, customer } }: RequestEvent) {
  const user = await auth.requireAuth()

  const params = readListParams(url.searchParams)
  const { search, page, limit } = params
  const result = await customer.list(user.id, params)

  return {
    search,
    page,
    limit,
    result,
  }
}
