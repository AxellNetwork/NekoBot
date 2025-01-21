class Command {
    constructor() {
        this.command = "applemusic";
        this.alias = ["aplm", "apple"];
        this.category = ["downloader"];
        this.settings = {
            limit: true,
        };
        this.description = "🎵 Cari dan download musik dari Apple Music!";
        this.loading = true;
    }
    run = async (m, {
        sock,
        Func,
        Scraper,
        config,
        store,
        text
    }) => {
        if (!text) throw "> ❌ *Masukkan pencarian atau link dari Apple Music*";
        
        if (Func.isUrl(text)) {
            if (!/music.apple.com/.test(text)) throw "> ❌ *Link yang dimasukkan bukan link Apple Music!*";
            let data = await Scraper.applemusic.download(text);
            if (!data.metadata) throw Func.jsonFormat(data);

            sock.sendFile(
                m.cht,
                data.download,
                `${data.metadata.name} | ${data.metadata.artist.name}.mp3`,
                `🎧 *Silakan download musik ini dengan menekan tombol di atas*\n\n> *Catatan*: Jika file muncul sebagai dokumen, silakan download manual.`,
                m, {
                    mimetype: "audio/mpeg",
                    jpegThumbnail: await sock.resize(data.metadata.image, 400, 400),
                },
            );
        } else {
            let data = await Scraper.applemusic.search(text);
            if (data.length === 0) throw "> ❌ *Musik tidak ditemukan*";

            let cap = `*– 乂 Apple Music - Hasil Pencarian*\n> 🎤 *Pilih lagu yang ingin kamu download!*\n\n`;
            for (let i of data) {
                cap += `> 🎶 *Judul*: ${i.title}\n`;
                cap += `> 👨‍🎤 *Artis*: ${i.artist.name}\n`;
                cap += `> 🔗 *Link*: ${i.song}\n\n`;
            }
            m.reply(cap);
        }
    };
}

module.exports = new Command();
