<script>
  import Nav from "./Nav.svelte";
  import Contenido from "./Contenido.svelte";
  import { Router } from "svelte-routing";
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Aclonica");

  :global(body) {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: "Aclonica";
  }

  :global(*) {
    margin: 0;
    padding: 0;
  }

  :global(a:hover) {
    text-decoration: none;
    cursor: pointer;
  }

  :global(div#OK, div#KO) {
    display: none;
    position: fixed;
    top: 60px;
    right: 0px;
    font-size: 60px;
    background-color: transparent;
  }
</style>

<Router>
  <Nav />
  <Contenido />
</Router>
<div id="OK">😊</div>
<div id="KO">😟</div>
