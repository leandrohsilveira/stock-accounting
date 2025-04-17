import type { StockMutationData, StockDisplayData, Pageable, ListResult } from '$lib/shared/models'
import { assert } from '$lib/shared/util'
import { assertNoError, type DatabaseService } from '../database'
import type { StockService } from '../stock'

export class StockServiceImpl implements StockService {
  constructor(private database: DatabaseService) {}

  async create(user_id: string, payload: StockMutationData): Promise<StockDisplayData> {
    const { data, error } = await this.database
      .from('stock')
      .insert({ ...payload, user_id })
      .select('id, symbol_id, display_name')
      .single()

    assertNoError(error, 'unable to insert stock')

    assert(data !== null, 'stock insert must return at least one item')

    return {
      id: data.id,
      symbol_id: data.symbol_id,
      display_name: data.display_name ?? undefined,
    }
  }

  async update(id: string, payload: StockMutationData): Promise<StockDisplayData> {
    const { data, error } = await this.database
      .from('stock')
      .update({ ...payload })
      .eq('id', id)
      .select('id, symbol_id, display_name')
      .single()

    assertNoError(error, 'unable to update stock')

    return {
      id: data.id,
      symbol_id: data.symbol_id,
      display_name: data.display_name ?? undefined,
    }
  }

  async getById(id: string): Promise<StockDisplayData | null> {
    const { data, error } = await this.database
      .from('stock')
      .select('id, symbol_id, display_name')
      .eq('id', id)
      .maybeSingle()

    assertNoError(error, 'unable to get stock by id')

    if (data === null) return null

    return {
      id: data.id,
      symbol_id: data.symbol_id,
      display_name: data.display_name ?? undefined,
    }
  }

  async list(
    user_id: string,
    search: string,
    { offset, limit }: Pageable,
  ): Promise<ListResult<StockDisplayData>> {
    const { data, error: dataError } = await this.database
      .from('stock')
      .select(`id, symbol_id, display_name`)
      .eq('user_id', user_id)
      .or(`symbol_id.ilike.%${search}%,display_name.ilike.%${search}%`)
      .range(offset, limit)

    assertNoError(dataError, 'unable to fetch stocks')

    const { count, error: countError } = await this.database
      .from('stock')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user_id)
      .or(`symbol_id.ilike.%${search}%,display_name.ilike.%${search}%`)

    assertNoError(countError, 'unable to count stocks')
    assert(count !== null, 'count should not be null')

    return {
      items: data.map((item) => ({
        id: item.id,
        symbol_id: item.symbol_id,
        display_name: item.display_name ?? undefined,
      })),
      count,
    }
  }
}
