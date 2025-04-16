<script lang="ts" generics="T">
  import FirstPageIcon from '$lib/client/icons/icon_first_page.svg?component'
  import LastPageIcon from '$lib/client/icons/icon_last_page.svg?component'
  import PreviousPageIcon from '$lib/client/icons/icon_navigate_before.svg?component'
  import NextPageIcon from '$lib/client/icons/icon_navigate_next.svg?component'
  import SearchIcon from '$lib/client/icons/icon_search.svg?component'
  import type { Component, Snippet } from 'svelte'
  import type { SVGAttributes } from 'svelte/elements'
  import Field from './field.svelte'

  interface TableProps<T> {
    items: T[]
    track(item: T): string
    loading?: boolean
    tabindex?: number
    search?: string
    count?: number
    page?: number
    limit?: number
    card?: boolean
    empty?: Snippet
    header: Snippet
    row: Snippet<[T, number]>
    skeleton?: Snippet
    background?: Snippet<
      [{ searchBar: Snippet; toolbar?: Snippet; tableContent: Snippet; pagination: Snippet }]
    >
    toolbar?: Snippet
  }

  interface PaginationButtonProps {
    page: number
    active?: boolean
    disabled?: boolean
    Text?: string | Component<SVGAttributes<SVGSVGElement>>
  }

  const {
    items,
    track,
    search = '',
    count = items.length,
    page = 1,
    limit = 10,
    tabindex,
    card,
    loading = false,
    header,
    row,
    empty,
    background,
    toolbar,
    skeleton,
  }: TableProps<T> = $props()

  const pages = $derived(Math.ceil(count / limit))
  const offsetLeft = $derived(Math.min(Math.max(page - 1, 0), 2))
  const offsetRight = $derived(Math.min(Math.max(pages - page, 0), 2))
  const firstPage = $derived(Math.max(page - (offsetLeft + (2 - offsetRight)), 1))
  const lastPage = $derived(Math.min(page + (offsetRight + (3 - (offsetLeft + 1))), pages))
  const pageList = $derived(
    Array.from({
      length: Math.max(lastPage - firstPage + 1, 1),
    }).map((_, index) => firstPage + index),
  )

  const rows = $derived(
    loading ? Array.from({ length: items?.length || limit }).map((_val, index) => index) : [],
  )
  const start = $derived(Math.max(page - 1, 0) * limit)
  const end = $derived(Math.min(start + limit, count))
  const currentPage = $derived(page)
</script>

{#snippet paginationButton({
  page,
  active = false,
  disabled = false,
  Text = String(page),
}: PaginationButtonProps)}
  <button
    class="join-item btn btn-outline btn-sm w-8"
    class:btn-active={active}
    type="submit"
    name="page"
    {tabindex}
    value={String(page)}
    {disabled}
  >
    {#if typeof Text === 'string'}
      {Text}
    {:else}
      <Text fill="currentColor" class="h-4 w-4 shrink-0" />
    {/if}
  </button>
{/snippet}

{#snippet searchBar()}
  <div class="flex w-full flex-col md:max-w-80">
    <Field id="search" label="Search">
      <div class="input">
        <input
          type="text"
          name="search"
          id="search"
          {tabindex}
          placeholder="Search"
          value={search}
        />
        <SearchIcon fill="currentColor" />
      </div>
    </Field>
    <button class="btn btn-outline hidden" type="submit" name="page" value="1"> Search </button>
  </div>
{/snippet}

{#snippet tableContent()}
  <div class="flex w-full flex-col overflow-x-auto">
    <table class="table">
      <thead>
        {@render header()}
      </thead>
      <tbody>
        {#if skeleton && loading}
          {#each rows as index (index)}
            {@render skeleton()}
          {/each}
        {:else}
          {#each items as item, index (track(item))}
            {@render row(item, index)}
          {:else}
            {#if empty}
              {@render empty()}
            {:else}
              <tr><td>Empty</td></tr>
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
{/snippet}

{#snippet pagination()}
  <div class="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-end">
    <input type="hidden" name="limit" value={String(limit)} />
    <div>
      Showing {Math.min(start + 1, count)}-{end} of {count} item(s)
    </div>
    <div class="join">
      {@render paginationButton({ page: 1, disabled: currentPage <= 2, Text: FirstPageIcon })}
      {@render paginationButton({
        page: page - 1,
        disabled: currentPage === 1,
        Text: PreviousPageIcon,
      })}
      {#each pageList as page (page)}
        {@render paginationButton({ page, active: page === currentPage, Text: String(page) })}
      {/each}
      {@render paginationButton({
        page: page + 1,
        disabled: currentPage >= pages,
        Text: NextPageIcon,
      })}
      {@render paginationButton({
        page: pages,
        disabled: currentPage > pages - 2,
        Text: LastPageIcon,
      })}
    </div>
  </div>
{/snippet}

{#if background}
  {@render background({ searchBar, pagination, tableContent, toolbar })}
{:else if card}
  <div class="card bg-base-200 flex w-full flex-col gap-2">
    <div class="flex flex-row justify-between gap-4 p-4">
      {@render toolbar?.()}
      {@render searchBar()}
    </div>
    {@render tableContent()}
    <div class="p-4">
      {@render pagination()}
    </div>
  </div>
{:else}
  <div class="flex w-full flex-col gap-4 p-2">
    {#if toolbar}
      <div class="flex flex-row justify-between gap-4">
        {@render toolbar()}
        {@render searchBar()}
      </div>
    {:else}
      {@render searchBar()}
    {/if}

    {@render tableContent()}

    {@render pagination()}
  </div>
{/if}
