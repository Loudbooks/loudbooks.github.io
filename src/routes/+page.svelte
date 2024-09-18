<script lang="ts">
  import { onMount } from "svelte";
  import Link from "../components/Link.svelte";
  import SpotifyCard from "../components/SpotifyCard.svelte";

  let linkContainer: HTMLElement;

  onMount(() => {
    const links = linkContainer.children;

    for (let i = 0; i < links.length; i++) {
        let link = links[i] as HTMLElement;

        setTimeout(() => {
            link.style.transform = "translateY(0px)";
            link.style.opacity = "1";
        }, (i + 4) * 200);
    }
  })
</script>
<div id="background">
    <img src="landing.webp" alt="Background" />

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

    <SpotifyCard />
</div>


<style lang="scss">
    img {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        z-index: 1000;

        @media (max-width: 1100px) {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        @media (max-width: 800px) {
            transform: rotate(90deg) translateY(20%);
            width: 100vh;
        }

        animation: fadeIn 1s ease;
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
            font-size: 50px;
        }
    }

    span {
        font-weight: 1000;
        position: relative;
    }

    span::before {
        content: '';
        position: absolute;
        width: 0;
        height: 4px;
        background-color: white;
        bottom: 0;

        animation: moveIn 1s 0.6s cubic-bezier(.93,0,.2,1) forwards;

        @keyframes moveIn {
            0% {
                width: 0;
            }
            100% {
                width: 100%;
            }
        }
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
        }
        100% {
            opacity: 1;
        }
    }
</style>