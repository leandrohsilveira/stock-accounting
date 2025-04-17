import type {
  CustomerDisplayData,
  CustomerMutationData,
  ListParams,
  ListResult,
} from '$lib/shared/models'

export interface CustomerService {
  create(user_id: string, data: CustomerMutationData): Promise<CustomerDisplayData>
  getById(id: string): Promise<CustomerDisplayData | null>
  update(id: string, data: CustomerMutationData): Promise<CustomerDisplayData>
  list(user_id: string, params: ListParams): Promise<ListResult<CustomerDisplayData>>
}
