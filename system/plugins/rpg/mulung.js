module.exports = {
   command: "mulung",
   alias: ["mungut"],
   category: ["rpg"],
   settings: {},
   async run(m, { sock }) {
      let user = db.list().user[m.sender].rpg;
      let cool = 4 * 60 * 60 * 1000;
      if (user.lastMulung && (Date.now() - user.lastMulung) < cool) {
         let remaining = cool - (Date.now() - user.lastMulung);
         let minutes = Math.floor(remaining / (60 * 1000));
         let seconds = Math.floor((remaining % (60 * 1000)) / 1000);
         return m.reply(`⏳ Mohon tunggu *${minutes} menit ${seconds} detik* sebelum mulung kembali!`);
      }
      let items = {
         kaleng: ['🥫', Math.floor(Math.random() * 450) + 50],
         kardus: ['📦', Math.floor(Math.random() * 450) + 50],
         plastik: ['💳', Math.floor(Math.random() * 450) + 50],
         botol: ['🍾', Math.floor(Math.random() * 450) + 50],
         sampah: ['🗑️', Math.floor(Math.random() * 450) + 50],
         kayu: ['🪵', Math.floor(Math.random() * 450) + 50],
         iron: ['⛓️', Math.floor(Math.random() * 450) + 50],
         gelas: ['🥤', Math.floor(Math.random() * 450) + 50]
      };
      let resultText = `*🔍 Hasil Mulung:*\n`;
      for (let [item, [emote, amount]] of Object.entries(items)) {
         user[item] = (user[item] || 0) + amount;
         resultText += `${emote} ${item}: +${amount}\n`;
      }
      user.lastMulung = Date.now();
      return m.reply(`
${resultText}

> *Tunggu 4 Jam Untuk Memulung Lagi*
      `);
   }
}