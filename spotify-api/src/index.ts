import { getAccessToken } from "./accessTokenHandler";
import { getCurrentPlayingTrack, getAlbum } from "./spotifyAPI";
import { Request, Response } from "express";
import { SpotifyDTO } from "./types/SpotifyDTO";

export let accessToken = getAccessToken();

const app = require("express")();
const PORT = 25653;

let cachedDTO: SpotifyDTO | null;
let lastCachedTime: number;
let cacheTime = 1000 * 30;

app.get("/api/spotify", async (req: Request, res: Response) => {
  if (!cachedDTO || Date.now() - lastCachedTime > cacheTime) {
    let currentPlayingTrackData = await getCurrentPlayingTrack(accessToken);
    lastCachedTime = Date.now();

    if (!currentPlayingTrackData) {
      cachedDTO = null;
      res.json(null).status(204);
      return;
    }

    let albumData = await getAlbum(
      accessToken,
      currentPlayingTrackData.item.album.id,
    );

    if (!albumData) {
      cachedDTO = null;
      res.json(null).status(204);
      return;
    }

    let trackName = currentPlayingTrackData.item.name;
    let albumName = albumData.name;
    let albumImage = albumData.images[0].url;
    let artistName = albumData.artists[0].name;
    let trackLink = currentPlayingTrackData.item.external_urls.spotify;

    cachedDTO = {
      trackName,
      albumName,
      albumImage,
      artistName,
      trackLink,
    };
  }

  res.json(cachedDTO);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export function setAccessToken(newToken: string) {
  accessToken = newToken;
}
