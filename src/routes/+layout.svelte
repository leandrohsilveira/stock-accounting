<script lang="ts">
  import '../app.css'
  import { page } from '$app/state'
  import type { LayoutProps } from './$types'
  import { Navbar } from '$lib/client/components/navbar'
  import { provideAuthContext } from '$lib/client/contexts'

  let { children, data }: LayoutProps = $props()

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
