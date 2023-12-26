<script>
  import Chatroom from "./Chatroom.svelte";
  import { db } from "../firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import { average } from "firebase/firestore";
  import { afterUpdate, tick } from "svelte";

  export let user;
  export let logout;

  let message = "";
  let element;

  const query = db.collection("chats").orderBy("sendAt");
  const chats = collectionData(query, "id").pipe(startWith([]));

  afterUpdate(() => scrollToBottom(element));

  const scrollToBottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };

  async function sendMessage() {
    if (message.length > 0) {
      db.collection("chats").add({
        uid: user.uid,
        message: message,
        avatar: user.photoURL,
        sendAt: +new Date(),
      });

      message = "";
      await tick();
      scrollToBottom(element);
    }
  }
</script>

<main class="Chatroom">
  <div class="header">
    <div class="logo">Umeent Chatroom</div>
    <button on:click={logout}> Logout</button>
  </div>

  <div bind:this={element} class="messages">
    {#each $chats as chat}
      {#if user.uid == chat.uid}
        <div class="message my-message">
          <div class="text">{chat.message}</div>

          <div class="avatar">
            <img src={chat.avatar} alt="" />
          </div>
        </div>
      {:else}
        <div class="message other-message">
          <div class="avatar">
            <img src={chat.avatar} alt="" />
          </div>

          <div class="text">{chat.message}</div>
        </div>
      {/if}
    {/each}
  </div>

  <form on:submit|preventDefault={() => (message = message)}>
    <input type="text" bind:value={message} />

    <button on:click={sendMessage} type="submit">
      <i class="fa fa-paper-plane"></i>
    </button>
  </form>
</main>
