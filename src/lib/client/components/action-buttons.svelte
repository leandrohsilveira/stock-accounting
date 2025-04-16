<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    submitLabel?: string
    cancelLabel?: string
    cancelHref?: string
    submitDisabled?: boolean
    cancelDisabled?: boolean
    loading?: boolean
    tabindex: number
    submitType?: 'submit' | 'button'
    middle?: Snippet
    onsubmit?(e: Event): void
    oncancel?(e: Event): void
  }

  let {
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    submitDisabled,
    cancelDisabled,
    loading = false,
    submitType = 'submit',
    tabindex,
    middle,
    onsubmit,
    oncancel,
    cancelHref,
  }: Props = $props()
</script>

<div class="flex w-full flex-row-reverse justify-between gap-4">
  <button
    class="btn btn-primary"
    type={submitType}
    onclick={onsubmit}
    {tabindex}
    disabled={submitDisabled || loading}
  >
    {#if loading}
      <span class="loading loading-spinner"></span>
    {/if}
    {submitLabel}
  </button>
  {@render middle?.()}
  {#if oncancel}
    <button
      class="btn btn-outline"
      type="button"
      {tabindex}
      onclick={oncancel}
      disabled={cancelDisabled}>{cancelLabel}</button
    >
  {:else if cancelHref}
    <a
      href={cancelDisabled || loading ? '.' : cancelHref}
      role="button"
      aria-disabled={cancelDisabled || loading}
      {tabindex}
      class="btn btn-outline"
      class:btn-disabled={cancelDisabled || loading}>{cancelLabel}</a
    >
  {:else}
    <div></div>
  {/if}
</div>
