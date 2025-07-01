<script lang="ts">
    import { onMount } from "svelte";
    import BackgroundImage from "$lib/images/background-no-grain.webp?enhanced";

  interface Props {
    loadCallback?: () => void;
  }

  let { loadCallback }: Props = $props();

  let imageRef: HTMLImageElement | null = $state(null);
  let imageCached = true;

  onMount(() => {
    if (!imageRef) {
      console.error("Image reference is null.");
      return;
    }

    if (imageRef.complete) {
      imageCached = true;

      setTimeout(() => {
        if (!imageRef) {
          console.error("Image reference is null.");
          return;
        }

        imageRef.style.opacity = "1";
      });

      if (loadCallback) {
        loadCallback();
      }

      return;
    } else {
      imageCached = false;
    }

    imageRef.decode().then(() => {
      if (!imageRef) {
        console.error("Image reference is null.");
        return;
      }

      imageRef.style.opacity = "1";

      if (loadCallback) {
        loadCallback();
      }
    });
  });
</script>

<div id="background">
  <enhanced:img src={BackgroundImage} id="img" alt="Background" bind:this={imageRef} />
</div>

<div id="filter-container">
  <rect style='background-image: url(/background-grain.webp)'/>
</div>

<style lang="scss">
  #background {
    overflow: hidden;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -2;
    filter: brightness(1) saturate(1.1)
  }
  
  rect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-repeat: repeat;
    opacity: 0.6;
    background-size: 200px;
  }

  #filter-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    mix-blend-mode: overlay;
  }

  #img {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    pointer-events: none;
    transform: scale(1.3);
    opacity: 0;
    transition: opacity 1s ease;
  }
</style>
