<script lang="ts">
  interface Props {
    iconName?: string;
  }

  let { iconName = "" }: Props = $props();

  let svgIcon: ConstructorOfATypedSvelteComponent | null = $state(null);

  loadIcon();

  async function loadIcon() {
    if (iconName) {
      try {
        svgIcon = (await import(`../lib/icons/${iconName}.svelte`)).default;
      } catch (e) {
        console.error("Component not found:", e);
        svgIcon = null;
      }
    }
  }
</script>

{#if svgIcon}
  {@const SvelteComponent = svgIcon}
  <SvelteComponent />
{/if}
