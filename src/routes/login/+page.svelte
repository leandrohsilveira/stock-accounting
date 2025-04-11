<script lang="ts">
  import { Login } from '$lib/client/domain/auth/login'

  let { data, form } = $props()
</script>

<Login errors={form?.errors} action="?/login" next={data.next} />
