<script>
  import SpotifyStatus from '../components/SpotifyStatus.svelte';
  import Button from "../components/Button.svelte";
</script>

<div id="page">
  <div id="top-container">
    <div id="title-container">
      <div id="title-wrapper">
        <h1 id="title">
          {#each "Loudbook".split("") as letter, i}
            <span style="animation-delay: {i * 0.05}s" class="letter"
              >{letter}</span
            >
          {/each}
        </h1>
      </div>
      <p id="subtitle">
        {#each "An open source developer focusing on usability and perfection down to the smallest detail.".split(" ") as word, i}
          <div class="word">
            {#each word.split("") as letter, j}
              <span
                style="animation-delay: {(i + j * 0.1) * 0.05 + 0.3}s"
                class="letter">{letter}</span
              >
            {/each}
          </div>

          <span
            style="animation-delay: {(i + word.length * 0.1) * 0.05}s"
            class="letter"
          >
          </span>
        {/each}
      </p>
      <div id="button-container">
        {#each Object.entries( { "https://github.com/Loudbooks": "GitHub", "mailto:contact@loudbook.dev": "Email" }, ) as [url, title], index (url)}
          <div class="button" style="animation-delay: {index * 0.2 + 0.8}s">
            <Button {title} {url} />
          </div>
        {/each}
      </div>
    </div>
            <div class="line" id="title-line"></div>
  </div>
  <div id="footer-container">
    <div id="footer-wrapper">
      <div class="line" id="footer-line">
        <SpotifyStatus />
      </div>
      <div id="tags-wrapper">
        <h1 id="footer" style="animation-delay: 1.1s">
          {#each "developer".split("") as letter, i}
            <span style="animation-delay: {i * 0.05 + 0.8}s" class=""
              >{letter}</span
            >
          {/each}
        </h1>
        <h1 id="footer" style="animation-delay: 1.3s">
          {#each "designer".split("") as letter, i}
            <span style="animation-delay: {i * 0.05 + 0.8}s" class=""
              >{letter}</span
            >
          {/each}
        </h1>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  #page {
    height: calc(100vh - 14rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 7rem;
    gap: 10rem;

    @media (max-width: 1050px) {
      margin: 5rem;
      gap: 5rem;
      height: calc(100vh - 10rem);
    }

    @media (max-width: 875px) {
      margin: 3rem;
      gap: 3rem;
      height: calc(100vh - 6rem);
    }
  }
  #title-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-self: start;

    @media (max-width: 1300px) {
      gap: 1.5rem;
    }
  }
  #footer-container {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 4rem;
    width: 100%;
    height: 100%;

    @media (max-width: 1300px) {
      gap: 2rem;
    }
  }
  #title-wrapper,
  #footer-wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 100%;
    gap: 7rem;

    @media (max-width: 1300px) {
      gap: 3rem;
    }
  }
  #footer-wrapper {
    align-items: end;
  }
  #title-wrapper {
    align-items: start;
    height: auto;
  }
  #button-container {
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    width: max-content;

    @media (max-width: 1300px) {
      flex-wrap: wrap;
      gap: 1.5rem;
    }
  }
  #top-container {
    display: flex;
    flex-direction: row;
    gap: 7rem;
    width: 100%;
    height: 100%;

    @media (max-width: 1300px) {
      gap: 3rem;
    }

    @media (max-width: 875px) {
      height: auto;
      width: 100%;
      justify-content: center;
      gap: 2rem;
    }
  }

  .line {
    flex-grow: 1;
  }

  #title-line {
    opacity: 0;

    animation: scaleToRegularTopRight 1.1s cubic-bezier(0.86, 0, 0, 0.99) forwards;
    animation-delay: 1.5s;
    border-right: 5px solid white;
    border-top: 5px solid white;
    transform-origin: right;

    @media (max-width: 1300px) {
      border-right: 3px solid white;
      border-top: 3px solid white;
    }

    @media (max-width: 875px) {
      display: none;
    }
  }

  #footer-line {
    width: 100%;
    height: 100%;
    opacity: 0;

    animation: scaleToRegularBottomLeft 1.1s cubic-bezier(0.86, 0, 0, 0.99) forwards;
    animation-delay: 1.5s;
    border-bottom: 5px solid white;
    border-left: 5px solid white;
    transform-origin: left;

    @media (max-width: 1300px) {
      border-bottom: 3px solid white;
      border-left: 3px solid white;
    }

    @media (max-width: 875px) {
      border-bottom: 2px solid white;
      border-left: 2px solid white;
    }
  }

  @keyframes scaleToRegularTopRight {
    0% {
      transform: translateY(-100%) translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0) translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes scaleToRegularBottomLeft {
    0% {
      transform: translateY(100%) translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0) translateX(0);
      opacity: 1;
    }
  }

  #title {
    font-family: "Overused Grotesk", sans-serif;
    font-size: 12rem;
    font-weight: 1000;
    color: white;
    margin: 0;
    line-height: 0.7;
    letter-spacing: -0.1rem;
    text-wrap: nowrap;

    @media (max-width: 1300px) {
      font-size: 10rem;
    }

    @media (max-width: 1050px) {
      font-size: 8rem;
    }

    @media (max-width: 875px) {
      font-size: 4rem;
      letter-spacing: -0.05rem;
    }
  }
  #footer {
    font-family: "Overused Grotesk", sans-serif;
    font-size: 8rem;
    font-weight: 100;
    color: white;
    margin: 0;
    line-height: 0.5;
    text-align: right;
    letter-spacing: -0.1rem;
    text-wrap: nowrap;
    opacity: 0;
    animation: letterHover 1s cubic-bezier(0.86, 0, 0, 0.99) forwards;

    @media (max-width: 1300px) {
      font-size: 5rem;
    }

    @media (max-width: 1050px) {
      font-size: 3rem;
    }
  }
  p {
    font-family: "Overused Grotesk", sans-serif;
    font-size: 2rem;
    color: white;
    margin: 0;
    line-height: 1.1;
    font-weight: 300;
    width: 55rem;

    @media (max-width: 1300px) {
      font-size: 1.5rem;
      width: 40rem;
    }

    @media (max-width: 1050px) {
      font-size: 1.4rem;
      width: 35rem;
    }

    @media (max-width: 875px) {
      font-size: 1rem;
      width: 100%;
    }
  }

  #tags-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (max-width: 1300px) {
      gap: 1.5rem;
    }
  }
  .letter {
    opacity: 0;
    animation: letterHover 1s cubic-bezier(0.86, 0, 0, 0.99) forwards;
    display: inline-block;

    color: white;
    white-space: pre;
  }
  .button {
    opacity: 0;
    animation: letterHover 1s cubic-bezier(0.86, 0, 0, 0.99) forwards;
  }
  #subtitle {
    margin-top: 2rem;
    margin-bottom: 2rem;
    animation-delay: 3s;
    animation: squish 3s cubic-bezier(0.86, 0, 0, 0.99) forwards;
  }
  .word {
    display: inline-block;
    margin-right: 0.2rem;
  }
  @keyframes letterHover {
    0% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes squish {
    0% {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
    100% {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>
