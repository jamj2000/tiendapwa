<script>
  import { onMount } from 'svelte';

  let texto = '';

  // function perfil() {
  //   fetch("/secret")
  //     .then(function(response) {
  //       return response.text();
  //     })
  //     .then(function(text) {
  //       console.log(text);
  //       texto = text;
  //     });
  // }

async function perfil () {
    const response = await fetch('/auth/google',  {mode: 'no-cors'});  
    const data = await response.text();
    console.log(data);
}

  function popup(proveedor) {
    let w = window.open("/auth/" + proveedor, "Sign In", "width=985,height=735");
    // w.location.href = '/secret';
  }

  function contenido (sitio) {
    // document.getElementById('contenido').innerHTML = "<h1>Hola</h1>";
     window.location.href = '/auth/' + sitio;
  }

onMount (perfil);

</script>

{#if texto != ''}
  <!-- {@html texto} -->
  Pepito grillo
{:else}
  <div id="signin">
    <h1>Iniciar sesión</h1>

    <!-- <button class="btn-si btn-google" on:click={perfil} />
    <button class="btn-si btn-facebook" on:click={() => perfil()} />
    <button class="btn-si btn-linkedin" on:click={() => perfil()} />
    <button class="btn-si btn-pinterest" on:click={() => perfil()} />
    <button class="btn-si btn-github" on:click={() => perfil()} /> -->

     <!-- <button class="btn-si btn-google" on:click={() => popup('google')} />
    <button class="btn-si btn-facebook" on:click={() => popup('facebook')} />
    <button class="btn-si btn-linkedin" on:click={() => popup('linkedin')} />
    <button class="btn-si btn-pinterest" on:click={() => popup('pinterest')} />
    <button class="btn-si btn-github" on:click={() => popup('github')} /> -->

    <button class="btn-si btn-google" on:click={() => {contenido ('google')}} />
    <button class="btn-si btn-facebook" on:click={() => {contenido ('facebook')}} />
    <button class="btn-si btn-linkedin" on:click={() => {contenido ('linkedin')}} />
    <button class="btn-si btn-pinterest" on:click={() => {contenido ('pinterest')}} />
    <button class="btn-si btn-github" on:click={() => {contenido ('github')}} />
  </div>
{/if}
