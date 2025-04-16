<script lang="ts">
  import Title from '$lib/client/components/title.svelte'
  import { useTranslate } from '$lib/lang'
  import type { CustomerMutationData } from '$lib/shared/models'
  import type { ErrorsMap } from '$lib/shared/util/form'
  import { CustomerForm } from '../customer-form'
  import { literals } from './customer-new.i18n'

  interface Props {
    back: string
    errors: ErrorsMap<CustomerMutationData>
    loading?: boolean
  }

  const t = useTranslate(literals)

  let { back, errors, loading }: Props = $props()
</script>

<Title name={$t('title')} />

<CustomerForm {back} {loading} title={$t('title')} submitLabel={$t('submit')} {errors} />
