const { writeExif } = require(process.cwd() + "/lib/sticker");
const axios = require("axios");

class Command {
  constructor() {
    this.command = "qc";
    this.alias = [];
    this.category = ["tools"];
    this.settings = {
      limit: true,
    };
    this.description = "Membuat bubble chat";
    this.loading = true;
  }

  run = async (m, { sock, Func, Scraper, config, store, Uploader }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || "";
    let reply;
    if (!m.quoted) {
      reply = {};
    } else if (!q.sender === q.sender) {
      reply = {
        name: q.name,
        text: q.text || "",
        chatId: q.cht.split("@")[0],
      };
    }
    let text;
    if (m.args.length >= 1) {
      text = m.args.join(" ");
    } else if (m.quoted) {
      text = m.quoted.text || "";
    } else {
      throw "> Masukan pesan nya";
    }

    const img = await q.download?.();
    const pp = await sock
      .profilePictureUrl(q.sender, "image")
      .catch((_) => "https://telegra.ph/file/320b066dc81928b782c7b.png")
      .then(async (a) => await Func.fetchBuffer(a));

    if (mime) {
      const obj = {
        type: "quote",
        format: "png",
        backgroundColor: "#161616",
        width: 512,
        height: 768,
        scale: 2,
        messages: [
          {
            entities: [],
            media: {
              url: await Uploader.Uguu(img),
            },
            avatar: true,
            from: {
              id: m.key.remoteJid.split("@")[0],
              name: q.pushName,
              photo: {
                url: await Uploader.catbox(pp),
              },
            },
            text: text || "",
            replyMessage: reply,
          },
        ],
      };

      const json = await axios.post(
        "https://quotly.netorare.codes/generate",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const buffer = Buffer.from(json.data.result.image, "base64");
      const sticker = await writeExif(
        {
          mimetype: "image",
          data: buffer,
        },
        {
          packName: config.sticker.packname,
          packPublish: config.sticker.author,
        },
      );
      m.reply({
        sticker,
      });
    } else {
      const obj = {
        type: "quote",
        format: "png",
        backgroundColor: "#161616",
        width: 512,
        height: 768,
        scale: 2,
        messages: [
          {
            entities: [],
            avatar: true,
            from: {
              id: m.key.remoteJid.split("@")[0],
              name: q.pushName,
              photo: {
                url: await Uploader.catbox(pp),
              },
            },
            text: text || "",
            replyMessage: reply,
          },
        ],
      };

      const json = await axios.post(
        "https://quotly.netorare.codes/generate",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const buffer = Buffer.from(json.data.result.image, "base64");
      const sticker = await writeExif(
        {
          mimetype: "image",
          data: buffer,
        },
        {
          packName: config.sticker.packname,
          packPublish: config.sticker.author,
        },
      );
      m.reply({
        sticker,
      });
    }
  };
}

module.exports = new Command();
