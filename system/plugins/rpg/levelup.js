let path = require('path');
let dataPath = path.join(process.cwd(), "lib", "levelling.js")
let levelling = require(dataPath)

module.exports = {
   command: "levelup",
   alias: ["uplevel"],
   category: ["rpg"],
   settings: {},
   loading: true,
   async run(m, { sock }) {
      let user = db.list().user[m.sender].rpg;
      let userr = db.list().user[m.sender]
      if (!levelling.canLevelUp(userr.level, user.exp, global.multiplier)) {
         let { min, xp, max } = levelling.xpRange(userr.level, global.multiplier)
         throw `
Level *${userr.level} (${user.exp - min}/${xp})*
Kurang *${max - user.exp}* lagi!
`.trim()
      }
      let before = userr.level * 1
      while (levelling.canLevelUp(userr.level, user.exp, global.multiplier)) userr.level++
      if (before !== userr.level) {
         m.reply(`
Selamat, anda telah naik level!
*${before}* -> *${userr.level}*
`.trim())
      }
   }
}