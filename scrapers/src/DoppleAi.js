const fetch = require("node-fetch");

async function DoppleAi(prompt) {
    const url = "https://beta.dopple.ai/api/messages/send";
    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://beta.dopple.ai/messages",
    };
    const body = JSON.stringify({
        streamMode: "none",
        chatId: "632cef078c294913b5b4653869eca845",
        folder: "",
        images: false,
        username: "mn0uvp2fhv",
        persona_name: "",
        id: "46db0561-cb3e-43d9-8f50-40b3e3c84713",
        userQuery: prompt,
    });
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error:", error);
    }
}
module.exports = DoppleAi