const axios = require("axios");

module.exports = {
  command: "tiktok",
  alias: ["tt", "ttdl", "tiktokdl"],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "🎥 Mengunduh video dari TikTok dengan URL!",
  loading: true,

  async run(m, { sock, text }) {
    if (!text || !/tiktok\.com\/\S+/i.test(text)) {
      throw (
        `*– 乂 Cara Penggunaan 🎥*\n\n` +
        `> *🔗 Masukkan URL TikTok* untuk mengunduh video\n\n` +
        `*– 乂 Contoh Penggunaan 📋*\n` +
        `> *${m.prefix + m.command} https://vt.tiktok.com/ZShYgExMW/*`
      );
    }

    try {
      await m.reply("⏳ Mohon tunggu... Sedang memproses permintaan Anda.");

      const { data } = await axios.get(`https://backend.ness.biz.id/api/downloader/tiktok?url=${encodeURIComponent(text)}`);

      if (!data?.video?.[0]) {
        throw "> ❌ Gagal mengambil video TikTok. Coba gunakan link yang berbeda.";
      }

      // Kirim satu pesan video saja dengan caption
      await sock.sendMessage(
        m.cht,
        {
          video: { url: data.video[0] },
          caption: `🎬 *Judul:* ${data.title}\n🎵 *Audio:* ${data.title_audio}`,
        },
        { quoted: m }
      );
    } catch (err) {
      console.error(err);
      throw "> ❌ Terjadi kesalahan saat memproses video TikTok.";
    }
  },
};
