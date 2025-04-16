<script lang="ts">
  import { enhance } from '$app/forms'
  import { CustomerNew } from '$lib/client/domain/customer/customer-new'
  import { enhanced } from '$lib/client/form'
  import { createLoading } from '$lib/client/loading'
  import { showSuccess } from '$lib/client/message'
  import { customerMutationFormMap, type CustomerMutationData } from '$lib/shared/models'
  import { createFormState } from '$lib/shared/util/form'
  import type { PageProps } from './$types'

  const { form }: PageProps = $props()

  const state = createFormState<CustomerMutationData>(() => form?.errors)
  const loading = createLoading()

  async function onRedirect() {
    showSuccess('Customer created')
  }
</script>

<form
  class="flex flex-col items-center"
  method="POST"
  use:enhance={enhanced(customerMutationFormMap, { state, loading, onRedirect })}
>
  <div class="flex w-[98%] max-w-lg flex-col">
    <CustomerNew back="/customers" errors={state.errors} loading={loading.isLoading} />
  </div>
</form>
