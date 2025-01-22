const os = require("node:os");
const fs = require("node:fs");

module.exports = {
<<<<<<< HEAD
    command: "ping",
    alias: ["ping", "p"],
    category: ["main"],
    description: "Periksa Status bot",
    loading: true,
    async run(m, {
        sock,
        config,
        Func
    }) {
        let start = performance.now(),
            node = process.memoryUsage(),
            info = await fetch("https://ipwho.is").then((a) => a.json()),
            cap = `
=======
  command: "ping",
  alias: ["ping", "p"],
  category: ["main"],
  description: "Periksa Status bot",
  loading: true,
  async run(m, { sock, config, Func }) {
    let start = performance.now(),
      node = process.memoryUsage(),
      info = await fetch("https://ipwho.is").then((a) => a.json()),
      cap = `
>>>>>>> a81e5ef (Major update 🎉)
╭──[ *Informasi Bot* ]
᎒⊸ 🖥️ *Berjalan Di* : ${process.env.username === "root" ? "VPS" : process.env.username === "container" ? "HOSTING ( PANEL )" : process.env.username}
᎒⊸ ⏱️ *Uptime* : ${Func.toDate(process.uptime() * 1000)}
᎒⊸ 🏠 *Direktori Rumah* : ${os.homedir}
᎒⊸ 📂 *Direktori Tmp* : ${os.tmpdir()} *( ${fs.readdirSync(process.cwd() + os.tmpdir).length} Berkas )*
᎒⊸ 🖥️ *Hostname* : ${os.hostname()}
᎒⊸ ⚙️ *Versi Node* : ${process.version}
᎒⊸ 🌍 *Cwd* : ${process.cwd()}

╭──[ *Informasi Provider* ]
᎒⊸ 🌐 *ISP* : ${info.connection.isp}
᎒⊸ 🏢 *Organisasi* : ${info.connection.org}
᎒⊸ 🌎 *Negara* : ${info.country}
᎒⊸ 🏙️ *Kota* : ${info.city}
᎒⊸ 🚩 *Bendera* : ${info.flag.emoji}
᎒⊸ ⏰ *Zona Waktu* : ${info.timezone.id}
╰────────────•

╭──[ *Informasi Server Asal* ]
᎒⊸ 🚀 *Kecepatan* : ${(performance.now() - start).toFixed(3)} ms
᎒⊸ ⏳ *Uptime* : ${Func.toDate(os.uptime() * 1000)}
᎒⊸ 🧠 *Total Memori* : ${Func.formatSize(os.totalmem() - os.freemem())} / ${Func.formatSize(os.totalmem())}
᎒⊸ 🖥️ *CPU* : ${os.cpus()[0].model} ( ${os.cpus().length} CORE )
᎒⊸ 📦 *Rilis* : ${os.release()}
᎒⊸ 🖧 *Tipe* : ${os.type()}
╰────────────•

╭──[ *Penggunaan Memori Nodejs* ]
${Object.entries(node)
  .map(([a, b]) => `᎒⊸ 💾 *${a.capitalize()}* : ${Func.formatSize(b)}`)
  .join("\n")}
╰────────────•`;

<<<<<<< HEAD
        m.reply(cap);
    },
=======
    m.reply(cap);
  },
>>>>>>> a81e5ef (Major update 🎉)
};
