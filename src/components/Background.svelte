<script lang="ts">
    import { onMount } from "svelte";

  interface Props {
    imageSrc?: string;
    loadCallback?: () => void;
  }

  let { imageSrc = "background-no-grain.webp", loadCallback }: Props = $props();

  let imageRef: HTMLImageElement;
  let imageCached = true;

  onMount(() => {
    imageRef.src = imageSrc;

    if (imageRef.complete) {
      imageCached = true;
      imageRef.style.opacity = "1";

      if (loadCallback) {
        loadCallback();
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

<div id="filter-container">
  <rect style='background-image: url(https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png)'/>
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

    animation: slightRotate 10s ease-in-out infinite;
  }

  @keyframes slightRotate {
    0% {
      transform: rotate(0deg);
      filter: brightness(1);
    }
    50% {
      transform: rotate(30deg) scale(2);
      filter: brightness(1.1)
    }
    100% {
      transform: rotate(0deg);
      filter: brightness(1);
    }
  }

  rect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    mix-blend-mode: overlay;
    background-repeat: repeat;
    opacity: 0.2;
    background-size: 400px;
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
    transform: scaleX(-1) scale(1.3);
    opacity: 0;
    transition: opacity 1s ease;
  }
</style>
