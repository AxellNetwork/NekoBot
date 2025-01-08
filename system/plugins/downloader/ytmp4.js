/* Features Play YouTube
 * Base API : https://axeel.my.id/docs
 * Code by : AxellNetwork
 */

const yts = require("yt-search");
const axios = require("axios");

module.exports = {
  command: "ytmp4",
  alias: ["ytv"],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "Mencari audio Dari YouTube",
  async run(m, { sock, Func, text }) {
    if (!text) return m.reply("> Masukkan text nya");
    m.reply("> Tunggu sebentar");

    let isUrl = Func.isUrl(text);
    let txt = "";
    if (isUrl) {
      txt = isUrl[0];
    } else {
      txt = (await yts(text)).videos.getRandom().url;
    }
    let { data } = await axios
      .get("https://ytdl.axeel.my.id/api/download/video?url=" + txt, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .catch((e) => e.response);
    data.metadata.thumbnail = data.metadata.thumbnail.url;
    let cap = "*– 乂 YouTube - play*\n";
    cap += Object.entries(data.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    cap += "\n\n© Simple WhatsApp bot by AxellNetwork";

    sock
      .sendMessage(
        m.cht,
        {
          image: {
            url: data.metadata.thumbnail,
          },
          caption: cap,
        },
        {
          quoted: m,
        },
      )
      .then((a) => {
        sock.sendMessage(
          m.cht,
          {
            video: data.downloads,
          },
          {
            quoted: a,
          },
        );
      });
  },
};
