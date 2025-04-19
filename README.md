


# 😼 NekoBot - WhatsApp Bot Sederhana dengan Baileys

![Logo](https://files.catbox.moe/obf6o0.jpg)

NekoBot adalah bot WhatsApp sederhana yang dibangun menggunakan library Baileys. Dibuat oleh AxellNetwork, bot ini dirancang untuk memberikan pengalaman interaktif dan menyenangkan di WhatsApp.

## Fitur Utama

* **Sederhana dan Mudah Digunakan:** Dirancang untuk pemula dan pengguna tingkat lanjut.
* **Konfigurasi Fleksibel:** Pengaturan bot dapat disesuaikan melalui `settings.js`.
* **Plugin Modular:** Mudah menambahkan fitur baru dengan membuat plugin.
* **Manajemen Perintah:** Mendukung perintah dengan alias dan kategori.
* **Manajemen Akses:** Kontrol akses untuk pemilik, premium, dan grup.

## Contoh Penggunaan

Berikut adalah contoh respons bot:

```javascript
{
  message: Message { conversation: '>_ Welcome to NekoBot' },
  type: 'conversation',
  msg: '>_ Welcome to NekoBot',
  isMedia: false,
  key: {
    remoteJid: '6285165556936@s.whatsapp.net',
    participant: '6285165556936@s.whatsapp.net',
    fromMe: false,
    id: '5780C33F89C0BE600B6D71DF79C4FC02'
  },
  cht: '6285165556936@s.whatsapp.net',
  fromMe: false,
  id: '5780C33F89C0BE600B6D71DF79C4FC02',
  device: 'android',
  isBot: false,
  isGroup: false,
  participant: '6285165556936@s.whatsapp.net',
  sender: '6285165556936@s.whatsapp.net',
  mentions: [],
  body: '>_ Welcome to NekoBot',
  prefix: '',
  command: '>_',
  args: [ 'Welcome', 'to', 'NekoBot' ],
  text: 'Welcome to NekoBot',
  isOwner: true,
  download: [AsyncFunction (anonymous)]
}
````

## Konfigurasi Bot (settings.js)

Konfigurasi bot dapat diatur melalui file `settings.js`. Berikut adalah contoh konfigurasi:

```javascript
const config = {
  owner: ["6285215909004"],
  name: "- nekoBot - Simple WhatsApp bot",
  sessions: "sessions",
  sticker: {
    packname: "Made by ",
    author: "nekoBot"
  },
  messages: {
    wait: "*( Loading )* Tunggu Sebentar...",
    owner: "*( Denied )* Kamu bukan owner ku !",
    premium: "*( Denied )* Fitur ini khusus user premium",
    group: "*( Denied )* Fitur ini khusus group",
  },
  database: "neko-db",
  tz: "Asia/Jakarta"
};

module.exports = config;
```

## Cara Instalasi dan Menjalankan

1.  **Clone Repository:**

    ```bash
    git clone [https://github.com/AxellNetwork/NekoBot](https://github.com/AxellNetwork/NekoBot)
    ```

2.  **Masuk ke Direktori Proyek:**

    ```bash
    cd NekoBot
    ```

3.  **Instal Dependensi:**

    ```bash
    npm install
    ```

4.  **Jalankan Bot:**

    ```bash
    npm start
    ```

## Contoh Fitur (Plugin)

Berikut adalah contoh cara menambahkan fitur baru ke bot:

### 1\. Plugin

Buat file plugin di direktori yang sesuai (misalnya, `plugins/tes.js`):

```javascript
module.exports = {
  command: "tes",
  alias: ["tesbot", "testing"],
  category: ["main"],
  settings: {
    owner: false,
    group: false,
  },
  description: "Tes bot saja",
  loading: true,
  async run(m, { sock, Func, Scraper, text, config }) {
    m.reply("> Bot Online ✓");
  }
};
```

### 2\. Case (Alternatif)

Anda juga dapat menambahkan fitur langsung ke dalam file utama bot:

```javascript
case "tes":
  m.reply("> Bot Online ✓");
  break;
```

## Komunitas dan Diskusi

Bergabunglah dengan komunitas kami untuk diskusi lebih lanjut dan dukungan:

[![WhatsApp Group](about:sanitized)](https://chat.whatsapp.com/ErlaFMvdnfu5OGxCVGJW8V)

[![WhatsApp Channel](about:sanitized)](https://whatsapp.com/channel/0029Vb0YWvYJ3jusF2nk9U1P)

````

Perubahan yang dilakukan:

* **Struktur yang Lebih Jelas:** Menggunakan heading (##) untuk membagi bagian-bagian README.
* **Penjelasan yang Lebih Rinci:** Menambahkan penjelasan tentang fitur dan cara kerja bot.
* **Format Kode yang Lebih Baik:** Menggunakan blok kode (```javascript) untuk menampilkan contoh kode.
* **Instruksi yang Lebih Mudah Diikuti:** Memperjelas langkah-langkah instalasi dan menjalankan bot.
* **Penekanan pada Plugin:** Memberikan contoh yang lebih jelas tentang cara menambahkan fitur baru.
* **Peningkatan Keterbacaan:** Menggunakan bullet points dan format markdown yang lebih rapi.
* **Penambahan bagian Fitur Utama** : Menambahkan bagian fitur utama agar pembaca dapat dengan cepat mengetahui fitur dari bot.
* **Perbaikan bahasa** : Memperbaiki beberapa bahasa agar lebih mudah dimengerti.

Dengan perubahan ini, README.md Anda akan terlihat lebih profesional dan informatif.
