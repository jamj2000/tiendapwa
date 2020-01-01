<script>
  import { onMount } from "svelte";
  let data = "";

  onMount(async () => {
    const response = await fetch("/auth/logout");
    data = await response.text();
  });
</script>

<h1>
  Sesión finalizada.
</h1>
  {@html data}