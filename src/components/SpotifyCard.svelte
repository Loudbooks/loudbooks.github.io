<script lang="ts">
    import MusicWaves from "$lib/icons/MusicWaves.svelte";
import type { SpotifyDTO } from "$lib/types/SpotifyDTO";
    import { onMount } from "svelte";

    let data: SpotifyDTO | undefined;
    let imageBase64: string | undefined;
    let response: Promise<SpotifyDTO>;

    onMount(() => {
        response = fetchSong();

        setInterval(fetchSong, 10000);
    });

    function fetchSong() {
        return fetch("http://localhost:25653/api/spotify")
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error("Failed to fetch Spotify data.");
                }

                return res.json();
            })
            .then(async (json: SpotifyDTO) => {
                if (data !== undefined && data.trackName == json.trackName) {
                    return data;
                }

                data = json;

                imageBase64 = await preload(json.albumImage) as string;

                return json;
            })
            .catch((error) => {
                console.log("No Spotify data available.");
                return undefined;
            }) as Promise<SpotifyDTO>;
    }

    async function preload(src: string) {
        const resp = await fetch(src);
        const blob = await resp.blob();

        return new Promise(function (resolve) {
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => {
                console.error(error);
                resolve(null);
            }
        });
    };

</script>

{#await response then data}
    {#if data !== undefined}
        <a id="spotify-container" href="{data.trackLink}">
            <img src={imageBase64} alt="Album cover" />
            <div id="song-info">
                <div id="title-container">
                    <h1>{data.trackName}</h1>
                    <div id="waves-container">
                        <MusicWaves />
                    </div>  
                </div>
                <h2>by {data.artistName}</h2>
            </div>

            <div id="mobile-waves-container">
                <MusicWaves />
            </div>
        </a>
    {/if}
{/await}

<style lang="scss">
    #spotify-container {
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        bottom: 30px;
        right: -10px;
        z-index: 1005;
        padding: 10px;
        padding-right: 100px;

        background-color: white;
        border-radius: 30px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        height: 35px;

        outline: 4px solid rgb(225, 225, 225, 1);

        animation: flyIn 1s ease;

        @media (max-width: 800px) {
            width: 0;
            padding-right: 50px;
            background-color: transparent;
            outline: none;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 20px;

            transform: translateX(-20px);

            transition: transform 0.2s ease;

            &:hover {
                transform: scale(1.05) translateX(-20px);
            }

            &:active {
                transform: scale(1) translateX(-20px);
            }
        }

        #song-info {
            transform: translateX(-5px);

            color: black;

            @media (max-width: 800px) {
                display: none;
            }

            #title-container {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            h1 {
                font-size: 1rem;
                font-weight: 500;
                font-family: "Visby";
                font-weight: 1000;
                margin: 0;

                display: inline-block;
            }

            h2 {
                font-size: 0.6rem;
                font-weight: 400;
                font-family: "Visby";
                margin: 0;
            }
        }

        #waves-container {
            display: inline-block;
        }

        #mobile-waves-container {
            display: none;

            @media (max-width: 800px) {
                display: inline-block;
                position: absolute;
                right: 27px;
                bottom: -15px;
            }
        }
    }

    a {
        transition: transform 0.2s;
    }

    a:link {
        text-decoration: none !important;
    }

    a:-webkit-any-link {
        text-decoration: none !important;
    }

    @keyframes flyIn {
        0% {
            transform: translateX(100%);
        }

        100% {
            transform: translateX(0);
        }
    }
</style>