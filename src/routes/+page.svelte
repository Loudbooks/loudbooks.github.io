<script>
  import Button from "../components/Button.svelte";
</script>

<div id="page">
  <div id="title-container">
    <div id="title-wrapper">
      <h1 id="title">
        {#each "Loudbook".split("") as letter, i}
          <span style="animation-delay: {i * 0.05 + .5}s" class="letter">{letter}</span>
        {/each}
      </h1>
      <div class="line" id="title-line"></div>
    </div>
    <p id="subtitle">
      {#each "An open source developer focusing on usability and perfection down to the smallest detail.".split(" ") as word, i}
      <div class="word">
        {#each word.split("") as letter, j}
          <span style="animation-delay: {(i + j * 0.1) * 0.05 + .5}s" class="letter">{letter}</span>
        {/each}
      </div>

        <span style="animation-delay: {(i + word.length * 0.1) * 0.05 + .5}s" class="letter"> </span>
      {/each}
    </p>
    <div id="button-container">
      {#each Object.entries({
        "https://github.com/Loudbooks": "GitHub",
        "mailto:contact@loudbook.dev": "Email",
      }) as [url, title], index (url)}
        <div class="button" style="animation-delay: {index * 0.2 + .8 + .5}s">
        <Button {title} {url} />
        </div>
      {/each}
    </div>
  </div>
  <div id="footer-container">
    <div id="footer-wrapper">
      <div class="line" id="footer-line"></div>
      <div id="tags-wrapper">
        <h1 id="footer">developer</h1>
        <h1 id="footer">designer</h1>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  #page {
    height: 100vh;
    width: 100vw;
  }
  #title-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    top: 8rem;
    left: 8rem;
  }
  #footer-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4rem;
    bottom: 8rem;
    right: 8rem;
  }
  #title-wrapper,
  #footer-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100vw;
  }
  #button-container {
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
  }

  .line {
    height: 0.4rem;
    background-color: white;
    flex-grow: 1;
  }

  #title-line {
    margin-left: 15rem;
    // transform: scaleY(100) scaleX(9);
    width: 50vw;

    // animation: scaleToRegular 1.5s cubic-bezier(0.86,0,0,0.99) forwards;
  }

  #footer-line {
    margin-right: 15rem;
    // transform: scaleY(100) scaleX(9);

    // animation: scaleToRegular 1.5s cubic-bezier(0.86,0,0,0.99) forwards;
  }

  @keyframes scaleToRegular {
    0% {
      transform: scaleY(100) scaleX(9);
    }
    60% {
      transform: scaleY(1) scaleX(1.1);
    }
    100% {
      transform: scale(1);
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
  }
  #footer {
    font-family: "Overused Grotesk", sans-serif;
    font-size: 8rem;
    font-weight: 100;
    color: white;
    margin: 0;
    line-height: 0.5;
    text-align: right;
  }
  p {
    font-family: "Overused Grotesk", sans-serif;
    font-size: 2rem;
    color: white;
    margin: 0;
    line-height: 1.1;
    font-weight: 300;
    width: 55rem;
  }
  #tags-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  .letter {
    opacity: 0;
    animation: letterHover 1s cubic-bezier(0.86,0,0,0.99) forwards;
    display: inline-block;

    color: white;
    white-space: pre;
  }
  .button {
    opacity: 0;
    animation: letterHover 1s cubic-bezier(0.86,0,0,0.99) forwards;
  }
  #subtitle {
    margin-top: 2rem;
    margin-bottom: 2rem;
    animation-delay: 3s;
    animation: squish 3s cubic-bezier(0.86,0,0,0.99) forwards;
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
      margin-top : 2rem;
      margin-bottom: 2rem;
    }
    100% {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>
