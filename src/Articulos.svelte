<script>
  import { onMount, getContext } from "svelte";
  import { jsonData } from "./store.js";
  
  import Buscar from "./Buscar.svelte";
  import Articulo from "./Articulo.svelte";
  import Boton from "./Boton.svelte";

  const URL = getContext("URL");

  let busqueda = "";
  let articulo = {};

  onMount(async () => {
    const response = await fetch(URL.articulos);
    const data = await response.json();
    $jsonData = data;
  });

  $: regex = new RegExp(busqueda, "gi");
  $: datos = busqueda
    ? $jsonData.filter(element => regex.test(element.nombre))
    : $jsonData;

  //////////////////////
  // let promesa = refrescar(); 

  // async function refrescar() {
  //   const response = await fetch(
  //     "https://tiendapwa.herokuapp.com/api/articulos"
  //   );
  //   return await response.json();
  // }
  // function handleClick() {
  // 	promesa = refrescar();
  // }
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
  }
</style>

<h1>ARTÍCULOS</h1>
<Buscar bind:busqueda />

<div class="container">
  <Articulo bind:articulo>
    <div style="text-align: right">
      <Boton {articulo} tipo="insertar" />
    </div>
  </Articulo>
</div>

<div class="container">
  {#each datos as articulo}
    <Articulo {articulo}>
      <div style="text-align: right">
        <Boton {articulo} tipo="modificar" />
        <Boton {articulo} tipo="eliminar" />
      </div>
    </Articulo>
  {/each}
</div>

<!-- <button on:click={() => (promesa = refrescar())}>Refrescar</button> -->

<!-- FETCH -->
<!-- {#await promesa}
  <p>...recuperando datos</p>
{:then data}
  <div class="container">
    {#each data as articulo}
      <Articulo {articulo}>
        <div style="text-align: right">
          <Boton {articulo} tipo="modificar" />
          <Boton {articulo} tipo="eliminar" />
        </div>
      </Articulo>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await} -->
