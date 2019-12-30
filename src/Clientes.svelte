<script>
  import Form from "./Form.svelte";
  import Cliente from "./Cliente.svelte";
  import Boton from "./Boton.svelte";

  let busqueda = "";
  // this se refiere al formulario
  function handleSubmit () {busqueda = this.elements.buscar.value};

  // this se refiere al input
  function handleKeyup () {busqueda = this.value};
</script>



<h1>CLIENTES</h1>
<Form {handleSubmit} {handleKeyup} />

<!-- <Fetch  {busqueda} contenido="clientes" let:data>

  <Boton class="btn btn-insertar">
    <span>✏️</span>
  </Boton>

  {#each data as cliente}
    <Cliente {cliente} />
  {/each}

</Fetch> -->