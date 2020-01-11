<script>
  import {
    urlArticulos as URL,
    create,
    read,
    update,
    del
  } from "./config.js";
  import { onMount } from "svelte";

  import Form from "./Form.svelte";
  import Articulo from "./Articulo.svelte";
  import Boton from "./Boton.svelte";

  let busqueda = "";
  let jsonData = [];
  let articulo = {};

  onMount(async () => {
    const response = await fetch(URL);
    jsonData = await response.json();
  });

  $: regex = new RegExp(busqueda, "gi");
  $: datos = busqueda
    ? jsonData.filter(element => regex.test(element.nombre))
    : jsonData;

  // this se refiere al formulario
  function handleSubmit() {
    busqueda = this.elements.buscar.value;
  }

  // this se refiere al input
  function handleKeyup() {
    busqueda = this.value;
  }

  function ok() {
    OK.style.display = "block";
    setTimeout(() => (OK.style.display = "none"), 1500);
    // console.log(jsonData);
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

<h1>ARTÍCULOS</h1>
<Form {handleSubmit} {handleKeyup} />
<!-- Object.keys(articulo).every(key => articulo[key] !== undefined && articulo[key] !== '' -->
<div class="container">
  <Articulo bind:articulo={articulo} >
    <div slot="botones" class="botones">
      <Boton
        class="btn btn-insertar"
        on:click={() => {
          <!-- console.log("hola", articulo); -->
          if (Object.keys(articulo).length > 1 
           && Object.values(articulo).every(x => (x !== undefined && x != ''))) {
            create(URL, articulo)
              .then(data => {
                jsonData = [...jsonData, data ];              
                ok();                
              })
              .catch(err => ko());              
          }       
        }}>
        <span>✏️</span>
      </Boton>
    </div>
  </Articulo>
</div>

<div class="container">
  {#each datos as articulo}
    <Articulo {articulo}>
      <div slot="botones" class="botones">
        <Boton
          class="btn btn-modificar"
          on:click={() => update(URL, articulo._id, articulo)
              .then(data => ok())
              .catch(err => ko())}>
          <span>📝</span>
        </Boton>
        <Boton
          class="btn btn-eliminar"
          on:click={() => del(URL, articulo._id)
              .then(data => {
                jsonData = jsonData.filter(x => x._id !== data._id);
                ok();
              })
              .catch(err => ko())}>
          <span>❌</span>
        </Boton>
      </div>
    </Articulo>
  {/each}
</div>
