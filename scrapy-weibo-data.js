const puppeteer = require("puppeteer");
const request = require("superagent");
const fs = require("fs");

const USERNAME_SELECTOR = "input#loginname";
const PASSWORD_SELECTOR = "input[name='password']";
const LOGINBTN_SELECTOR = ".info_list.login_btn";

// 数据概览按钮
const DETAIL_BUTTON_SELECTOR = "ul.main-nav li:nth-child(1)";
// 粉丝分析
const FANS_BUTTON_SELECTOR = "ul.main-nav li:nth-child(2)";
// 博文分析
const BLOGDETAIL_BUTTON_SELECTOR = "ul.main-nav li:nth-child(3)";
// 互动分析
const INTERACT_BUTTON_SELECTOR = "ul.main-nav li:nth-child(4)";
// 文章分析
const ARTICLE_BUTTON_SELECTOR = "ul.main-nav li:nth-child(6)";

const CREDS = {
  username: "bobo@gamepoch.com",
  password: "gamepoch2016"
};

const uri = "https://weibo.com/";

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60 * 1000);
    await page.setViewport({ width: 1600, height: 0 });
    await page.goto(uri);

    await page.waitFor(USERNAME_SELECTOR);
    await page.type(USERNAME_SELECTOR, CREDS.username);
    await page.type(PASSWORD_SELECTOR, CREDS.password);
    await page.click(LOGINBTN_SELECTOR);
    await page.waitFor(10 * 1000);

    // 详细数据iframe页面
    await page.goto(
      "https://weibo.com/p/1006065864259588/manage?iframe_url=%2F%2Fdss.sc.weibo.com%3Fsjzs%3Dzhongxin#place"
    );
    let iframe = await page
      .frames()
      .find(f => f.name().includes("rightiframe"));

    const fansButton = await iframe.$(FANS_BUTTON_SELECTOR);
    const blogDetailButton = await iframe.$(BLOGDETAIL_BUTTON_SELECTOR);
    const interactButton = await iframe.$(INTERACT_BUTTON_SELECTOR);
    const articleButton = await iframe.$(ARTICLE_BUTTON_SELECTOR);

    // 获得微博数据的截屏
    await blogDetailButton.click();
    await page.waitFor(10 * 1000);
    await page.screenshot({
      fullPage: true,
      path: "./blog-detail.png"
    });

    // 获得粉丝数据的截屏
    await fansButton.click();
    await page.waitFor(10 * 1000);
    await page.screenshot({
      fullPage: true,
      path: "./fans.png"
    });

    // 获得微博互动数据的截屏
    await interactButton.click();
    await page.waitFor(10 * 1000);
    await page.screenshot({
      fullPage: true,
      path: "./interact.png"
    });

    // 获得文章数据的截屏
    await articleButton.click();
    await page.waitFor(10 * 1000);
    await page.screenshot({
      fullPage: true,
      path: "./blog-detail.png"
    });

    await browser.close();
    console.log("获取数据成功");
    process.exit(0);
    // await page.waitFor(10 * 1000);
    // await page.screenshot({ fullPage: true, path: "./screen.png" });
    // await page.waitFor(10 * 1000);
    // await page.click(BLOGDETAIL_SELECTOR);
  } catch (error) {
    console.log(String(error));
    await browser.close();
    process.exit(-1);
  }
})();
