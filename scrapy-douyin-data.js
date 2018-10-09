const puppeteer = require("puppeteer");
const axios = require("axios");

const USERNAME_SELECTOR = "input#account";
const PASSWORD_SELECTOR = "input[name='password']";
const CAPTCHAINPUT_SELECTOR = "input#captcha";
const CAPTCHAIMG_SELECTOR = "img.y-right.captcha";
const LOGINBTN_SELECTOR = "input[name='submitBtn']";

const ERRORMESSAGE_SELECTOR = ".error-msg";

// 数据概览按钮
const DETAIL_BUTTON_SELECTOR = "ul.main-nav li:nth-child(1)";
const MORE_BUTTON_SELECTOR = ".card div.ft.unexpand";
// 粉丝分析
const FANS_BUTTON_SELECTOR = "ul.main-nav li:nth-child(2)";
// 博文分析
const BLOGDETAIL_BUTTON_SELECTOR = "ul.main-nav li:nth-child(3)";
// 互动分析
const INTERACT_BUTTON_SELECTOR = "ul.main-nav li:nth-child(4)";
// 文章分析
const ARTICLE_BUTTON_SELECTOR = "ul.main-nav li:nth-child(6)";

const CREDS = require("./creds").douyin;

const uri =
  "https://sso.toutiao.com/login/?service=https://mp.toutiao.com/sso_confirm/?redirect_url=/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    page.setDefaultNavigationTimeout(60 * 1000);
    await page.setViewport({ width: 1600, height: 0 });
    await page.goto(uri);

    await page.waitFor(USERNAME_SELECTOR);
    await page.waitFor(3 * 1000);
    await page.type(USERNAME_SELECTOR, CREDS.username);
    await page.type(PASSWORD_SELECTOR, CREDS.password);
    await page.type(CAPTCHAINPUT_SELECTOR, "123");
    await page.click(LOGINBTN_SELECTOR);
    await page.waitFor(3 * 1000);
    if (page.$(ERRORMESSAGE_SELECTOR)) {
      console.log("验证码错误！");
    } else {
      console.log("验证码成功！");
    }

    // process.exit(0);
  } catch (error) {
    console.log(String(error));
    // await browser.close();
    // process.exit(-1);
  }
})();

const uploadImg = axios.post("http://api.yundama.com/api.php", {
  username,
  password,
  appid,
  appkey,
  method: "upload"
});

const getResult = cid =>
  axios.post("http://api.yundama.com/api.php?method=result", { cid });
