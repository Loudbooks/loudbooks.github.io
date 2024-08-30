<script lang="ts">
  import { onMount } from "svelte";
  import Link from "../components/Link.svelte";

  let linkContainer: HTMLElement;

  onMount(() => {
    const links = linkContainer.children;

    console.log(links);

    for (let i = 0; i < links.length; i++) {
        let link = links[i] as HTMLElement;

        setTimeout(() => {
            link.style.transform = "translateY(0px)";
            link.style.opacity = "1";
        }, (i + 3) * 200);
    }
  })
</script>
<div id="background">
    <div id="overlay"/>
    <div id="elipse"/>
    
    <div id="content">
        <div id="title-container">
            <h1 id="line-one">Hi.</h1>
            <h1 id="line-two">I'm <span>Loudbook</span>.</h1>
            <div id="link-container" bind:this={linkContainer}>
                <div id="link-one" class="link">
                    <Link destination="https://github.com/Loudbooks" text="https://github.com/Loudbooks" glyph="GitHub" />
                </div>
                <div id="link-two" class="link">
                    <Link destination="mailto:contact@loudbook.dev" text="contact@loudbook.dev" glyph="Email" />
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    #overlay {
        content: '';
        backdrop-filter: blur(200px);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;

        background-color: rgba(255, 255, 255, 0.03);
    }

    h1 {
        font-family: "Visby";
        font-weight: 400;
        color: white;
        font-size: 170px;

        margin: 0;

        @media (max-width: 1300px) {
            font-size: 150px;
        }

        @media (max-width: 1050px) {
            font-size: 110px;
        }

        @media (max-width: 800px) {
            text-align: center;
            width: 100%;
            font-size: 60px;
        }
    }

    span {
        font-weight: 1000;
        position: relative;
    }

    span::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 4px;
        background-color: white;
        bottom: 0;
    }

    #title-container {
        padding: 0;
        margin-left: 5vw;
        margin-top: 5vw;

        @media (max-width: 800px) {
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
    }

    #elipse {
        position: absolute;
        left: -50vw;
        top: -45vh;
        width: 140vw;
        height: 160vh;
        background: linear-gradient(290deg, #F05A4D 30%, #F4528E 40%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 9999px;

        clip-path: ellipse(50% 30% at 50% 50%);

        animation: flyIn 1s ease;

        @media (max-width: 600px) {
            left: -100vw;
            top: -25vw;
            width: 200vw;
            height: 100vh;
            clip-path: none;
        }

        @keyframes flyIn {
            0% {
                opacity: 0;
                transform: translateY(-100px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    #content {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
        width: 100%;

        @media (max-width: 800px) {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
    }

    #link-container {
        margin-top: 150px;

        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (max-width: 1300px) {
            gap: 10px;
        }

        @media (max-width: 800px) {
            margin-top: 100px;
            display: flex;
            flex-direction: row;
            gap: 20px;
        }
    }

    #line-one {
        animation: fadeIn 1s ease;
    }

    #line-two {
        animation: fadeIn 1s ease 0.2s forwards;

        opacity: 0;
    }

    .link {
        width: fit-content;

        transform: translateY(50px);
        transition: transform 1s, opacity 1s;
        opacity: 0;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>