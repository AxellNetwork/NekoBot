const axios = require("axios");

async function pixiv(q, r18) {
    return new Promise(async (resolve, reject) => {
        axios
            .get(
                `https://api.lolicon.app/setu/v1?r18=${r18 ? 1 : 0}&excludeAi=true&size=original&size=regular&keyword=${q}&limit=20`,
            )
            .then((response) => {
                const array = [];
                const data = response.data;
                for (let i of data.data) {
                    array.push({
                        title: i.title,
                        author: i.author,
                        tags: i.tags,
                        images: i.url,
                    });
                }
                resolve(array);
            })
            .catch((e) => {
                reject({
                    error: "Sorry I can't get data from pixiv.net",
                });
            });
    });
}

module.exports = pixiv;