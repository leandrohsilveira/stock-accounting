<script lang="ts">
  import { navigating } from '$app/state'
  import { CustomerTable } from '$lib/client/domain/customer/customer-table'

  const { data } = $props()
</script>

<form class="w-full" method="GET" data-sveltekit-keepfocus>
  <CustomerTable
    loading={navigating.type === 'form'}
    data={data.result}
    search={data.search}
    page={data.page}
    limit={data.limit}
    path="/customers"
  />
</form>
