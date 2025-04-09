<script lang="ts">
  import '../app.css'
  import { page } from '$app/state'
  import type { LayoutProps } from './$types'
  import { Navbar } from '$lib/client/components/navbar'

  let { children, data }: LayoutProps = $props()
</script>

<Navbar currentUser={data.currentUser} currentUrl={page.url} formId="logout_form" />

<main class="app-margin flex flex-col gap-4">
  {@render children()}
</main>

{#if data.currentUser !== null}
  <form method="POST" action="/login?/logout" id="logout_form"></form>
{/if}
