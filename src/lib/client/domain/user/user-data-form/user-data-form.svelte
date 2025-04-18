<script lang="ts">
  import { useTranslate } from '$lib/lang'
  import type { UserData, UserUpdateData } from '$lib/shared/models'
  import type { ErrorsMap } from '$lib/shared/util/form'
  import Field from '$lib/client/components/field.svelte'
  import { literals } from './user-data-form.i18n'

  interface Props {
    data?: UserData
    loading?: boolean
    errors: ErrorsMap<UserUpdateData>
  }

  const t = useTranslate(literals)

  let { data, errors, loading = false }: Props = $props()
</script>

<Field id="displayName" label={$t('name')} error={errors.displayName}>
  <input
    type="text"
    id="displayName"
    name="displayName"
    class="input w-full"
    placeholder={$t('name')}
    autocomplete="name"
    disabled={loading}
    value={data?.displayName ?? ''}
  />
</Field>

<Field id="username" label={$t('email')}>
  <input
    type="email"
    id="username"
    name="username"
    class="input w-full"
    placeholder={$t('email')}
    autocomplete="username"
    value={data?.email ?? ''}
    disabled={!!data || loading}
  />
</Field>
