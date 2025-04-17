<script lang="ts">
  import ActionButtons from '$lib/client/components/action-buttons.svelte'
  import Field from '$lib/client/components/field.svelte'
  import Fieldset from '$lib/client/components/fieldset.svelte'
  import { useTranslate } from '$lib/lang'
  import type { StockDisplayData, StockMutationData } from '$lib/shared/models'
  import type { ErrorsMap } from '$lib/shared/util/form'
  import { literals } from './stock-form.i18n'

  interface Props {
    data?: StockDisplayData
    errors?: ErrorsMap<StockMutationData>
    back: string
    title: string
    submitLabel: string
    loading?: boolean
    tabindex?: number
  }

  const t = useTranslate(literals)

  let { back, title, submitLabel, tabindex = 0, loading = false, data, errors }: Props = $props()
</script>

<Fieldset {title}>
  <Field id="symbol_id" label={$t('symbol_id')} error={errors?.symbol_id}>
    <input
      type="text"
      class="input w-full"
      id="symbol_id"
      name="symbol_id"
      {tabindex}
      disabled={loading}
      placeholder={$t('symbol_id')}
      value={data?.symbol_id ?? ''}
    />
  </Field>
  <Field id="display_name" label={$t('display_name')} error={errors?.display_name}>
    <input
      type="text"
      class="input w-full"
      id="display_name"
      name="display_name"
      {tabindex}
      disabled={loading}
      placeholder={$t('display_name')}
      value={data?.display_name ?? ''}
    />
  </Field>
  <ActionButtons {submitLabel} {tabindex} {loading} cancelHref={back} />
</Fieldset>
