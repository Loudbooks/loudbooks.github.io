<script>
    import Background from "../../components/Background.svelte";
    import ProjectCard from "../../components/ProjectCard.svelte";
</script>


<Background imageSrc="background.webp" />

<ProjectCard 
    title="Loudbook"
    description="A web application that allows you to listen to your Spotify music while reading a book. It uses the Spotify API to fetch the currently playing song and displays it in a card format."
    languages={["Svelte", "TypeScript", "Node.js", "Express", "MongoDB"]}
    githubLink="https://github.com/"
    demoLink="https://loudbook.dev"
/>