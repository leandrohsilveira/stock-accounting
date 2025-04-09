<script lang="ts">
  import { Login } from '$lib/client/components/login'

  let { data, form } = $props()
</script>

<Login errors={form?.errors} action="?/login" next={data.next} />
