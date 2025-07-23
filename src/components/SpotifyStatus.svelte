<script lang="ts">
  import MusicWaves from "$lib/icons/MusicWaves.svelte";
  import { preload } from "$lib";
  import type { SpotifyDTO } from "$lib/types/SpotifyDTO";
  import { onMount } from "svelte";

  let spotifyElement: HTMLElement | undefined = $state();
  let spotifyElementTitle: HTMLElement | undefined = $state();

  let data: SpotifyDTO | undefined = $state(undefined);
  let imageBase64: string | undefined = $state();
  let response: Promise<SpotifyDTO>;

  let trackName: string = $state("");
  let artistName: string = $state("");
  let trackLink: string = $state("");

  onMount(async () => {
    response = fetchSong();

    setInterval(() => {
      fetchSong().then((updatedData) => {
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
    return fetch("/api/spotify")
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

        imageBase64 = (await preload(json.albumImage)) as string;

        data = json;

        trackName = json.trackName;
        artistName = json.artistName;
        trackLink = json.trackLink;

        if (spotifyElement !== undefined) {
          if (window.innerWidth < 800) {
            spotifyElement.style.transform = "translateY(0) translateX(50%)";
          } else {
            spotifyElement.style.transform = "translateX(0)";
          }
        }

        return json;
      })
      .catch(() => {
        if (spotifyElement == undefined) {
          data = undefined;
          return undefined;
        }

        if (window.innerWidth < 800) {
          spotifyElement.style.transform = "translateY(400%) translateX(50%)";
        } else {
          spotifyElement.style.transform = "translateX(150%)";
        }

        setTimeout(() => {
          data = undefined;
        }, 1000);

        return undefined;
      }) as Promise<SpotifyDTO>;
  }
</script>

{#if data !== undefined}
<div id="waves">
  <MusicWaves />
  {#if window.innerWidth < 800}
    <p>
      <a href={trackLink} target="_blank" rel="noopener noreferrer">
        {trackName}
      </a>
      by {artistName}
    </p>
  {:else}
    <p>
      Listening to
      <a href={trackLink} target="_blank" rel="noopener noreferrer"> {trackName} </a>
      by {artistName}
    </p>
  {/if}
</div>

{/if}

<style lang="scss">
  #waves {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    @media (max-width: 800px) {
      gap: 5px;
    }
  }

  p {
    font-family: "Overused Grotesk", sans-serif;
    font-size: 1.5rem;
    color: white;
    margin: 0;
    line-height: 1.1;
    font-weight: 300;
    width: 55rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @media (max-width: 1300px) {
      font-size: 1.5rem;
      width: 40rem;
    }

    @media (max-width: 1050px) {
      font-size: 1.4rem;
      width: 35rem;
    }

    @media (max-width: 875px) {
      font-size: 1rem;
      width: 100%;
    }
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
</style>
