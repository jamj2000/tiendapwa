<script>
  import Boton from "./Boton.svelte";
  export let cliente = {};
</script>


<div>
  {cliente.nombre} {cliente.apellidos}
  <Boton class="btn btn-modificar">
    <span>📝</span>
  </Boton>
  <Boton class="btn btn-eliminar">
    <span>❌</span>
  </Boton>
</div>
