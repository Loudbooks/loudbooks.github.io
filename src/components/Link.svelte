<script lang="ts">
  import DynamicSvg from "./DynamicSVG.svelte";

  export let destination: string;
  export let text: string;
  export let glyph: string;
</script>

<a href={destination} target="_blank">
  <div id="link-container">
    <DynamicSvg iconName={glyph} />
    <span>{text}</span>
  </div>
</a>

<style lang="scss">
  a {
    text-decoration: none;
    width: fit-content;

    &:hover {
      cursor: pointer;
    }
  }

  #link-container {
    display: flex;
    align-items: center;
    gap: 20px;

    transition: transform 0.3s;

    @media (max-width: 1300px) {
      gap: 10px;
    }

    span {
      font-family: "Visby";
      font-weight: 400;
      color: white;
      font-size: 30px;
      text-decoration: none;
      position: relative;

      @media (max-width: 1300px) {
        font-size: 25px;
        width: 100%;
      }

      @media (max-width: 1050px) {
        font-size: 20px;
      }

      @media (max-width: 800px) {
        display: none;
      }
    }

    &:hover {
      transform: translateX(5px);

      @media (max-width: 800px) {
        transform: translateY(-4px);
      }
    }

    span::before {
      content: "";
      position: absolute;
      width: 0;
      height: 3px;
      background-color: white;
      bottom: 0;

      transition: width 0.5s cubic-bezier(0.93, 0, 0.2, 1);

      @media (max-width: 1300px) {
        height: 2px;
      }
    }

    span:hover::before {
      width: 100%;
    }

    &:active {
      transform: translateX(0px);
    }

    &:hover {
      cursor: pointer;

      span::before {
        width: 100%;
      }
    }
  }
</style>
