<script lang="ts">
  import Title from '$lib/client/components/title.svelte'
  import { useTranslate } from '$lib/lang'
  import type { StockDisplayData, StockMutationData } from '$lib/shared/models'
  import type { ErrorsMap } from '$lib/shared/util/form'
  import { StockForm } from '../stock-form'
  import { literals } from './stock-edit.i18n'

  interface Props {
    back: string
    errors: ErrorsMap<StockMutationData>
    stock: StockDisplayData
    loading?: boolean
  }

  const t = useTranslate(literals)

  let { stock, back, errors, loading }: Props = $props()
</script>

<Title name={$t('title')} />

<StockForm {back} {loading} data={stock} title={$t('title')} submitLabel={$t('submit')} {errors} />
