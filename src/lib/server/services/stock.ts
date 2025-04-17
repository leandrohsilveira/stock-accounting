import type { ListResult, Pageable, StockDisplayData, StockMutationData } from '$lib/shared/models'

export interface StockService {
  create(user_id: string, payload: StockMutationData): Promise<StockDisplayData>
  update(id: string, payload: StockMutationData): Promise<StockDisplayData>
  getById(id: string): Promise<StockDisplayData | null>
  list(user_id: string, search: string, pageable: Pageable): Promise<ListResult<StockDisplayData>>
}
