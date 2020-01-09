<script>
  import { onMount } from 'svelte';

  let texto = '';

  function perfil() {
    fetch("/perfil")
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        texto = text;
      });
  }
  function popup(proveedor) {
    let w = window.open("/auth/" + proveedor, "Sign In", "width=985,height=735");
    w.location.href = '/perfil';
  }

onMount (perfil);

</script>

{#if texto != ''}
  <!-- {@html texto} -->
  Pepito grillo
{:else}
  <div id="signin">
    <h1>Iniciar sesión</h1>

    <button class="btn-si btn-google" on:click={() => popup('google')} />
    <button class="btn-si btn-facebook" on:click={() => popup('facebook')} />
    <button class="btn-si btn-linkedin" on:click={() => popup('linkedin')} />
    <button class="btn-si btn-pinterest" on:click={() => popup('pinterest')} />
    <button class="btn-si btn-github" on:click={() => popup('github')} />

  </div>
{/if}
