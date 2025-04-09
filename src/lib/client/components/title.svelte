<script lang="ts">
  interface Props {
    name: string
  }

  let { name }: Props = $props()
</script>

<svelte:head>
  <title>Stock Accounting - {name}</title>
</svelte:head>
