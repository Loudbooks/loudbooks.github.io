<script lang="ts">
    import { onMount } from "svelte";
    import Link from "./Link.svelte";

    export let name: string;
    export let description: string;
    export let link: string;

    let projectBlockElement: HTMLElement;
    let nameElement: HTMLElement;
    let underlineElement: HTMLElement;
    let descriptionElement: HTMLElement;
    let linkElement: HTMLElement;
    let versionBlockElement: HTMLElement;

    $: version = "Loading...";

    onMount(async () => {
        version = await fetchVersion();
    });

    async function fetchVersion() {
        if (document.cookie.includes(`cachedTag${name}`)) {
            return document.cookie.split(`cachedTag${name}=`)[1].split(";")[0];
        }

        const res = await fetch(`https://api.github.com/repos/Loudbooks/${name.replace(" ", "-")}/releases/latest`);

        if (!res.ok) {
            return "Error";
        }

        const data = await res.json();
        document.cookie = `cachedTag${name}=${data.tag_name}; max-age=${3*60*60}; path=/;`;

        return data.tag_name;
    }

    onMount(() => {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    nameElement.style.transform = "translateY(0px)";
                    nameElement.style.opacity = "1";

                    underlineElement.style.width = "100%";
                    underlineElement.style.transform = "translateY(0px)";
                    underlineElement.style.opacity = "1";

                    setTimeout(() => {
                        descriptionElement.style.transform = "translateY(0px)";
                        descriptionElement.style.opacity = "1";
                    }, 300);

                    setTimeout(() => {
                        linkElement.style.transform = "translateY(0px)";
                        linkElement.style.opacity = "1";
                    }, 500);

                    setTimeout(() => {
                        versionBlockElement.style.transform = "translateX(0px)";
                        versionBlockElement.style.opacity = "1";
                    }, 200);
                }
            });
        });

        observer.observe(projectBlockElement);
    });

    onMount(() => {
    })
</script>

<div id="project" bind:this={projectBlockElement}>
    <div id="text-block">
        <div id="name-block" bind:this={nameElement}>
            <div id="name">
                <h1 id="project-name">{name}</h1>
                <div id="line" bind:this={underlineElement}></div>
            </div>
            <div id="small-link">
                <Link destination={link} text={link} glyph="Link" />
            </div>
        </div>
        <p id="project-description" bind:this={descriptionElement}>{description}</p>

        <div id="links" bind:this={linkElement}>
            <Link destination={link} text={link} glyph="Link" />
        </div>  
    </div>
    <a id="version-block" bind:this={versionBlockElement} href={`https://github.com/Loudbooks/${name.replace(" ", "-")}/releases/latest`} target="_blank">
        <div id="release-content">
            <div id="release-title-block">
                <p id="release-title">Release</p>
                <div id="circle"></div>
            </div>
            <h1 id="version">{version}</h1>
        </div>
    </a>
</div>

<style lang="scss">
    #project {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-left: 5vw;

        @media (max-width: 800px) {
            flex-direction: column;
            align-items: flex-start;
            margin-right: 5vw;
            margin-left: 5vw;
        }
    }

    #text-block {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 60%;

        @media (max-width: 800px) {
            width: 100%;
            gap: 5px;
        }

        #project-name {
            font-family: "Visby";
            font-size: 50px;
            font-weight: 1000;
            color: black;
            margin: 0;

            text-align: left;

            position: relative;
            width: fit-content;

            @media (max-width: 800px) {
                font-size: 40px;
                text-align: center;
                width: 100%;
            }
        }

        #name {
            display: flex;
            flex-direction: column;
            width: fit-content;
        }

        #name-block {
            display: flex;

            justify-content: start;
            align-items: center;
            gap: 20px;

            transform: translateY(20px);
            opacity: 0;
            transition: transform 1s, opacity 1s;

            @media (max-width: 800px) {
                gap: 5px;
                justify-content: space-between;
            }
        }

        #line {
            width: 0;
            height: 4px;
            background-color: black;
            transform: translateY(20px);

            transition: width 1s cubic-bezier(.93,0,.2,1), transform 1s, opacity 1s;

            @media (max-width: 800px) {
                // display: none;
            }
        }

        #project-description {
            font-family: "Visby";
            font-size: 25px;
            color: black;
            font-weight: 500;

            transform: translateY(20px);
            opacity: 0;
            transition: transform 1s, opacity 1s;
        }
    }

    #links {
        transform: translateY(20px);
        opacity: 0;
        transition: transform 1s, opacity 1s;

        @media (max-width: 800px) {
            display: none;
        }
    }

    #small-link {
        display: none;

        @media (max-width: 800px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    
    #version-block {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
        padding-right: 100px;
        border-radius: 23px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: #DADADA 3px solid;
        border-right: none;
        height: 60px;
        width: 20%;

        transform: translateX(100%);

        transition: transform 1s, opacity 1s, padding-right 0.3s;

        &:hover {
            cursor: pointer;
            padding-right: 120px;
        }

        &:active {
            padding-right: 100px;
        }

        @media (max-width: 800px) {
            display: none;
        }

        #release-content {
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-40%);
            padding-left: 20px;
            padding-bottom: 0;

            #release-title-block {
                display: flex;
                gap: 8px;
                align-items: center;

                #circle {
                    width: 6px;
                    height: 6px;
                    background-color: #08C83D;
                    border-radius: 50%;
                }

                #release-title {
                    font-family: "Visby";
                    font-size: 17px;
                    color: #525252;
                    font-weight: 800;
                    margin: 0;
                }
            }

            #version {
                font-family: "Visby";
                font-size: 40px;
                font-weight: 1000;
                color: black;
                margin: 0;
            }
        }
    }
</style>