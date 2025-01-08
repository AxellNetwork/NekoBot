const axios = require("axios");

module.exports = {
  command: "spotify",
  alias: [],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "Mencari/download musik dari Spotify",
  loading: true,
  async run(m, { sock, Func, Scraper, text }) {
    if (!text)
      throw `> *乂 Cara Penggunaan :*
> *-* Masukan Query untuk mencari video
> *-* Masukan Url untuk mendownload musik

> *乂 Contoh Penggunaan :*
> *- ${m.prefix + m.command} Video lucu*
> *- ${m.prefix + m.command} https://open.spotify.com/track/057YRaQ57p70MVg4hMIIkB*`;

    if (/open.spotify.com/.test(text)) {
      let data = await Scraper.spotify.download(text);
      let cap = "*– 乂 Spotify - Downloader*\n\n";
      cap += Object.entries(data)
        .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
        .join("\n");
      m.reply(cap).then((a) => {
        m.reply({
          audio: {
            url: data.download,
          },
          mimetype: "audio/mpeg",
        });
      });
    } else {
      let data = await Scraper.spotify.search(text);
      let cap = `*– 乂 Spotify - search*
`;
      cap += `> Ketik *${m.prefix + m.command} ${data[0].url}* untuk mendownload musik dari spotify\n\n`;
      cap += data
        .map((a) =>
          Object.entries(a)
            .map(([b, c]) => `> *- ${b.capitalize()} :* ${c}`)
            .join("\n"),
        )
        .join("\n\n");
      m.reply(cap);
    }
  },
};
