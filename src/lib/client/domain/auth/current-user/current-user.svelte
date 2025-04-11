<script lang="ts">
  import { enhance } from '$app/forms'
  import { useTranslate } from '$lib/lang'
  import {
    changePasswordFormMap,
    userUpdateFormMap,
    type UserChangePasswordData,
    type UserData,
    type UserUpdateData,
  } from '$lib/shared/models'
  import { createForm, createFormState, type ErrorsMap } from '$lib/shared/util/form'
  import Field from '$lib/client/components/field.svelte'
  import Fieldset from '$lib/client/components/fieldset.svelte'
  import Title from '$lib/client/components/title.svelte'
  import { UserDataForm } from '$lib/client/domain/user/user-data-form'
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

  const t = useTranslate(literals)

  let { currentUser, actions, passwordErrors, updateErrors }: Props = $props()

  const updateState = createFormState(() => updateErrors)
  const passwordState = createFormState(() => passwordErrors)

  const updateForm = createForm(userUpdateFormMap, { state: updateState })
  const passwordForm = createForm(changePasswordFormMap, { state: passwordState })
</script>

<Title name={$t('title')} />

<form
  class="flex flex-1 flex-col gap-4"
  method="POST"
  action={actions.updateData}
  use:enhance
  use:updateForm
>
  <Fieldset title={$t('updateData')}>
    <div class="flex flex-1 flex-col justify-between">
      <div class="flex flex-col gap-4">
        <UserDataForm data={currentUser} errors={updateState.errors} />
      </div>
      <button type="submit" class="btn btn-primary">{$t('update')}</button>
    </div>
  </Fieldset>
</form>

<form
  class="flex flex-1 flex-col gap-4"
  method="POST"
  action={actions.changePassword}
  use:enhance
  use:passwordForm
>
  <Fieldset title={$t('changePassword')}>
    <Field
      id="current-password"
      label={$t('currentPassword')}
      error={passwordState.errors.currentPassword}
    >
      <input
        type="password"
        id="current-password"
        name="current-password"
        placeholder={$t('currentPassword')}
        class="input w-full"
        autocomplete="current-password"
      />
    </Field>

    <Field id="password" label={$t('newPassword')} error={passwordState.errors.newPassword}>
      <input
        type="password"
        id="password"
        name="password"
        placeholder={$t('newPassword')}
        class="input w-full"
        autocomplete="new-password"
      />
    </Field>

    <Field
      id="confirm-password"
      label={$t('confirmPassword')}
      error={passwordState.errors.confirmPassword}
    >
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        placeholder={$t('confirmPassword')}
        class="input w-full"
        autocomplete="new-password"
      />
    </Field>

    <button type="submit" class="btn btn-primary">{$t('update')}</button>
  </Fieldset>
</form>
