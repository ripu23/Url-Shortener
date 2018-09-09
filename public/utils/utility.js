var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';

const host = 'http://127.0.0.1/';
const exp = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-';
const len = exp.length;

var bitExtractor = function (md5) {
    var i = 0;

    var bits_128 = Array.from(md5).map((each) => each.charCodeAt(0).toString(2)).join(" ");
    console.log(bits_128);
    bits_128 = bits_128.split(" ");
    var bits_43 = "";
    var len = 0;
    while (true) {
        if (i > 0) {
            len = bits_43.length - (bits_43.split(" ").length - 1);
        }
        if (len <= 43) {
            if (i == 0) {
                bits_43 = bits_43 + bits_128[i];
                i++;
            } else {
                bits_43 = bits_43 + " " + bits_128[i];
                i++;
            }

        } else if (len > 43) {
            var difference = bits_43.length - 43;
            if (difference > 0) {
                bits_43 = bits_43.substring(0, 43);
            }
            break;
        }
    }
    
    return bitMapper(bits_43.split(" "));

}
var bitMapper = function (md_43) {
    var finalHash = "";
    for (i = 0; i < md_43.length; i++) {
        finalHash += String.fromCharCode(parseInt(md_43[i], 2));
    }
    return finalHash.trim();
}

var encrypt = function(id){
    var result = '';
    while(id > 0){
        result = result + exp[id%len];
        id = Math.floor(id/10);
    }
    return result;
}

var decrypt = function(shortened){
//    var 
//    while(str){
//        var index = id.indexOf(shortened[0]);
//        
//    }
}

module.exports = {
    pattern: new RegExp(urlRegex, 'i'),
    bitExtractor: bitExtractor,
    encrypt : encrypt,
    host: host,
    decrypt : decrypt
}
