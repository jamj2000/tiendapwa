<script>

  export let handleSubmit = (event) => { };
  export let handleKeyup  = (event) => { };

</script>

<form on:submit|preventDefault={handleSubmit}>
  <input on:keyup={handleKeyup} type="search" id="buscar" required />
  <button type="submit">Buscar</button>
</form>

