<script lang="ts">
    import Landing from "../components/pages/Landing.svelte";
    import Projects from "../components/pages/Projects.svelte";
</script>

<div id="main">
    <div id="landing" class="snap">
        <Landing />
    </div>
    <div id="content" class="snap">
        <Projects />
    </div>
</div>

<style lang="scss">
    #main {
        height: 300vh;

    }

    #landing {
        height: 100vh;

        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .snap {
        scroll-snap-align: start;
        height: 100%;
    }
</style>