<script lang="ts">
    import MusicWaves from "$lib/icons/MusicWaves.svelte";
    import type { SpotifyDTO } from "$lib/types/SpotifyDTO";
    import { onMount } from "svelte";

    let spotifyElement: HTMLElement;

    let data: SpotifyDTO | undefined = undefined;
    let imageBase64: string | undefined;
    let response: Promise<SpotifyDTO>;

    let trackName: string = "";
    let artistName: string = "";
    let trackLink: string = "";

    onMount(async () => {
        response = fetchSong();

        setInterval(() => {
            fetchSong().then(updatedData => {
                if (updatedData === undefined) {
                    return;
                }

                if (data == undefined) {
                    response = Promise.resolve(updatedData);
                }

                data = updatedData;
            });
        }, 10000);
    });

    function fetchSong() {
        return fetch("https://loudbook.dev/api/spotify")
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error("Failed to fetch Spotify data.");
                }

                return res.json();
            })
            .then(async (json: SpotifyDTO) => {
                if (data != null && data.trackName == json.trackName) {
                    return data;
                }

                data = json;

                trackName = json.trackName;
                artistName = json.artistName;
                trackLink = json.trackLink;

                imageBase64 = await preload(json.albumImage) as string;

                if (spotifyElement !== undefined && spotifyElement.style.display == "none") {
                    spotifyElement.style.display = "flex";
                    if (window.innerWidth < 800) {
                        spotifyElement.style.transform = "translateY(0) translateX(50%)";
                    } else {
                        spotifyElement.style.transform = "translateX(0)";
                    }
                }

                return json;
            })
            .catch((error) => {
                console.log("No Spotify data available.");

                if (spotifyElement === undefined) {
                    return undefined;
                }

                if (window.innerWidth < 800) {
                    spotifyElement.style.transform = "translateY(400%) translateX(50%)";
                } else {
                    spotifyElement.style.transform = "translateX(100%)";
                }

                setTimeout(() => {
                    spotifyElement.style.display = "none";
                    data = undefined;
                }, 1000);

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
        <a id="spotify-container" href="{trackLink}" bind:this={spotifyElement}>
            <img src={imageBase64} alt="Album cover" />
            <div id="song-info">
                <div id="title-container">
                    <h1>{trackName}</h1>
                    <div id="waves-container">
                        <MusicWaves />
                    </div>  
                </div>
                <h2>by {artistName}</h2>
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

        background-color: rgb(255, 255, 255, 1);
        border-radius: 30px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        height: 35px;
        outline: 4px solid rgb(225, 225, 225, 1);

        animation: flyIn 1s ease;

        @media (max-width: 800px) {
            right: 50%;
            transform: translateX(50%);
            padding-right: 10px;

            height: 20px;
            outline: 2px solid rgb(225, 225, 225, 1);

            border-radius: 13px;

            gap: 15px;

            animation: flyInMobile 1s ease;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 20px;

            transform: translateX(-20px);

            transition: transform 0.2s ease;

            &:hover {
                transform: scale(1.05) translateX(-20px);

                @media (max-width: 800px) {
                    transform: scale(1.05) translateX(-4px);
                }
            }

            &:active {
                transform: scale(1) translateX(-20px);

                @media (max-width: 800px) {
                    transform: scale(1) translateX(-4px);
                }
            }

            @media (max-width: 800px) {
                width: 30px;
                height: 30px;

                border-radius: 10px;

                transform: translateX(-4px);
            }
        }

        #song-info {
            transform: translateX(-5px);

            color: black;

            #title-container {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            h1 {
                font-size: 1rem;
                font-weight: 500;
                font-family: "Visby";
                font-weight: 1000;
                margin: 0;

                display: inline-block;

                white-space: nowrap;
                
                @media (max-width: 800px) {
                    font-size: 0.9rem;
                }
            }

            h2 {
                font-size: 0.6rem;
                font-weight: 400;
                font-family: "Visby";
                margin: 0;

                white-space: nowrap;

                @media (max-width: 800px) {
                    font-size: 0.5rem;
                } 
            }
        }

        #waves-container {
            display: inline-block;
        }

        #mobile-waves-container {
            display: none;
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

    @keyframes flyInMobile {
        0% {
            transform: translateY(400%) translateX(50%);
        }

        100% {
            transform: translateY(0) translateX(50%);
        }
    }
</style>