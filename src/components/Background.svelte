<script lang="ts">
  interface Props {
    imageSrc?: string;
  }

  let { imageSrc = "src/lib/images/background.webp" }: Props = $props();

  let imageRef: HTMLImageElement | null = $state(null);
</script>

<div id="background">
  <img id="img" src={imageSrc} alt="Background" bind:this={imageRef} />
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
    animation: fadeInNoBlur 1s ease forwards;
    transform: scaleX(-1) scale(1.3);
  }

  @keyframes fadeInNoBlur {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .hidden {
    display: none;
  }
</style>
