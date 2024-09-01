<script>
  import Project from "../projects/Project.svelte";

</script>
<div id="projects">
    <Project name="ReportBook" description="Simplistic automated diagnostic tool for Windows and macOS. A tool intended to be used to gather information to help solve a variety of technical issues caused by interfering software." link="https://github.com/Loudbooks/ReportBook" />
    <Project name="PasteBook" description="An aesthetic, effortless way to share your blocks of text. Beautiful, secure, customizable, with live issue reporting on ReportBook files." link="https://pastebook.dev/" />
    <Project name="GitHub Yoinker" description="Programmatically keep your files up to date by automatically downloading the latest release." link="https://github.com/Loudbooks/GitHub-Yoinker" />
</div>

<style lang="scss">
    #projects {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 100px;
        width: 100%;
        margin-top: 100px;

        z-index: 1002;
    }
</style>