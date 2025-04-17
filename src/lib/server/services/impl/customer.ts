import type {
  CustomerMutationData,
  CustomerDisplayData,
  ListResult,
  ListParams,
} from '$lib/shared/models'
import { assert } from '$lib/shared/util'
import { assertNoError, type DatabaseService, type CustomerService } from '$lib/server/services'

export class CustomerServiceImpl implements CustomerService {
  constructor(private database: DatabaseService) {}

  async create(user_id: string, payload: CustomerMutationData): Promise<CustomerDisplayData> {
    const { data, error } = await this.database
      .from('customer')
      .insert({ ...payload, user_id })
      .select('id, name, doc_type, doc_value')
      .single()

    assertNoError(error, 'unable to insert customer')

    assert(data !== null, 'customer insert must return at least one item')

    return {
      id: data.id,
      doc_type: data.doc_type,
      doc_value: data.doc_value,
      name: data.name,
    }
  }

  async update(id: string, payload: CustomerMutationData): Promise<CustomerDisplayData> {
    const { data, error } = await this.database
      .from('customer')
      .update({ ...payload })
      .eq('id', id)
      .select('id, name, doc_type, doc_value')
      .single()

    assertNoError(error, 'unable to update customer')

    return {
      id: data.id,
      doc_type: data.doc_type,
      doc_value: data.doc_value,
      name: data.name,
    }
  }

  async getById(id: string): Promise<CustomerDisplayData | null> {
    const { data, error } = await this.database
      .from('customer')
      .select('id, name, doc_type, doc_value')
      .eq('id', id)
      .maybeSingle()

    assertNoError(error, 'unable to get customer by id')

    if (data === null) return null

    return {
      id: data.id,
      doc_type: data.doc_type,
      doc_value: data.doc_value,
      name: data.name,
    }
  }

  async list(
    user_id: string,
    { search, limit, offset }: ListParams,
  ): Promise<ListResult<CustomerDisplayData>> {
    const { data, error: dataError } = await this.database
      .from('customer')
      .select('id, name, doc_type, doc_value, user_id')
      .eq('user_id', user_id)
      .or(`name.ilike.%${search}%,doc_type.ilike.%${search}%,doc_value.ilike.%${search}%`)
      .range(offset, limit)

    assertNoError(dataError, 'unable to fetch customers')

    const { count, error: countError } = await this.database
      .from('customer')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user_id)
      .or(`name.ilike.%${search}%,doc_type.ilike.%${search}%,doc_value.ilike.%${search}%`)

    assertNoError(countError, 'unable to count customers')
    assert(count !== null, 'count should not be null')

    return {
      items: data.map((item) => ({
        id: item.id,
        name: item.name,
        doc_type: item.doc_type,
        doc_value: item.doc_value,
      })),
      count,
    }
  }
}
