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

<label for={id} class="floating-label flex" class:error={!!error}>
  <span>{label}</span>

  {@render children()}
</label>
{#if error}
  <span class="fieldset-label text-error">{error.message}</span>
{/if}
