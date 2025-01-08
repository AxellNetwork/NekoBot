const bail = require("baileys");
const {
    generateWAMessageFromContent,
    proto,
    toNumber
} = bail;

module.exports = {
    command: "add",
    alias: [],
    category: ["group"],
    settings: {
        group: true,
        admin: true,
        botAdmin: true,
    },
    description: "Untuk menambahkan Member ke group",
    async run(m, {
        sock,
        text,
        Func
    }) {
        const input = m.text ?
            m.text :
            m.quoted ?
            m.quoted.sender :
            m.mentions.length > 0 ?
            m.mentions[0] :
            false;
        if (!input) throw `> Reply / masukan nomor yang ingin ditambah ke group`;
        const p = await sock.onWhatsApp(input.trim());
        if (p.length == 0)
            return m.reply("> Orang tersebut tidak memiliki aplikasi WhatsApp");
        const jid = sock.decodeJid(p[0].jid);
        const member = m.metadata.participants.find((u) => u.id == jid);
        if (member?.id)
            return m.reply("> Orang tersebut sudah ada di dalam group ini");
        const resp = await sock.groupParticipantsUpdate(m.cht, [jid], "add");
        for (let res of resp) {
            if (res.status == 421) {
                m.reply(res.content.content[0].tag);
            }
            if (res.status == 408) {
                await m.reply(
                    `> Link group berhasil dikirim ke @${parseInt(res.jid)} karena dia baru saja meninggalkan grup!`,
                );
                await sock.sendMessage(res.jid, {
                    text: "https://chat.whatsapp.com/" + (await sock.groupInviteCode(m.cht)),
                });
            }
            if (res.status == 403) {
                await m.reply(`> undangan grup telah dikirim ke @${parseInt(res.jid)}`);
                const {
                    code,
                    expiration
                } = res.content.content[0].attrs;
                const pp = await sock.profilePictureUrl(m.cht).catch(() => null);
                const gp = await Func.fetchBuffer(pp);
                const msgs = generateWAMessageFromContent(
                    res.jid,
                    proto.Message.fromObject({
                        groupInviteMessage: {
                            groupJid: m.cht,
                            inviteCode: code,
                            inviteExpiration: toNumber(expiration),
                            groupName: m.metadata.subject,
                            jpegThumbnail: gp || null,
                            caption: `> Hai @${res.jid.split("@")[0]}, salah satu admin *${m.metadata.subject}* mengundang anda kedalam group !`,
                        },
                    }), {
                        userJid: sock.user.jid,
                    },
                );
                await sock.copyNForward(jid, msgs);
            }
        }
    },
};