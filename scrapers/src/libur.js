const axios = require("axios");
const cheerio = require("cheerio");

async function libur(year) {
    return new Promise(async (resolve, reject) => {
        await axios.get(`https://publicholidays.co.id/id/${year}-dates/`).then((a) => {
            let $ = cheerio.load(a.data);
            let array = []
            $("table.publicholidays").eq(0).find("tbody .even").each((a, i) => {
                array.push({
                    date: $(i).find("td").eq(0).text(),
                    day: $(i).find("td").eq(1).text(),
                    name: $(i).find("td").eq(2).text().trim()
                })
            })
            resolve(array)
        })
    })
}

module.exports = libur