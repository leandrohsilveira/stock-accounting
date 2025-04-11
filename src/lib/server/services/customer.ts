import type {
  CustomerDisplayData,
  CustomerMutationData,
  ListResult,
  Pageable,
} from '$lib/shared/models'

export interface CustomerService {
  create(data: CustomerMutationData): Promise<CustomerDisplayData>
  getById(id: string): Promise<CustomerDisplayData | null>
  list(page: Pageable): Promise<ListResult<CustomerDisplayData>>
}
