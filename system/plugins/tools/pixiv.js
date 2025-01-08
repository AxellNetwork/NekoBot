class Command {
  constructor() {
    this.command = "pixiv";
    this.alias = [];
    this.category = ["tools"];
    this.settings = {
      premium: true,
    };
    this.description = "Mencari gambar dari Pixiv";
    this.loading = true;
  }
  run = async (m, { sock, Func, Scraper, config, store, text }) => {
    if (!text) throw "> Masukan Pencarian nya";
    let { data } = await Func.fetchJson(
      `https://api.lolicon.app/setu/v1?r18=${text.includes("--r18") ? 1 : 0}&keyword=${text.replace("--r18", "").trim()}&limit=20`,
    );
    if (!data[0]?.title) throw "> Gambar tidak ditemukan !";
    let cap = "*– 乂 Pixiv - Search*\n";
    cap += `> *- Title :* ${data[0]?.title}\n`;
    cap += `> *- R18 :* ${data[0]?.r18 ? "✓" : "x"}\n`;
    cap += `> *- Author :* ${data[0]?.author}\n`;
    cap += `> *- Tags :* ${data[0]?.tags.join(", ")}\n`;
    m.reply({
      image: {
        url: data[0].url,
      },
      caption: cap,
    });
  };
}

module.exports = new Command();
