<script lang="ts">
    import { onMount } from "svelte";

  interface Props {
    imageSrc?: string;
    loadCallback?: (cached: boolean) => void;
  }

  let { imageSrc = "background.webp", loadCallback }: Props = $props();

  let imageRef: HTMLImageElement;
  let imageCached = true;

  onMount(() => {
    imageRef.src = imageSrc;

    if (imageRef.complete) {
      imageCached = true;
      imageRef.style.opacity = "1";

      if (loadCallback) {
        loadCallback(true);
      }

      return;
    } else {
      imageCached = false;
    }

    imageRef.decode().then(() => {
      imageRef.style.opacity = "1";

      if (loadCallback) {
        loadCallback();
      }
    });
  });
</script>

<div id="background">
  <img id="img" alt="Background" bind:this={imageRef} />
</div>

<style lang="scss">
  #background {
    overflow: hidden;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
  }

  #img {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    pointer-events: none;
    filter: noise(10);
    transform: scaleX(-1) scale(1.3);
    opacity: 0;
    transition: opacity 1s ease;
  }

  .hidden {
    display: none;
  }
</style>
