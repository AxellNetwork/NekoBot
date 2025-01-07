module.exports = {
    command: "bank",
    alias: ["wallet", "atm", "banking"],
    category: ["rpg"],
    settings: {
    },
    loading: true,

    async run(m, { text, sock }) {
        let user = db.list().user[m.sender]
        if (!user.bank) user.bank = 0

        const formatMoney = (amount) => amount.toLocaleString('id-ID')

        if (!text) {
            return m.reply(`╭═══❯ 🏦 ᴠ-ʙᴀɴᴋ ❮═══╗
│
│ 👤 ᴀᴄᴄᴏᴜɴᴛ ɪɴꜰᴏ
│ ────────────────
│ 📝 ɴᴀᴍᴇ: ${user.name}
│ 📊 ʟᴇᴠᴇʟ: ${user.level}
│ 🎫 ʟɪᴍɪᴛ: ${user.limit}
│
│ 💰 ʙᴀʟᴀɴᴄᴇ ɪɴꜰᴏ
│ ────────────────
│ 💳 ʙᴀɴᴋ: ʀᴘ ${formatMoney(user.bank)}
│ 💵 ᴄᴀꜱʜ: ʀᴘ ${formatMoney(user.rpg.money)}
│
│ 📋 ᴄᴏᴍᴍᴀɴᴅꜱ
│ ────────────────
│ 💸 ${m.prefix}bank deposit <amount>
│ 💰 ${m.prefix}bank pull <amount>
│
╰═══════════════════╯`)
        }

        const [command, amountText] = text.split(' ')
        const amount = parseInt(amountText)

        if (!amount) return m.reply(`❌ ᴍᴀꜱᴜᴋᴋᴀɴ ɴᴏᴍɪɴᴀʟ`)
        if (isNaN(amount)) return m.reply(`❌ ɴᴏᴍɪɴᴀʟ ʜᴀʀᴜꜱ ʙᴇʀᴜᴘᴀ ᴀɴɢᴋᴀ`)
        if (amount < 1000) return m.reply(`❌ ᴍɪɴɪᴍᴀʟ ᴛʀᴀɴꜱᴀᴋꜱɪ ʀᴘ 1,000`)

        switch (command.toLowerCase()) {
            case 'deposit': {
                if (user.rpg.money < amount) return m.reply(`╭═══❯ ❌ ꜰᴀɪʟᴇᴅ ❮═══╗
│
│ 💵 ᴜᴀɴɢ ᴛᴜɴᴀɪ ᴛɪᴅᴀᴋ ᴄᴜᴋᴜᴘ
│ 💳 ᴀɴᴅᴀ ʙᴜᴛᴜʜ: ʀᴘ ${formatMoney(amount)}
│ 💰 ᴅᴏᴍᴘᴇᴛ ᴀɴᴅᴀ: ʀᴘ ${formatMoney(user.rpg.money)}
│
╰═══════════════════╯`)

                await m.reply(`💳 ᴍᴇᴍᴘʀᴏꜱᴇꜱ ᴅᴇᴘᴏꜱɪᴛ...`)
                await new Promise(resolve => setTimeout(resolve, 1500))

                user.rpg.money -= amount
                user.bank += amount

                return m.reply(`╭═══❯ 🏦 ᴅᴇᴘᴏꜱɪᴛ ❮═══╗
│
│ ✅ ᴅᴇᴘᴏꜱɪᴛ ʙᴇʀʜᴀꜱɪʟ!
│ 💸 ᴊᴜᴍʟᴀʜ: ʀᴘ ${formatMoney(amount)}
│
│ 📊 ꜱᴀʟᴅᴏ ᴛᴇʀʙᴀʀᴜ
│ ────────────────
│ 💳 ʙᴀɴᴋ: ʀᴘ ${formatMoney(user.bank)}
│ 💵 ᴄᴀꜱʜ: ʀᴘ ${formatMoney(user.rpg.money)}
│
╰═══════════════════╯`)
            }

            case 'pull': {
                if (user.bank < amount) return m.reply(`╭═══❯ ❌ ꜰᴀɪʟᴇᴅ ❮═══╗
│
│ 💳 ꜱᴀʟᴅᴏ ᴛɪᴅᴀᴋ ᴄᴜᴋᴜᴘ
│ 💰 ᴀɴᴅᴀ ʙᴜᴛᴜʜ: ʀᴘ ${formatMoney(amount)}
│ 💵 ꜱᴀʟᴅᴏ ᴀɴᴀ: ʀᴘ ${formatMoney(user.bank)}
│
╰═══════════════════╯`)

                await m.reply(`💳 ᴍᴇᴍᴘʀᴏꜱᴇꜱ ᴘᴇɴᴀʀɪᴋᴀɴ...`)
                await new Promise(resolve => setTimeout(resolve, 1500))

                user.bank -= amount
                user.rpg.money += amount

                return m.reply(`╭═══❯ 🏦 ᴘᴇɴᴀʀɪᴋᴀɴ ❮═══╗
│
│ ✅ ᴘᴇɴᴀʀɪᴋᴀɴ ʙᴇʀʜᴀꜱɪʟ!
│ 💸 ᴊᴜᴍʟᴀʜ: ʀᴘ ${formatMoney(amount)}
│
│ 📊 ꜱᴀʟᴅᴏ ᴛᴇʀʙᴀʀᴜ
│ ────────────────
│ 💳 ʙᴀɴᴋ: ʀᴘ ${formatMoney(user.bank)}
│ 💵 ᴄᴀꜱʜ: ʀᴘ ${formatMoney(user.rpg.money)}
│
╰═══════════════════╯`)
            }

            default:
                return m.reply(`❌ ᴄᴏᴍᴍᴀɴᴅ ᴛɪᴅᴀᴋ ᴠᴀʟɪᴅ!`)
        }
    }
}