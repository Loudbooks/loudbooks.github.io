<script lang="ts">
  import { preload } from "$lib";
  import MusicWaves from "$lib/icons/MusicWaves.svelte";
  import type { SpotifyDTO } from "$lib/types/SpotifyDTO";
  import { onMount } from "svelte";

  let spotifyElement: HTMLElement;
  let spotifyElementTitle: HTMLElement;

  let data: SpotifyDTO | undefined = undefined;
  let imageBase64: string | undefined;
  let response: Promise<SpotifyDTO>;

  let trackName: string = "";
  let artistName: string = "";
  let trackLink: string = "";

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

<a
  id="spotify-container"
  href={trackLink}
  target="_blank"
  bind:this={spotifyElement}
>
  <img src={imageBase64} alt="Album cover" />
  <div id="song-info">
    <div id="title-container">
      <h1 bind:this={spotifyElementTitle} id="track-title">{trackName}</h1>
      <div id="waves-container">
        <MusicWaves />
      </div>
    </div>
    <h2 id="track-artist">by {artistName}</h2>
  </div>

  <div id="mobile-waves-container">
    <MusicWaves />
  </div>
</a>

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

    transform: translateX(150%);
    transition: transform 1s ease;

    max-width: 90vw;

    @media (max-width: 800px) {
      right: 50%;
      transform: translateX(50%) translateY(400%);
      padding-right: 10px;

      height: 20px;
      outline: 2px solid rgb(225, 225, 225, 1);

      border-radius: 13px;

      gap: 15px;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 20px;

      transform: translateX(-20px);

      transition: transform 0.2s ease;

      box-shadow: 0px 0px 15px -4px rgba(0, 0, 0, 0.4);

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

        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
      }
    }

    #song-info {
      transform: translateX(-5px);

      color: black;

      #title-container {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      h1 {
        font-size: 1rem;
        font-weight: 500;
        font-family: "Visby";
        font-weight: 1000;
        margin: 0;
        transition: transform 0.2s;

        display: inline-block;

        white-space: nowrap;
        overflow-x: clip;
        text-overflow: ellipsis;

        @media (max-width: 800px) {
          font-size: 0.9rem;
        }

        @media (max-width: 500px) {
          font-size: 0.8rem;
          max-width: 200px;
        }
      }

      &:active {
        #track-title {
          transform: scale(0.98);
        }

        #track-artist {
          transform: scale(0.98);
        }
      }

      h1:hover::after {
        width: 100%;
      }

      h1::after {
        content: "";
        display: block;
        width: 0%;
        height: 1.5px;
        background-color: black;
        margin-top: -2.5px;

        transition: width 0.5s cubic-bezier(0.93, 0, 0.2, 1);
      }

      h2 {
        font-size: 0.6rem;
        font-weight: 400;
        font-family: "Visby";
        margin: 0;

        white-space: nowrap;
        transition: transform 0.2s;

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

  a:hover {
    cursor: pointer;

    #track-title::after {
      width: 100%;
    }
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
