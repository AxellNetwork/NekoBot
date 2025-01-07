class Command {
    constructor() {
        this.command = "applemusic"
        this.alias = ["aplm", "apple"]
        this.category = ["downloader"]
        this.settings = {
            limit: true
        }
        this.description = "Mencari dan download music dari Apple Music !"
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
        if (!text) throw "> Masukan Pencarian/Link dari Apple Music"
        if (Func.isUrl(text)) {
            if (!/music.apple.com/.test(text)) throw "> Masukan link Apple music !"
            let data = await Scraper.applemusic.download(text);
            if (!data.metadata) throw Func.jsonFormat(data);
            sock.sendFile(m.cht, data.download, data.metadata.name + " | " + data.metadata.artist.name, "> Jika Yang muncul adalah dokumen silahkan download manual Untuk mendengar music\n\n> *Tekan Tombol Unduh diatas*", m, {
                mimetype: "audio/mpeg",
                jpegThumbnail: await sock.resize(data.metadata.image, 400, 400),
            });
        } else {
            let data = await Scraper.applemusic.search(text);
            if (data.length === 0) throw "> Music tidak di temukan"
            let cap = "*– 乂 Apple Music - Search*\n> Pilih lagu yang ingin kamu download !\n\n"
            for (let i of data) {
                cap += `> *- Title :* ${i.title}\n`
                cap += `> *- Artist :* ${i.artist.name}\n`
                cap += `> *- Url :* ${i.song}\n\n`
            }
            m.reply(cap)
        }
    }
}

module.exports = new Command();
