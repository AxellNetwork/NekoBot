const config = require("../settings.js");
const Func = require("../lib/function.js");
const serialize = require("../lib/serialize.js");
const Uploader = require("../lib/uploader.js");
const pkg = require("baileys");
const moment = require("moment-timezone");
const cron = require("node-cron");

module.exports = async (m, sock, store) => {
  require("../lib/logger.js")(m);
  if (m.key.jid === "status@broadcast") {
    await sock.readMessages([m.key]);
    await sock.sendMessage(
      m.key.jid,
      { react: { text: "📸", key: m.key } },
      { statusJidList: Object.keys(store.contact) },
    );
    console.log(
      chalk.green.bold("– Membaca Status WhatsApp dari : " + m.pushName),
    );
    return;
  }
  await db.main(m);
  if (m.isBot) return;
  if (db.list().settings.self && !m.isOwner) return;
  if (m.isGroup && db.list().group[m.cht]?.mute && !m.isOwner) return;
  if (Object.keys(store.groupMetadata).length === 0) {
    store.groupMetadata = await sock.groupFetchAllParticipating();
  }
  const isPrems = db.list().user[m.sender].premium.status;
  const isBanned = db.list().user[m.sender].banned.status;
  const isAdmin = m.isAdmin;
  const botAdmin = m.isBotAdmin;
  cron.schedule("* * * * *", () => {
    let user = Object.keys(db.list().user);
    let time = moment.tz(config.tz).format("HH:mm");
    if (db.list().settings.resetlimit == time) {
      for (let i of user) {
        db.list().user[i].limit = 100;
      }
    }
  });
  for (let name in pg.plugins) {
    const plugin = pg.plugins[name];
    if (!plugin) return;
    if (typeof plugin.events === "function") {
      if (
        plugin.events.call(sock, m, {
          sock,
          Func,
          config,
          Uploader,
          store,
          isAdmin,
          botAdmin,
          isPrems,
          isBanned,
        })
      )
        continue;
    }
    const Scraper = await scraper.list();
    const usedPrefix = m.body.startsWith(m.prefix);
    const cmd = usedPrefix
      ? m.command.toLowerCase() === plugin.command ||
        plugin?.alias?.includes(m.command.toLowerCase())
      : "";
    const text = m.text;
    try {
      if (cmd) {
        if (plugin.loading) m.react("🕐");
        if (plugin.settings) {
          if (plugin.settings.owner && !m.isOwner) {
            return m.reply(config.messages.owner);
          }
          if (plugin.settings.group && !m.isGroup) {
            return m.reply(config.messages.group);
          }
          if (plugin.settings.admin && !isAdmin) {
            return m.reply(config.messages.admin);
          }
          if (plugin.settings.botAdmin && !botAdmin) {
            return m.reply(config.messages.botAdmin);
          }
        }
        await plugin
          .run(m, {
            sock,
            config,
            text,
            plugins: Object.values(pg.plugins).filter((a) => a.alias),
            Func,
            Scraper,
            Uploader,
            store,
            isAdmin,
            botAdmin,
            isPrems,
            isBanned,
          })
          .then(async (a) => {
            if (plugin?.settings?.limit && !isPrems && !m.isOwner) {
              db.list().user[m.sender].limit -= 1;
              m.reply(
                `> Kamu telah menggunakan fitur limit\n> *- Limit anda :* ${db.list().user[m.sender].limit} tersisa ☘️\n> *- Note :* Limit akan direset pada pukul 02:00 WIB`,
              );
            }
          });
      }
    } catch (error) {
      if (error.name) {
        m.reply(Func.jsonFormat(error));
      } else {
        m.reply(Func.jsonFormat(error));
      }
    } finally {
      if (db.list().settings.online) {
        await sock.readMessages([m.key]);
      }
    }
  }
};
