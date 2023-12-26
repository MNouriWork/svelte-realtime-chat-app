<script>
  import { auth, googleProvider } from "./firebase.js";
  import { authState } from "rxfire/auth";
  import Chatroom from "./lib/Chatroom.svelte";

  let user;

  const unsubscribe = authState(auth).subscribe((usr) => (user = usr));

  function login() {
    auth.signInWithPopup(googleProvider);
  }

  function logout() {
    auth.signOut();
  }
</script>

<main class="App">
  {#if user}
    <!-- Logged in as {user.uid} -->

    <Chatroom {user} {logout} />
  {:else}
    <div class="login-form">
      <button on:click={login}>
        <i class="fa fa-google"></i>

        Sign In With Google
      </button>
    </div>
  {/if}
</main>

<style>
</style>
