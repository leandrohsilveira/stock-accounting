<script lang="ts">
  import '../app.css'
  import { navigating, page } from '$app/state'
  import type { LayoutProps } from './$types'
  import { Navbar } from '$lib/client/components/navbar'
  import { provideAuthContext } from '$lib/client/contexts'
  import { createMessageState } from '$lib/client/message'

  let { children, data }: LayoutProps = $props()

  const messagesState = createMessageState()
  const isNavigating = $derived(['goto', 'link', 'popstate'].includes(navigating.type ?? ''))

  $effect(() => {
    if (isNavigating) document.body.setAttribute('loading', '')
    else document.body.removeAttribute('loading')
  })

  provideAuthContext(() => ({
    currentUser: data.currentUser,
  }))
</script>

<Navbar currentUser={data.currentUser} currentUrl={page.url} formId="logout_form" updateUrl="/me" />

<main class="app-margin flex flex-col gap-4">
  {@render children()}
</main>

{#if data.currentUser !== null}
  <form method="POST" action="/login?/logout" id="logout_form"></form>
{/if}

<div class="toast toast-bottom toast-center">
  {#each messagesState.messages as message (message.id)}
    <div
      role="alert"
      class="alert alert-soft"
      class:alert-info={message.type === 'info'}
      class:alert-success={message.type === 'success'}
      class:alert-error={message.type === 'error'}
    >
      <span>{message.message}</span>
    </div>
  {/each}
</div>
