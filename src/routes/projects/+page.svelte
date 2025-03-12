<script>
    import Background from "../../components/Background.svelte";
    import ProjectCard from "../../components/projects/ProjectCard.svelte";
</script>



<Background imageSrc="background.webp" />

<div id="projects-container">
    <h1>projects.</h1>
    <ProjectCard 
        title="Loudbook"
        description="A web application that allows you to listen to your Spotify music while reading a book. It uses the Spotify API to fetch the currently playing song and displays it in a card format."
        languages={["Svelte", "TypeScript", "Node.js", "Express", "MongoDB"]}
        githubLink="https://github.com/"
        demoLink="https://loudbook.dev"
    />
    
</div>

<style lang="scss">
    #projects-container {
        margin: 100px;
    }

    h1 {
        font-size: 7rem;
        color: white;
        font-family: 'Visby';
        font-weight: 1000;
        text-decoration: underline;
        margin: 0;
        height: 100px;
        line-height: 100px;
    }
</style>