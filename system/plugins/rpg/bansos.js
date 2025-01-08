module.exports = {
    command: "bansos",
    alias: ["bantuan", "assistance"],
    category: ["rpg"],
    settings: {
        owner: false
    },
    loading: true,
    async run(m, { sock }) {
        const user = db.list().user[m.sender]

        if (!user) return m.reply("❌ User tidak terdaftar dalam database");

        let time = new Date().getTime();
        let cooldown = 86400000; // 24 jam
        let lastBansos = user.lastbansos || 0;

        if (time - lastBansos < cooldown) {
            let remaining = cooldown - (time - lastBansos);
            let hours = Math.floor(remaining / 3600000);
            let minutes = Math.floor((remaining % 3600000) / 60000);

            return m.reply(`
╔══════════════════════
║ 🕐 *COOLDOWN BANSOS*
╠══════════════════════
║ ⏰ Tunggu *${hours} jam ${minutes} menit*
║ 📝 Sebelum mengambil bansos lagi
╚══════════════════════`.trim());
        }

        // Peluang mendapatkan bansos
        const isPremium = user.premium || false;
        const chance = Math.random() * 100;
        
        // Premium: 75% chance, Regular: 25% chance
        const successChance = isPremium ? 75 : 25;
        
        if (chance > successChance) {
            let gagalText = `
╔═══════════════════════
║ 📢 *BANSOS GAGAL*
╠═══════════════════════
║ 😔 Anda gagal mendapatkan bansos
║ ${isPremium ? '👑 Coba lagi besok!' : '⭐ Tingkatkan ke Premium\n║ untuk peluang lebih besar!'}
╚═══════════════════════`
            return m.reply({
             image: {
                url: "https://telegra.ph/file/afcf9a7f4e713591080b5.jpg"
             }, 
             caption: gagalText, 
             footer: "Yahaha Kalah😂", 
             buttons: [{
               buttonId: ".owner", 
               buttonText: {
                  displayText: "GANTENG", 
               }, 
             }], 
             viewOnce: true, 
             headerType: 6,
        })

        // Reward calculations
        let moneyReward, coinReward;
        
        if (isPremium) {
            moneyReward = Math.floor(Math.random() * (5000000 - 3000000 + 1)) + 3000000;
            coinReward = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        } else {
            moneyReward = Math.floor(Math.random() * (2000000 - 1000000 + 1)) + 1000000;
            coinReward = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
        }

        // Update user data
        user.money = (user.money || 0) + moneyReward;
        user.coin = (user.coin || 0) + coinReward;
        user.lastbansos = time;

        // Format numbers with dots
        const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        const rewardText = `
╔════════════════════════
║ 🎊 *BANSOS BERHASIL* 🎊
╠════════════════════════
║ 👤 *Status:* ${isPremium ? '👑 Premium' : '⭐ Regular'}
║ 
║ 💰 *Reward Money:*
║ └─ Rp ${formatNumber(moneyReward)}
║ 
║ 🪙 *Reward Coin:*
║ └─ ${formatNumber(coinReward)} coins
║ 
║ 📊 *Total Sekarang:*
║ ├─ 💵 Rp ${formatNumber(user.money)}
║ └─ 🪙 ${formatNumber(user.coin)} coins
║ 
║ ${isPremium ? '👑 Bonus Premium!' : '⭐ Upgrade ke Premium\n║ untuk reward lebih besar!'}
╠════════════════════════
║ ⏰ Kembali lagi dalam 24 jam!
╚════════════════════════`.trim();

            return m.reply({
             image: {
                url: "https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg"
             }, 
             caption: rewardText, 
             footer: "Horee Menang 🎉", 
             buttons: [{
               buttonId: ".owner", 
               buttonText: {
                  displayText: "GANTENG", 
               }, 
             }], 
             viewOnce: true, 
             headerType: 6,
        })
    }
  }
}