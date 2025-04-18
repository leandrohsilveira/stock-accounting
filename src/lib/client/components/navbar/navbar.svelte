<script lang="ts">
  import { useTranslate } from '$lib/lang'
  import type { UserData } from '$lib/shared/models'
  import UserIcon from '$lib/client/icons/icon_user.svg?component'
  import LoginIcon from '$lib/client/icons/icon_login.svg?component'
  import EditIcon from '$lib/client/icons/icon_edit.svg?component'
  import LogoutIcon from '$lib/client/icons/icon_logout.svg?component'
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

    <ul class="menu menu-horizontal">
      <li>
        {#if currentUser !== null}
          <button popovertarget="auth-popover" style="anchor-name:--auth-anchor;">
            <UserIcon fill="currentColor" />
            {currentUser.displayName}
          </button>
          <ul
            class="dropdown menu rounded-box bg-base-100 w-52 shadow-sm"
            popover
            id="auth-popover"
            style="position-anchor:--auth-anchor;"
          >
            <li>
              <a href={updateUrl}>
                <EditIcon fill="currentColor" />
                {$t('profile')}
              </a>
            </li>
            <li>
              <button type="submit" form={formId}>
                <LogoutIcon fill="currentColor" />
                {$t('logout')}
              </button>
            </li>
          </ul>
        {:else}
          <a href="/login?next={currentUrl.pathname}">
            <LoginIcon fill="currentColor" />
            {$t('login')}
          </a>
        {/if}
      </li>
    </ul>
  </div>
</header>
