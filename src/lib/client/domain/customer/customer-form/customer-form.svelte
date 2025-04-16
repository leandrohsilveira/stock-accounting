<script lang="ts">
  import ActionButtons from '$lib/client/components/action-buttons.svelte'
  import Field from '$lib/client/components/field.svelte'
  import Fieldset from '$lib/client/components/fieldset.svelte'
  import { useTranslate } from '$lib/lang'
  import type { CustomerDisplayData, CustomerMutationData } from '$lib/shared/models'
  import type { ErrorsMap } from '$lib/shared/util/form'
  import { literals } from './customer-form.i18n'

  interface Props {
    data?: CustomerDisplayData
    errors?: ErrorsMap<CustomerMutationData>
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
  <Field id="name" label={$t('name')} error={errors?.name}>
    <input
      type="text"
      class="input w-full"
      id="name"
      name="name"
      {tabindex}
      disabled={loading}
      placeholder={$t('name')}
      value={data?.name ?? ''}
    />
  </Field>
  <div class="flex flex-col gap-4 sm:flex-row">
    <div class="w-full sm:max-w-40">
      <Field id="doc_type" label={$t('type')} error={errors?.doc_type}>
        <select
          class="select w-full"
          disabled={loading}
          id="doc_type"
          name="doc_type"
          {tabindex}
          value={data?.doc_type ?? ''}
        >
          <option value="" disabled>Select ID type</option>
          <option value="cpf">CPF</option>
        </select>
      </Field>
    </div>
    <div class="flex-1">
      <Field id="doc_value" label={$t('docValue')} error={errors?.doc_value}>
        <input
          type="text"
          disabled={loading}
          class="input w-full"
          id="doc_value"
          name="doc_value"
          placeholder={$t('docValue')}
          {tabindex}
          value={data?.doc_value ?? ''}
        />
      </Field>
    </div>
  </div>
  <ActionButtons {submitLabel} {tabindex} {loading} cancelHref={back} />
</Fieldset>
