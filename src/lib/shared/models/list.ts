export interface Pageable {
  limit: number
  offset: number
}

export interface ListResult<T> {
  items: T[]
  count: number
}
