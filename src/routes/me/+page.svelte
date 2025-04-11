<script lang="ts">
  import { CurrentUser } from '$lib/client/domain/auth/current-user'
  import type { PageProps } from './$types'

  let { data, form }: PageProps = $props()
</script>

<div class="flex flex-col gap-4 sm:flex-row">
  <CurrentUser
    updateErrors={form?.updateErrors}
    passwordErrors={form?.passwordErrors}
    currentUser={data.currentUser}
    actions={{ updateData: '?/updateData', changePassword: '?/changePassword' }}
  />
</div>
