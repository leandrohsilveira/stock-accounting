<script lang="ts">
  import { Title } from '$lib/client/components'
  import { useTranslate } from '$lib/lang'
  import { literals } from './login.i18n'

  interface Props {
    action?: string
  }

  const t = useTranslate(literals)

  let { action }: Props = $props()
</script>

<Title name={$t('title')} />

<form class="flex flex-col items-center" method="POST" {action} data-sveltekit-keepfocus>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-sm gap-4 border p-4">
    <legend class="fieldset-legend">{$t('title')}</legend>

    <label for="username" class="floating-label flex">
      <span>{$t('email')}</span>
      <input
        type="email"
        id="username"
        name="username"
        class="input w-full"
        placeholder={$t('email')}
      />
    </label>

    <label for="password" class="floating-label flex">
      <span>{$t('password')}</span>
      <input
        type="password"
        id="password"
        name="password"
        class="input w-full"
        placeholder={$t('password')}
      />
    </label>

    <button class="btn btn-primary" type="submit">{$t('submit')}</button>
  </fieldset>
</form>
