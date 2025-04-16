<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    title: string
    children: Snippet
  }

  let { title, children }: Props = $props()
</script>

<fieldset
  class="fieldset bg-base-100 shadow-base-300 border-base-200 rounded-box flex flex-1 flex-col gap-4 border p-4 shadow-lg"
>
  <legend class="fieldset-legend">{title}</legend>

  {@render children?.()}
</fieldset>
