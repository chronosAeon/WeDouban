
function starsOperation(score) {
    score = score.substring(0, 1);
    var array = [];
    for (var i = 0; i < 5; i++) {
        if (i < score) {
            array.push(1);
        }
        else {
            array.push(0);
        }
    }
    return array;
}

function convertToCastString(casts) {
    var castjoint = "";
    for (var index in casts) {
         castjoint = castjoint + casts[index].name + "/";
    }
    return castjoint.substring(0, castjoint.length - 2);
}
function convertToCastsInfos(casts) {
    var castsArray = [];
    for (var index in casts) {
        var cast = {
            img: casts[index].avatars ? casts[index].avatars.large : "",
            name: casts[index].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}
function http(url, callBack) {
    wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        success: function (res) {
            callBack(res.data)
        },
        fail: function () {
            console.log("false");
        },
        complete: function () {
        }
    })
}
module.exports = ({
    starsOperation: starsOperation,
    http: http,
    convertToCastString:convertToCastString,
    convertToCastsInfos:convertToCastsInfos
})