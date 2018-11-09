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

const { douyin, dama } = require("./creds");
let imageData = "";

// (async () => {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const uri =
//       "https://sso.toutiao.com/login/?service=https://mp.toutiao.com/sso_confirm/?redirect_url=/";
//     const page = await browser.newPage();
//     page.setDefaultNavigationTimeout(60 * 1000);
//     await page.setViewport({ width: 1600, height: 900 });
//     await page.goto(uri);

//     await page.waitFor(USERNAME_SELECTOR);
//     await page.waitFor(PASSWORD_SELECTOR);
//     await page.waitFor(LOGINBTN_SELECTOR);
//     // 获取验证码码图片
//     //imageData = await page.$eval(CAPTCHAIMG_SELECTOR, i => i.src);
//     const captchaImage = await page.waitForSelector(CAPTCHAIMG_SELECTOR);
//     imageData = await captchaImage.screenshot({
//       path: "./tmp/douyin/captcha.png",
//       omitBackground: false
//     });

//     await page.waitFor(3 * 1000);
//     await page.type(USERNAME_SELECTOR, douyin.username);
//     await page.type(PASSWORD_SELECTOR, douyin.password);
//     await page.type(CAPTCHAINPUT_SELECTOR, getCode());
//     await page.click(LOGINBTN_SELECTOR);
//     // await page.waitFor(3 * 1000);
//     // if (page.$(ERRORMESSAGE_SELECTOR)) {
//     //   console.log("验证码错误！");
//     // } else {
//     //   console.log("验证码成功！");
//     // }

//     // process.exit(0);
//   } catch (error) {
//     console.log(error);
//     // await browser.close();
//     // process.exit(-1);
//   }
// })();

getCode();

// 获得打码结果
async function getCode() {
  const result = await uploadImg({ ...dama });
  console.log(result.data);
  return "2345";
}

/**
 * 云打码文档：http://www.yundama.com/apidoc/
 */

// 返回数据：{"ret":0,"cid":1000000}，ret=0则上传成功
async function uploadImg({
  username,
  password,
  appid,
  appkey,
  codetype,
  timeout
}) {
  return axios.post("http://api.yundama.com/api.php?method=upload", {
    username,
    password,
    appid,
    appkey,
    codetype,
    timeout,
    enctype: "multipart/form-data",
    data: "/Users/xuziwei/Desktop/项目/headless-chrome/tmp/douyin/captcha.png"
  });
}
// 获取结果接口（循环调用此接口直到有识别结果）
async function getResult(cid) {
  return axios.get("http://api.yundama.com/api.php?method=result", { cid });
}

// 查询余额接口
const getBalance = ({ username, password, appid, appkey }) =>
  axios.post("http://api.yundama.com/api.php", {
    username,
    password,
    appid,
    appkey,
    method: "balance"
  });

// 识别报错接口
const getReport = ({ username, password, appid, appkey }) =>
  axios.post("http://api.yundama.com/api.php", {
    username,
    password,
    appid,
    appkey
  });
