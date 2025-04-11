import type { FormMapInput } from '../util/form'

export type DocTypes = 'cpf' | 'cnpj'

export interface CustomerDisplayData {
  id: string
  name: string
  doc_type: DocTypes
  doc_value: string
}

export interface CustomerMutationData {
  name: string
  doc_type: DocTypes
  doc_value: string
}

export const customerMutationFormMap: FormMapInput<CustomerMutationData> = {
  name: {
    required: true,
    type: 'text',
  },
  doc_type: {
    required: true,
    type: 'choice',
    options: ['cpf', 'cnpj'],
  },
  doc_value: {
    required: true,
    type: 'text',
  },
}
