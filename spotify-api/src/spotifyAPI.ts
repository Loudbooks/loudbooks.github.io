import axios from 'axios';
import { cacheTokenToFile } from './accessTokenHandler';

require('dotenv').config();
const refreshToken = process.env.REFRESH_TOKEN;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'https://loudbook.dev/callback';
const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
].join(' ');

const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

export async function exchangeCodeForToken(code: string, clientId: string, clientSecret: string, redirectUri: string) {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data;
};

export async function refreshAccessToken(refreshToken: string) {
    console.log('Refreshing token.');

    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const newToken = response.data.access_token;

    cacheTokenToFile(newToken);

    return newToken;
};

export async function getCurrentPlayingTrack(accessToken: string): Promise<any> {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch((error) => {
        console.log(error.status)

        if (error.response.status === 401) {
            return 401;
        } else {
            return null;
        }
    });

    if (response == 401) {
        if (!refreshToken) {
            console.error('No refresh token found');
            return null;
        }

        accessToken = await refreshAccessToken(refreshToken);

        return await getCurrentPlayingTrack(accessToken);
    }

    if (!response) {
        return null;
    }
  
    if (response.status === 204 || response.status > 400) {
      return null;
    }

    if (response.data.is_playing === false) {
        return null;
    }
  
    return response.data;
};

export async function getAlbum(accessToken: string, albumId: string) {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).catch((error) => {
        console.log(error);
        return null;
    })

    if (!response) {
        return null;
    }

    return response.data;
}