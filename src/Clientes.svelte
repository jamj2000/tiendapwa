<script>
  import { onMount, getContext } from "svelte";

  import Buscar from "./Buscar.svelte";
  import Cliente from "./Cliente.svelte";
  import Boton from "./Boton.svelte";

  const URL = getContext('URL');

  let busqueda = "";
  let jsonData = [];

  onMount(async () => {
    const response = await fetch(URL.clientes);
    jsonData = await response.json();
  });

  $: regex = new RegExp(busqueda, "gi");
  $: datos = busqueda
    ? jsonData.filter(element => regex.test(element.nombre))
    : jsonData;

  // // this se refiere al formulario
  // function handleSubmit() {
  //   busqueda = this.elements.buscar.value;
  // }

  // this se refiere al input
  function handleKeyup() {
    busqueda = this.value;
  }

  function ok() {
    OK.style.display = "block";
    setTimeout(() => (OK.style.display = "none"), 1500);
  }

  function ko() {
    KO.style.display = "block";
    setTimeout(() => (KO.style.display = "none"), 1500);
  }

  
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
  }

  .botones {
    text-align: right;
  }
</style>

<!-- <h1>CLIENTES</h1>
<Buscar {handleKeyup} />

<div class="container">
  <Cliente let:cliente>
    <div slot="botones" class="botones">
      <Boton
        class="btn btn-insertar"
        on:click={() => {
          if (Object.values(cliente).every(x => x !== null && x !== '')) {
            create(URL, cliente)
              .then(data => {
                jsonData = [...jsonData, cliente];
                ok();
              })
              .catch(err => ko());
          }
        }}>
        <span>✏️</span>
      </Boton>
    </div>
  </Cliente>
</div>

<div class="container">
  {#each datos as cliente}
    <Cliente {cliente}>
      <div slot="botones" class="botones">
        <Boton
          class="btn btn-modificar"
          on:click={() => update(URL, cliente._id, cliente)
              .then(data => ok())
              .catch(err => ko())}>
          <span>📝</span>
        </Boton>
        <Boton
          class="btn btn-eliminar"
          on:click={() => del(URL, cliente._id)
              .then(data => {
                jsonData = jsonData.filter(x => x._id !== data._id);
                ok();
              })
              .catch(err => ko())}>
          <span>❌</span>
        </Boton>
      </div>
    </Cliente>
  {/each}
</div> -->
