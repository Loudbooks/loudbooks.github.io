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
<div id="circle"></div>

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

  #circle {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    animation: shrink 2s cubic-bezier(0.86,0,0,0.99) forwards;
  }

  @keyframes shrink {
    0% {
      width: 250vw;
      height: 250vw;
    }
    100% {
      width: 0;
      height: 0;
      left: -10%;
      top: -10%;
    }
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
