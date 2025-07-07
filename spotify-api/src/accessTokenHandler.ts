import { env } from "process";

let fs = require("fs");
let cachePath = env.CACHE_PATH || "./cache";

export function cacheTokenToFile(token: string) {
  fs.writeFileSync(cachePath, token);
}

export function getAccessToken() {
  if (!fs.existsSync(cachePath)) {
    console.error("No access token found");
    return;
  }

  let readString = fs.readFileSync(cachePath, "utf8");
  let sanitizedToken = readString.trim().replace(/[\n\r]/g, "");

  return sanitizedToken;
}
