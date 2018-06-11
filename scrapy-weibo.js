const puppeteer = require('puppeteer');
const request = require('superagent');
const fs = require('fs');

const USERNAME_SELECTOR = "input#loginname";
const PASSWORD_SELECTOR = "input[name='password']";
const LOGINBTN_SELECTOR = '.info_list.login_btn';


const WEIBO_ITEM_SELECTOR = '.feed_lists .WB_cardwrap';
const WEIBO_ITEM_NAME_SELECTOR = '.W_texta .W_fb';
const WEIBO_ITEM_COMMENT_SELECTOR = '.comment_txt';
const WEIBO_ITEM_SAVE_SELECTOR = "[action-type='feed_list_item'] > .feed_action .feed_action_info [action-type='feed_list_favorite'] .line.S_line1";
const WEIBO_ITEM_REPOST_SELECTOR = "[action-type='feed_list_item'] > .feed_action .feed_action_info [action-type='feed_list_forward'] .line.S_line1";
const WEIBO_ITEM_COMMENTS_SELECTOR = "[action-type='feed_list_item'] > .feed_action .feed_action_info [action-type='feed_list_comment'] .line.S_line1";
const WEIBO_ITEM_LOVE_SELECTOR = "[action-type='feed_list_item'] > .feed_action .feed_action_info [action-type='feed_list_like'] .line.S_line1";
const WEIBO_ITEM_DATETIME_SELECTOR = ".feed_from [node-type='feed_list_item_date']";
const WEIBO_USER_LINK = ".feed_content > a";

const CREDS = {
    username: "949659359@qq.com",
    password: "xzw1989!"
};

const uri = "https://weibo.com/";


(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60 * 1000);
    await page.setViewport({
        width: 1600,
        height: 0
    })
    await page.goto(uri);

    await page.waitFor(10 * 1000);
    await page.type(USERNAME_SELECTOR, CREDS.username);
    await page.type(PASSWORD_SELECTOR, CREDS.password);
    await page.click(LOGINBTN_SELECTOR);
    await page.waitFor(5 * 1000);

    let news = [];
    for (let i = 1; i <= 20; i++) {
        await page.goto('https://s.weibo.com/weibo/NBA%25202K19&nodup=1&page=' + i);
        const newsArray = await page.evaluate((sWeibo, sLink, sName, sComment, sSave, sRepost, sComments, sLove, sDateTime) => {
            return Array.prototype.slice.apply(document.querySelectorAll(sWeibo))
                .map($newsListItem => {
                    const name = $newsListItem.querySelector(sName).innerText;
                    const comment = $newsListItem.querySelector(sComment).innerText;
                    const save = $newsListItem.querySelector(sSave).innerText.slice(2) == "" ? 0 : $newsListItem.querySelector(sSave).innerText.slice(2);
                    const repost = $newsListItem.querySelector(sRepost).innerText.slice(2) == "" ? 0 : $newsListItem.querySelector(sRepost).innerText.slice(2);
                    const comments = $newsListItem.querySelector(sComments).innerText.slice(2) == "" ? 0 : $newsListItem.querySelector(sComments).innerText.slice(2);
                    const love = $newsListItem.querySelector(sLove).innerText == "" ? 0 : $newsListItem.querySelector(sLove).innerText;
                    const dateTime = $newsListItem.querySelector(sDateTime).title;
                    const link = $newsListItem.querySelector(sLink).href;
                    return {
                        name,
                        link,
                        comment,
                        save,
                        repost,
                        comments,
                        love,
                        dateTime
                    };
                })
        }, WEIBO_ITEM_SELECTOR, WEIBO_USER_LINK, WEIBO_ITEM_NAME_SELECTOR, WEIBO_ITEM_COMMENT_SELECTOR, WEIBO_ITEM_SAVE_SELECTOR, WEIBO_ITEM_REPOST_SELECTOR, WEIBO_ITEM_COMMENTS_SELECTOR, WEIBO_ITEM_LOVE_SELECTOR, WEIBO_ITEM_DATETIME_SELECTOR);
        await page.waitFor(10 * 1000);
        news = news.concat(newsArray);
    }
    console.log(news);



    // console.log(news.length);
    for (let i = 0; i < news.length; i++) {
        try {
            await page.goto(news[i].link);
            const fans = await page.$$eval('.tb_counter tr td', elements => {
                if (elements) {
                    return elements[1].textContent;
                }
            });
            if (fans) {
                console.log("已完成第" + i + "个微博数据的获取！");
                news[i].fans = fans.replace(/[\r\n\t]/g, "").match(/[0-9]+/g)[0];
                await page.waitFor(3 * 1000);
            }
        } catch (e) {
            i = i - 1;
            console.log(e);
        } finally {
            continue;
        }

    }

    // console.log(news);
    fs.writeFile('./weibo_nba2k19.json', JSON.stringify(news), function (err) {
        if (!err) {
            console.log("数据写入完毕");

        } else {
            console.log("数据写入出错");
        }
        process.exit();
    });
})();