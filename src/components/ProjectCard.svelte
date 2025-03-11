<script lang="ts">
  interface Props {
    title: string;
    description: string;
    languages: string[];
    githubLink: string;
    demoLink: string;
  }

  let {
    title,
    description,
    languages,
    githubLink,
    demoLink
  }: Props = $props();
</script>

<div id="project-card">
  <div id="project-card-content">
    <h1>{title}</h1>
    <p>{description}</p>
    <div id="languages-container">
      {#each languages as language}
        <span class="language">{language}</span>
      {/each}
    </div>
    <div id="links-container">
      <a href={githubLink} target="_blank">GitHub</a>
      {#if demoLink}
        <a href={demoLink} target="_blank">Demo</a>
      {/if}
    </div>
  </div>
</div>
