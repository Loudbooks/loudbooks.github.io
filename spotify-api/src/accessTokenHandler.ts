let fs = require('fs');
let accessTokenFilePath = './cache'

export function cacheTokenToFile(token: string) {
    fs.writeFileSync(accessTokenFilePath, token);
}

export function getAccessToken() {
    if (!fs.existsSync(accessTokenFilePath)) {
        console.error('No access token found');
        return
    }

    return fs.readFileSync(accessTokenFilePath, 'utf8');
}