let money = 50000;
let exp = 5000;
let cooldown = 7 * 60 * 60 * 1000;

module.exports = {
   command: "gajian",
   alias: ["gaji"],
   category: ["rpg"],
   settings: {},
   async run(m, { sock }) {
      let user = db.list().user[m.sender];
      let now = Date.now();

      if (user.rpg.lastGajian && now - user.rpg.lastGajian < cooldown) {
         let remaining = cooldown - (now - user.rpg.lastGajian);
         let hours = Math.floor(remaining / (60 * 60 * 1000));
         let minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
         let timeLeft = `${hours} jam ${minutes} menit`;

         return m.reply(`Sabar njir, gaji lu masih pending!\nTunggu ${timeLeft} lagi.`);
      }

      user.rpg.money += money;
      user.rpg.exp += exp;
      user.rpg.lastGajian = now;

      let nextClaim = new Date(now + cooldown).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
      let cap = `Nih Gaji Lu Njir, Minta Mulu\n> 💵 + 50000 Money\n> 🎁 + 5000 Exp\n\nLu bisa gajian lagi jam: ${nextClaim}`;

      m.reply({
         text: cap,
         footer: "Back To Menu",
         buttons: [{
            buttonId: ".menu",
            buttonText: { displayText: "Menu" }
         }],
         viewOnce: true,
         headerType: 6
      });
   }
};