<script lang="ts">
  import { enhance } from '$app/forms'
  import { StockNew } from '$lib/client/domain/stock/stock-new'
  import { enhanced } from '$lib/client/form'
  import { createLoading } from '$lib/client/loading'
  import { showSuccess } from '$lib/client/message'
  import { stockMutationFormMap } from '$lib/shared/models'
  import { createFormState } from '$lib/shared/util/form'
  import type { PageProps } from './$types'

  const { form }: PageProps = $props()

  const state = createFormState(() => form?.errors)
  const loading = createLoading()

  async function onRedirect() {
    showSuccess('Stock created')
  }
</script>

<form
  class="flex flex-col items-center"
  method="POST"
  use:enhance={enhanced(stockMutationFormMap, { state, loading, onRedirect })}
>
  <div class="flex w-[98%] max-w-lg flex-col">
    <StockNew back="/stocks" errors={state.errors} loading={loading.isLoading} />
  </div>
</form>
