<script lang="ts">
  import Title from '$lib/client/components/title.svelte'
  import { useTranslate } from '$lib/lang'
  import type { StockMutationData } from '$lib/shared/models'
  import type { ErrorsMap } from '$lib/shared/util/form'
  import { StockForm } from '../stock-form'
  import { literals } from './stock-new.i18n'

  interface Props {
    back: string
    errors: ErrorsMap<StockMutationData>
    loading?: boolean
  }

  const t = useTranslate(literals)

  let { back, errors, loading }: Props = $props()
</script>

<Title name={$t('title')} />

<StockForm {back} {loading} title={$t('title')} submitLabel={$t('submit')} {errors} />
