<script lang="ts">
  import Background from "../components/Background.svelte";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let loadingRef: HTMLDivElement | null = $state(null)

  let { children }: Props = $props();
  let loading = $state(true);
  let isImageLoaded = $state(false);

  let loadCallback = () => {
    isImageLoaded = true;

    if (loadingRef) {
      loadingRef.style.opacity = "0";
    }

    setTimeout(() => {
      loading = false;
    }, 1000);
  };
</script>

<!-- <Header /> -->
<Background {loadCallback} />

{#if (loading && !isImageLoaded)}
  <div id="loading-screen" bind:this={loadingRef}></div>
{/if}

{#if isImageLoaded}
  <div id="all-content">
    {@render children?.()}
  </div>
{/if}


<style lang="scss">
  #all-content {
    animation: fadeIn 0.5s ease-in-out forwards;
    opacity: 1;
    background-color: transparent;
  }

  #loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -2;

    transition: opacity 0.2s ease;

    @media (max-width: 800px) {
      transition: opacity 0.1s ease;
    }
  }

  @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
</style>
