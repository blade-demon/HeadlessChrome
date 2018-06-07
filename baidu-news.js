const puppeteer = require('puppeteer');
const request = require('superagent');
const fs = require('fs');


const NEWS_LIST_SELECTOR = "#content_left div .title.result";
const NEWS_ITEM_TILTLE_SELECTOR = ".c-title a";
const NEWS_ITEM_DETAIL_SELECTOR = ".c-title-author";

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    const uri = 'http://news.baidu.com/ns?word=title%3A%28nba%202K19%29&pn=40&cl=2&ct=0&tn=newstitle&rn=20&ie=utf-8&bt=0&et=0&rsv_page';
    page.setDefaultNavigationTimeout(60 * 1000);
    await page.setViewport({
        width: 1600,
        height: 0
    })
    let news = [];

    for (let i = 0; i < 2; i++) {
        await page.goto(uri + (i + 1));
        const newsArray = await page.evaluate((sNews, sTitle, sDetail) => {
            return Array.prototype.slice.apply(document.querySelectorAll(sNews))
                .map(($newsListItem) => {
                    const title = $newsListItem.querySelector(sTitle).innerText;
                    const detail = $newsListItem.querySelector(sDetail).innerText;
                    const link = $newsListItem.querySelector(sTitle).href;
                    console.log( {
                        title, detail, link
                    });
                    return {
                        title, detail, link
                    };
                });

        }, NEWS_LIST_SELECTOR, NEWS_ITEM_TILTLE_SELECTOR, NEWS_ITEM_DETAIL_SELECTOR);

        news = news.concat(newsArray);
        await page.waitFor(3 * 1000);
    }

    console.log(news);
    fs.writeFile('./baidu_news_nba2k19.json', JSON.stringify(news), function (err) {
        if (!err) {
            console.log("数据写入完毕");
        } else {
            console.log("数据写入出错");
        }
        process.exit(-1);            
    });
})();