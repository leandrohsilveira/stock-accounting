export interface ListResult<T> {
  items: T[]
  count: number
}

export interface ListParams {
  page: number
  offset: number
  limit: number
  search: string
}

export interface ListParamsOptions {
  page?: string
  limit?: string
  search?: string
}

export function readListParams(params: URLSearchParams, options?: ListParamsOptions) {
  const search = params.get(options?.search ?? 'search') ?? ''
  const page = Number(params.get(options?.page ?? 'page') ?? '1')
  const limit = Number(params.get(options?.limit ?? 'limit') ?? '10')
  const offset = page * limit - limit

  return {
    search,
    page,
    offset,
    limit,
  }
}
