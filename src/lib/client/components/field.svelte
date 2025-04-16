<script lang="ts">
  import type { ValidationMessage } from '$lib/shared/util/form'
  import type { Snippet } from 'svelte'

  interface Props {
    id: string
    label: string
    children: Snippet
    error?: ValidationMessage | null
  }

  let { id, label, children, error = null }: Props = $props()
</script>

<div class="flex w-full flex-col gap-4">
  <label for={id} class="floating-label flex w-full" class:error={!!error}>
    <span class="label">{label}</span>
    {@render children()}
  </label>
  {#if error}
    <span class="fieldset-label text-error">{error.message}</span>
  {/if}
</div>
