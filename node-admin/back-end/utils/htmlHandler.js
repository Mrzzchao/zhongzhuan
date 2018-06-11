/**
 * Created by zhangzc on 2018/6/11
 **/


/**
 * 获取当前日期
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + "T" + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 * 替换占位符符插入字符串
 */
function insertStr (html, placeholder, str) {
    return html.replace(placeholder, str)
}

function insertBaiSEO (html, {context, appid, images, url = '', title = '', description = '', pubDate = '', upDate = ''}) {
    // 为了百度SEO
    context || (context = "https://ziyuan.baidu.com/contexts/cambrian.jsonld");
    appid || (appid = '1577215349317124');
    images || (images = ["http://www.500cache.com/mobile/touch/images/app_logo.png"]);

    pubDate = getNowFormatDate();
    upDate = pubDate

    let baiduSEOJSON = {
        "@context": context,
        "@id": url,
        "appid": appid,
        "title": title,
        "images": images,
        "description": description,
        "pubDate": pubDate,
        "Update": upDate
    };

    const baiduSEOStr = `<script type="application/ld+json">${JSON.stringify(baiduSEOJSON)}</script>`;

    const htmlStr = insertStr(html, "<!--# include baidu seo -->", baiduSEOStr)

    return htmlStr
}

const htmlHandler = {
    insertStr,
    insertBaiSEO
}

module.exports = htmlHandler
