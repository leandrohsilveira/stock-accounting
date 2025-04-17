<script lang="ts">
  import Table from '$lib/client/components/table.svelte'
  import Title from '$lib/client/components/title.svelte'
  import AddIcon from '$lib/client/icons/icon_add.svg?component'
  import EditIcon from '$lib/client/icons/icon_edit.svg?component'
  import { useTranslate } from '$lib/lang'
  import type { ListResult, StockDisplayData } from '$lib/shared/models'
  import { formatText } from '@i18nlite/core'
  import { literals } from './stock-table.i18n'

  interface Props {
    data: ListResult<StockDisplayData>
    loading?: boolean
    search?: string
    page?: number
    limit?: number
    links: {
      new: string
      edit: string
    }
  }

  const { data, loading, links, search, page, limit }: Props = $props()

  const t = useTranslate(literals)

  function track(item: StockDisplayData) {
    return item.id
  }
</script>

<Title name={$t('title')} />

<Table
  tabindex={0}
  items={data.items}
  count={data.count}
  {track}
  {loading}
  {page}
  {search}
  {limit}
  card
>
  {#snippet skeleton()}
    <tr>
      <td><div class="skeleton h-4 w-full"></div></td>
      <td><div class="skeleton h-4 w-full"></div></td>
      <td><div class="skeleton h-4 w-full"></div></td>
    </tr>
  {/snippet}
  {#snippet toolbar()}
    <a href={links.new} tabindex={0} class="btn btn-primary">
      <AddIcon fill="currentColor" />
      {$t('add')}
    </a>
  {/snippet}
  {#snippet header()}
    <tr>
      <td>{$t('symbol_id')}</td>
      <td>{$t('display_name')}</td>
      <td width="80px">#</td>
    </tr>
  {/snippet}
  {#snippet row(item)}
    <tr>
      <td>{item.symbol_id?.toUpperCase()}</td>
      <td>{item.display_name}</td>
      <td>
        <a href={formatText(links.edit, item.id)} tabindex={0} class="btn btn-ghost btn-circle">
          <EditIcon fill="currentColor" />
        </a>
      </td>
    </tr>
  {/snippet}
  {#snippet empty()}
    <tr><td colspan="3">{$t('empty')}</td></tr>
  {/snippet}
</Table>
