import type {
  CustomerDisplayData,
  CustomerMutationData,
  ListResult,
  Pageable,
} from '$lib/shared/models'

export interface CustomerService {
  create(user_id: string, data: CustomerMutationData): Promise<CustomerDisplayData>
  getById(id: string): Promise<CustomerDisplayData | null>
  update(id: string, data: CustomerMutationData): Promise<CustomerDisplayData>
  list(user_id: string, search: string, page: Pageable): Promise<ListResult<CustomerDisplayData>>
}
