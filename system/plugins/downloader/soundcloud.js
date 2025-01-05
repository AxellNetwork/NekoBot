class Command {
    constructor() {
        this.command = "soundclound"
        this.alias = ["sound", "scloud"]
        this.category = ["downloader"]
        this.settings = {
            limit: true
        }
        this.description = "Mencari dan download music dari Soundclound !"
        this.loading = true
    }
    run = async (m, {
        sock,
        Func,
        Scraper,
        config,
        store,
        text
    }) => {
        if (!text) throw "> Masukan Pencarian/Link dari SoundClound"
        if (Func.isUrl(text)) {
            if (!/soundcloud.com/.test(text)) throw "> Masukan link SoundClound !"
            let data = await Scraper.soundcloud.download(text);
            if (!data.download) throw Func.jsonFormat(data);
            let cap = "*– 乂 SoundClound - Download*\n\n"
            cap += Object.entries(data).map(([a, b]) => `> *- ${a} :* ${b}`).join("\n");

            m.reply(cap).then((a) => {
                sock.sendFile(m.cht, data.download, data.title, "> Jika Yang muncul adalah dokumen silahkan download manual Untuk mendengar music\n\n> *Tekan Tombol Unduh diatas*", a, {
                    mimetype: "audio/mpeg"
                });
            });
        } else {
            let data = await Scraper.soundcloud.search(text);
            if (data.length === 0) throw "> Music tidak di temukan"
            let cap = "*– 乂  SoundClound - Sesrch*\n> Pilih lagu yang ingin kamu download !\n\n"
            for (let i of data) {
                cap += `> *- Title :* ${i.title}\n`
                cap += `> *- Url :* ${i.url}\n\n`
            }
            m.reply(cap)
        }
    }
}

module.exports = new Command();