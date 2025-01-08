const axios = require("axios");

const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3";
const client_secret = "0e8439a1280a43aba9a5bc0a16f3f009";
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function spotifyCreds() {
    try {
        const response = await axios.post(
            TOKEN_ENDPOINT,
            "grant_type=client_credentials", {
                headers: {
                    Authorization: "Basic " + basic,
                },
            },
        );
        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        return {
            status: false,
            msg: "Failed to retrieve Spotify credentials.",
        };
    }
}

const toTime = (ms) => {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
};

class Spotify {
    search = async (query, type = "track", limit = 20) => {
        try {
            const creds = await spotifyCreds();
            if (!creds.status) return creds;

            const response = await axios.get(
                `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=${type}&offset=0&limit=${limit}`, {
                    headers: {
                        Authorization: "Bearer " + creds.data.access_token,
                    },
                },
            );

            if (
                !response.data[type + "s"] ||
                !response.data[type + "s"].items.length
            ) {
                return {
                    msg: "Music not found!",
                };
            }

            return response.data[type + "s"].items.map((item) => ({
                title: item.name,
                id: item.id,
                duration: toTime(item.duration_ms),
                artist: item.artists.map((artist) => artist.name).join(" & "),
                url: item.external_urls.spotify,
            }));
        } catch (error) {
            return {
                status: false,
                msg: "Error searching for music. " + error.message,
            };
        }
    };

    download = async function dl(url) {
        try {
            const response = await axios
                .get(`https://api.fabdl.com/spotify/get?url=` + url, {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
                    },
                })
                .catch((e) => e.response);

            if (!response.data.result) {
                return {
                    msg: "Failed to get track info",
                };
            }
            const {
                data
            } = await axios
                .get(
                    `https://api.fabdl.com/spotify/mp3-convert-task/${response.data.result.gid}/${response.data.result.id}`,
                )
                .catch((e) => e.response);
            if (!data?.result?.download_url)
                return {
                    msg: "Link download not found !",
                };
            return {
                title: response.data.result.name,
                duration: toTime(response.data.result.duration_ms),
                cover: response.data.result.image,
                download: "https://api.fabdl.com" + data?.result?.download_url,
            };
        } catch (error) {
            return {
                msg: "Error Detected",
                err: error.message,
            };
        }
    };
    playlist = async function playlist(url) {
        try {
            const id = url.split("/playlist/")[0].trim().split("?si=")[0].trim();
            const {
                data
            } = await axios.get(
                "https://api.spotifydown.com/trackList/playlist/0F1VNeiZKjtX06yrVSqlbu", {
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
                        Origin: "https://spotifydown.com",
                        Referer: "https://spotifydown.com/",
                        "Referrer-Policy": "strict-origin-when-cross-origin",
                    },
                },
            ).catch(e => e.response);
            if (!data.trackList) return []
            return data.trackList.map((a) => ({
                ...a,
                url: "https://open.spotify.com/track/" + a.id
            }))
        } catch (err) {
            return []
        }
    }
}
module.exports = new Spotify();