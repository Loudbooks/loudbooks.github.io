<script lang="ts">
  import { onMount } from "svelte";
  import Link from "../components/Link.svelte";
  import SpotifyCard from "../components/SpotifyCard.svelte";

  let isImageLoaded = false;
  let linkContainer: HTMLElement;

  function onImageLoad() {
    isImageLoaded = true;

    const links = linkContainer.children;

    for (let i = 0; i < links.length; i++) {
      let link = links[i] as HTMLElement;

      setTimeout(
        () => {
          link.style.transform = "translateY(0px)";
          link.style.opacity = "1";
          link.style.filter = "blur(0px)";
        },
        (i + 4) * 200,
      );
    }
  }

  onMount(() => {
    onImageLoad();
  })
</script>

<div id="landing-container">
  <div id="content">
    <div id="title-container">
      <h1 id="line-one">Hi.</h1>
      <h1 id="line-two">I'm <span>Loudbook</span>.</h1>
      <div id="link-container" bind:this={linkContainer}>
        <div id="link-one" class="link">
          <Link
            destination="https://github.com/Loudbooks"
            text="https://github.com/Loudbooks"
            glyph="GitHub"
          />
        </div>
        <div id="link-two" class="link">
          <Link
            destination="mailto:contact@loudbook.dev"
            text="contact@loudbook.dev"
            glyph="Email"
          />
        </div>
      </div>
    </div>

    <SpotifyCard />
  </div>
</div>

<style lang="scss">
  #background {
    overflow: hidden;
    position: relative;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  img {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    z-index: 0;
    pointer-events: none;
    filter: noise(10);
    animation: fadeInNoBlur 1s ease;
    transform: scaleX(-1) scale(1.3);

    animation: slightOpacityPulse 30px ease-in-out infinite;

    @media (max-width: 1100px) {
      width: 100vw;
      height: 100vh;

      overflow: hidden;

      transform: scaleX(-1) scale(1.2);
      animation: slightOpacityPulse 30px ease-in-out infinite;
      
      background-repeat: repeat;
    }

    @media (max-width: 800px) {
      width: 100%;

      overflow: hidden;
    }
  }

  @keyframes slightOpacityPulse {
    0% {
      opacity: 0.8;
      transform: scaleX(-1) scale(1.1);
    }
    50% {
      opacity: 1;
      transform: scaleX(-1) scale(1);
    }
    100% {
      opacity: 0.8;
      transform: scaleX(-1) scale(1.1);
    }
  }

  h1 {
    font-family: "Visby";
    font-weight: 400;
    color: white;
    font-size: 170px;

    margin: 0;

    @media (max-width: 1300px) {
      font-size: 150px;
    }

    @media (max-width: 1050px) {
      font-size: 110px;
    }

    @media (max-width: 800px) {
      text-align: center;
      width: 100%;
      font-size: 50px;
    }
  }

  span {
    font-weight: 1000;
    position: relative;
  }

  span::before {
    content: "";
    position: absolute;
    width: 0;
    height: 8px;
    background-color: white;
    bottom: 0;
    transform: translateY(-15px);

    animation: moveIn 1s 0.6s cubic-bezier(0.93, 0, 0.2, 1) forwards;

    @keyframes moveIn {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }

    @media (max-width: 1050px) {
      transform: translateY(-10px);
      height: 4px;
    }

    @media (max-width: 800px) {
      transform: translateY(-2px);
    }
  }

  #title-container {
    padding: 0;
    margin-left: 5vw;
    margin-top: 5vw;

    @media (max-width: 800px) {
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  }

  #content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;

    @media (max-width: 800px) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  }

  #link-container {
    margin-top: 150px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 1300px) {
      gap: 10px;
    }

    @media (max-width: 800px) {
      margin-top: 100px;
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
  }

  .hidden {
    display: none;
  }

  #line-one {
    animation: fadeIn 1s ease;
  }

  #line-two {
    animation: fadeIn 1s ease 0.2s forwards;

    opacity: 0;
  }

  .link {
    width: fit-content;

    transform: translateY(50px);
    transition:
      transform 1s,
      opacity 1s,
      filter 1s;
    opacity: 0;
    
    filter: blur(20px);
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      filter: blur(20px);
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
      transform: translateY(0px);
    }
  }

  @keyframes fadeInNoBlur {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>