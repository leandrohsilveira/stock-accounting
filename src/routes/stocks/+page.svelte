<script lang="ts">
  import { navigating } from '$app/state'
  import { StockTable } from '$lib/client/domain/stock/stock-table'

  const { data } = $props()
</script>

<form class="w-full" method="GET" data-sveltekit-keepfocus>
  <StockTable
    loading={navigating.type === 'form'}
    data={data.result}
    search={data.search}
    page={data.page}
    limit={data.limit}
    links={{
      new: '/stocks/new',
      edit: '/stocks/{0}/edit',
    }}
  />
</form>
