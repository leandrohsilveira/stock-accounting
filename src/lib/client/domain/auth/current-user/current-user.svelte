<script lang="ts">
  import { enhance } from '$app/forms'
  import Field from '$lib/client/components/field.svelte'
  import Fieldset from '$lib/client/components/fieldset.svelte'
  import Title from '$lib/client/components/title.svelte'
  import { UserDataForm } from '$lib/client/domain/user/user-data-form'
  import { enhanced } from '$lib/client/form'
  import { createLoading } from '$lib/client/loading'
  import { showError, showSuccess } from '$lib/client/message'
  import { createTranslator, useTranslate } from '$lib/lang'
  import {
    changePasswordFormMap,
    userUpdateFormMap,
    type UserChangePasswordData,
    type UserData,
    type UserUpdateData,
  } from '$lib/shared/models'
  import { createFormState, type ErrorsMap } from '$lib/shared/util/form'
  import { literals } from './current-user.i18n'

  interface Props {
    updateErrors?: ErrorsMap<UserUpdateData>
    passwordErrors?: ErrorsMap<UserChangePasswordData>
    currentUser: UserData
    actions: {
      updateData: string
      changePassword: string
    }
  }

  const translate = createTranslator(literals) // Not reactive
  const t = useTranslate(literals)

  let { currentUser, actions, passwordErrors, updateErrors }: Props = $props()

  const updateLoading = createLoading()
  const passwordLoading = createLoading()
  const updateState = createFormState(() => updateErrors)
  const passwordState = createFormState(() => passwordErrors)

  function updateSuccess() {
    showSuccess(translate('userDataUpdateSuccess'))
  }

  function passwordSuccess() {
    showSuccess(translate('passwordChangeSuccess'))
  }

  function passwordFailure(failure: Record<string, unknown> | null) {
    if (failure && 'message' in failure) {
      showError(String(failure.message))
    }
  }
</script>

{#snippet loading(isLoading: boolean)}
  {#if isLoading}
    <div class="loading loading-spinner"></div>
  {/if}
{/snippet}

<Title name={$t('title')} />

<form
  class="flex flex-1 flex-col gap-4"
  method="POST"
  action={actions.updateData}
  use:enhance={enhanced(userUpdateFormMap, {
    state: updateState,
    loading: updateLoading,
    reset: false,
    onSuccess: updateSuccess,
  })}
>
  <Fieldset title={$t('updateData')}>
    <div class="flex flex-1 flex-col justify-between">
      <div class="flex flex-col gap-4">
        <UserDataForm
          data={currentUser}
          loading={updateLoading.isLoading}
          errors={updateState.errors}
        />
      </div>
      <button type="submit" class="btn btn-primary" disabled={updateLoading.isLoading}>
        {@render loading(updateLoading.isLoading)}
        {$t('save')}
      </button>
    </div>
  </Fieldset>
</form>

<form
  class="flex flex-1 flex-col gap-4"
  method="POST"
  action={actions.changePassword}
  use:enhance={enhanced(changePasswordFormMap, {
    state: passwordState,
    loading: passwordLoading,
    onSuccess: passwordSuccess,
    onFailure: passwordFailure,
  })}
>
  <Fieldset title={$t('changePassword')}>
    <Field
      id="currentPassword"
      label={$t('currentPassword')}
      error={passwordState.errors.currentPassword}
    >
      <input
        type="password"
        id="currentPassword"
        name="currentPassword"
        placeholder={$t('currentPassword')}
        class="input w-full"
        disabled={passwordLoading.isLoading}
        autocomplete="current-password"
      />
    </Field>

    <Field id="newPassword" label={$t('newPassword')} error={passwordState.errors.newPassword}>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        placeholder={$t('newPassword')}
        class="input w-full"
        disabled={passwordLoading.isLoading}
        autocomplete="new-password"
      />
    </Field>

    <Field
      id="confirmPassword"
      label={$t('confirmPassword')}
      error={passwordState.errors.confirmPassword}
    >
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder={$t('confirmPassword')}
        class="input w-full"
        disabled={passwordLoading.isLoading}
        autocomplete="new-password"
      />
    </Field>

    <button type="submit" class="btn btn-primary" disabled={passwordLoading.isLoading}>
      {@render loading(passwordLoading.isLoading)}
      {$t('updatePassword')}
    </button>
  </Fieldset>
</form>
