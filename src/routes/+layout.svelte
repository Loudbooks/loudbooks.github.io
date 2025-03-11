<script lang="ts">
  import Background from "../components/Background.svelte";
  import Header from "../components/Header.svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<!-- <Header /> -->
<Background />

<div id="all-content">
    {@render children?.()}
</div>

<style lang="scss">
  #all-content {
    animation: fadeIn 0.5s ease-in-out forwards;
    opacity: 1;
    background-color: transparent;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
</style>
