import type { FormMapInput } from '../util/form'

export interface StockDisplayData {
  id: string
  symbol_id: string
  display_name?: string
}

export interface StockMutationData {
  symbol_id: string
  display_name?: string
}

export const stockMutationFormMap: FormMapInput<StockMutationData> = {
  symbol_id: {
    type: 'text',
    required: true,
  },
  display_name: {
    type: 'text',
  },
}
