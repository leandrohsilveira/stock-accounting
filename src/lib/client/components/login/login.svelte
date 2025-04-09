<script lang="ts">
  import { enhance } from '$app/forms'
  import { Title } from '$lib/client/components'
  import { useTranslate } from '$lib/lang'
  import {
    passwordCredentialsFormMap,
    type UsernamePasswordCredentialsData,
  } from '$lib/shared/models'
  import { createForm, createFormState, type ErrorsMap } from '$lib/shared/util/form'
  import Field from '../field.svelte'
  import Fieldset from '../fieldset.svelte'
  import { literals } from './login.i18n'

  interface Props {
    action?: string
    next: string
    errors?: ErrorsMap<UsernamePasswordCredentialsData>
  }

  const t = useTranslate(literals)

  let { action, next, errors }: Props = $props()

  const state = createFormState<UsernamePasswordCredentialsData>(() => errors ?? null)

  const form = createForm(passwordCredentialsFormMap, { state })
</script>

<Title name={$t('title')} />

<form
  class="flex flex-col items-center"
  method="POST"
  {action}
  data-sveltekit-keepfocus
  use:enhance
  use:form
>
  <input type="hidden" name="next" value={next} />
  <Fieldset title={$t('title')}>
    <Field id="username" label={$t('email')} error={state.errors.username}>
      <input
        type="email"
        id="username"
        name="username"
        class="input w-full"
        placeholder={$t('email')}
        autocomplete="username"
      />
    </Field>

    <Field id="password" label={$t('password')} error={state.errors.password}>
      <input
        type="password"
        id="password"
        name="password"
        class="input w-full"
        placeholder={$t('password')}
        autocomplete="current-password"
      />
    </Field>

    <button class="btn btn-primary" type="submit">{$t('submit')}</button>
  </Fieldset>
</form>
