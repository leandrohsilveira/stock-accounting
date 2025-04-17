import type {
  ListParams,
  ListResult,
  StockDisplayData,
  StockMutationData,
} from '$lib/shared/models'

export interface StockService {
  create(user_id: string, payload: StockMutationData): Promise<StockDisplayData>
  update(id: string, payload: StockMutationData): Promise<StockDisplayData>
  getById(id: string): Promise<StockDisplayData | null>
  list(user_id: string, params: ListParams): Promise<ListResult<StockDisplayData>>
}
