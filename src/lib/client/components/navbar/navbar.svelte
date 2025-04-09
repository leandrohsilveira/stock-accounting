<script lang="ts">
  import { useTranslate } from '$lib/lang'
  import type { UserData } from '$lib/shared/models'
  import { literals } from './navbar.i18n'

  interface Props {
    currentUser: UserData | null
    currentUrl: URL
    formId: string
    updateUrl: string
  }

  const t = useTranslate(literals)
  let { currentUser, currentUrl, formId, updateUrl }: Props = $props()
</script>

<header class="navbar bg-primary text-primary-content justify-center">
  <div class="app-margin flex items-center justify-between gap-4">
    <h1 class="text-xl">Stock Accounting</h1>
    {#if currentUser !== null}
      <button
        class="btn btn-ghost btn-primary"
        popovertarget="auth-popover"
        style="anchor-name:--auth-anchor;"
      >
        {currentUser.displayName}
      </button>
      <ul
        class="dropdown menu rounded-box bg-base-100 w-52 shadow-sm"
        popover
        id="auth-popover"
        style="position-anchor:--auth-anchor;"
      >
        <li>
          <a href={updateUrl}>Profile</a>
        </li>
        <li>
          <button type="submit" form={formId}>{$t('logout')}</button>
        </li>
      </ul>
    {:else}
      <a href="/login?next={currentUrl.pathname}" class="btn btn-ghost btn-primary">{$t('login')}</a
      >
    {/if}
  </div>
</header>
