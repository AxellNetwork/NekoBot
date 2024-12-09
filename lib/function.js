//=====[ Function bot ]=======//
<<<<<<< HEAD
=======
const axios = require("axios");
>>>>>>> 8de5675 (v1.1.0)

module.exports = {
  isUrl: (url) => {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    let result = url.match(urlRegex);
    return result;
  },
  texted: (type, text) => {
    switch (type) {
      case "bold":
        return "*" + text + "*";
        break;
      case "italic":
        return "_" + text + "_";
        break;
      case "monospace":
        return "```" + text + "```";
    }
  },
  example:(isPrefix, command, args) => {
    return `• ${this.texted("bold", "Example")} : ${isPrefix + command} ${args}`;
  },
  toTime: (ms) => {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
  },
  readTime: (ms) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    const format = [days, hours, minutes, sec].map((v) =>
      v.toString().padStart(2, 0),
    );
    return {
      days: Number(format[0]),
      hours: Number(format[1]),
      minutes: Number(format[2]),
      seconds: Number(format[3]),
    }
  },

  random: (list) => {
    return list[Math.floor(Math.random() * list.length)];
  },

  randomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  formatter: (integer) => {
    let numb = parseInt(integer);
    return Number(numb).toLocaleString().replace(/,/g, ".");
  },

  formatNumber: (integer) => {
    let numb = parseInt(integer);
    return Number(numb).toLocaleString().replace(/,/g, ".");
  },
  
  h2k: (integer) => {
    let numb = parseInt(integer);
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
    }).format(numb);
<<<<<<< HEAD
  },
  
=======
  },  
>>>>>>> 8de5675 (v1.1.0)
  formatSize: (size) => {
    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    var megaByte = 1024 * 1024;
    var gigaByte = 1024 * megaByte;
    var teraByte = 1024 * gigaByte;
    if (size < 1024) {
      return size + " B";
    } else if (size < megaByte) {
      return round(size / 1024, 1) + " KB";
    } else if (size < gigaByte) {
      return round(size / megaByte, 1) + " MB";
    } else if (size < teraByte) {
      return round(size / gigaByte, 1) + " GB";
    } else {
      return round(size / teraByte, 1) + " TB";
    }
<<<<<<< HEAD
=======
    
    return "";
  },
  
  getSize: async (str) => {
    if (!isNaN(str)) return this.formatSize(str);
    let header = await (await axios.get(str)).headers;  
    let size = header["content-length"]
    function round(value, precision) {
     var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    var megaByte = 1024 * 1024;
    var gigaByte = 1024 * megaByte;
    var teraByte = 1024 * gigaByte;
    if (size < 1024) {
      return size + " B";
    } else if (size < megaByte) {
      return round(size / 1024, 1) + " KB";
    } else if (size < gigaByte) {
      return round(size / megaByte, 1) + " MB";
    } else if (size < teraByte) {
      return round(size / gigaByte, 1) + " GB";
    } else {
      return round(size / teraByte, 1) + " TB";
    }    
>>>>>>> 8de5675 (v1.1.0)
    return "";
  },
  
  mtype: (data) => {
    function replaceAll(str) {
      let res = str
        .replace(new RegExp("```", "g"), "")
        .replace(new RegExp("_", "g"), "")
        .replace(new RegExp(/[*]/, "g"), "");
      return res;
    }
    let type = typeof data.text !== "object" ? replaceAll(data.text) : "";
    return type;
  },

  sizeLimit: (str, max) => {
    let data;
    if (str.match("G") || str.match("GB") || str.match("T") || str.match("TB"))
      return (data = {
        oversize: true,
      });
    if (str.match("M") || str.match("MB")) {
      let first = str.replace(/MB|M|G|T/g, "").trim();
      if (isNaN(first))
        return (data = {
          oversize: true,
        });
      if (first > max)
        return (data = {
          oversize: true,
        });
      return (data = {
        oversize: false,
      });
    } else {
      return (data = {
        oversize: false,
      });
    }
  },
  jsonFormat: (obj) => {
    try {
      let print =
        obj &&
        (obj.constructor.name == "Object" || obj.constructor.name == "Array")
          ? require("node:util").format(JSON.stringify(obj, null, 2))
          : require("node:util").format(obj);
      return print;
    } catch {
      return require("node:util").format(obj);
    }
  },
  ucword: (str) => {
    return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  },
  
  arrayJoin: (arr) => {
    var construct = [];
    for (var i = 0; i < arr.length; i++) construct = construct.concat(arr[i]);
    return construct;
  },

  removeItem: (arr, value) => {
    let index = arr.indexOf(value);
    if (index > -1) arr.splice(index, 1);
    return arr;
  },

  /* Did You Mean ??
   * @param {String} string
   * @param {Array} array
   * @param {String|Object} options
   */
  matcher: (string, array, options) => {
    function levenshtein(value, other, insensitive) {
      var cache = [];
      var codes = [];
      var length;
      var lengthOther;
      var code;
      var result;
      var distance;
      var distanceOther;
      var index;
      var indexOther;

      if (value === other) {
        return 0;
      }

      length = value.length;
      lengthOther = other.length;

      if (length === 0) {
        return lengthOther;
      }

      if (lengthOther === 0) {
        return length;
      }

      if (insensitive) {
        value = value.toLowerCase();
        other = other.toLowerCase();
      }

      index = 0;

      while (index < length) {
        codes[index] = value.charCodeAt(index);
        cache[index] = ++index;
      }

      indexOther = 0;

      while (indexOther < lengthOther) {
        code = other.charCodeAt(indexOther);
        result = distance = indexOther++;
        index = -1;

        while (++index < length) {
          distanceOther = code === codes[index] ? distance : distance + 1;
          distance = cache[index];
          cache[index] = result =
            distance > result
              ? distanceOther > result
                ? result + 1
                : distanceOther
              : distanceOther > distance
                ? distance + 1
                : distanceOther;
        }
      }
      return result;
    }

    function similarity(a, b, options) {
      var left = a || "";
      var right = b || "";
      var insensitive = !(options || {}).sensitive;
      var longest = Math.max(left.length, right.length);
      return (
        (longest === 0
          ? 1
          : (longest - levenshtein(left, right, insensitive)) / longest) * 100
      ).toFixed(1);
    }

    let data = [];
    let isArray = array.constructor.name == "Array" ? array : [array] || [];
    isArray.map((v) =>
      data.push({
        string: v,
        accuracy: similarity(string, v),
      }),
    );
    return data;
  },
  
  toDate: (ms) => {
    let temp = ms;
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysms / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursms / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor(minutesms / 1000);
    if (days == 0 && hours == 0 && minutes == 0) {
      return "Recently";
    } else {
      return days + "D " + hours + "H " + minutes + "M";
    }
  },
  timeFormat: (value) => {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    if (hours == parseInt("00")) return minutes + ":" + seconds;
    return hours + ":" + minutes + ":" + seconds;
  },
  switcher: (status, isTrue, isFalse) => {
    return status ? this.texted("bold", isTrue) : this.texted("bold", isFalse);
  },
  
  makeId: (length) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  timeReverse: (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor(duration / (24 * 60 * 60 * 1000));
    let hoursF = hours < 10 ? "0" + hours : hours;
    let minutesF = minutes < 10 ? "0" + minutes : minutes;
    let secondsF = seconds < 10 ? "0" + seconds : seconds;
    let daysF = days < 10 ? "0" + days : days;
    
    return daysF + "D " + hoursF + "H " + minutesF + "M";
  },

  jsonRandom: (file) => {
    let json = JSON.parse(fs.readFileSync(file));
    return json[Math.floor(Math.random() * json.length)];
  },
}