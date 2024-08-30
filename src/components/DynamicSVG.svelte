<script lang="ts">
    export let iconName = "";
  
    let svgIcon: ConstructorOfATypedSvelteComponent | null = null;

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
    <svelte:component this={svgIcon} />
  {/if}