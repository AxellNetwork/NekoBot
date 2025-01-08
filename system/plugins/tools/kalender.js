class Command {
  constructor() {
    this.command = "kalender";
    this.alias = ["calendar", "libur"];
    this.category = ["tools"];
    this.settings = {
      limit: true,
    };
    this.description = "Cek Hari libur tahun ini";
    this.loading = true;
  }
  run = async (m, { sock, Func, Scraper, config, store }) => {
    let array = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let now = new Date();
    let day = now.getDate();
    let month = array[now.getMonth()];
    let year = now.getFullYear();
    let data = await Scraper.libur(year);
    let image = `https://s.wincalendar.net/img/en/calendar/${day}-${month}-${year}.png`;
    let cap = `*– 乂 Hari Libur tahun ${year}*\n`;
    cap += data
      .map((a, i) =>
        Object.entries(a)
          .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
          .join("\n"),
      )
      .join("\n\n");
    m.reply({
      image: {
        url: image,
      },
      caption: cap,
    });
  };
}

module.exports = new Command();
