const puppeteer = require("puppeteer");
const axios = require("axios");
const request = require("request-promise");
const FormData = require("form-data");
const fs = require("fs");

const USERNAME_SELECTOR = "input#account";
const PASSWORD_SELECTOR = "input[name='password']";
const CAPTCHAINPUT_SELECTOR = "input#captcha";
const CAPTCHAIMG_SELECTOR = "img.y-right.captcha";
const LOGINBTN_SELECTOR = "input[name='submitBtn']";

const ERRORMESSAGE_SELECTOR = ".error-msg";

// 数据分析
const DATA_ANALYTICS_URI = `https://mp.toutiao.com/profile_v3/douyin/data-analysis`;

//

const { douyin, captcha } = require("./creds");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const uri =
      "https://sso.toutiao.com/login/?service=https://mp.toutiao.com/sso_confirm/?redirect_url=/";
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60 * 1000);
    await page.setViewport({ width: 1600, height: 900 });
    await page.goto(uri);

    await page.waitFor(USERNAME_SELECTOR);
    await page.waitFor(PASSWORD_SELECTOR);
    await page.waitFor(LOGINBTN_SELECTOR);

    await page.type(USERNAME_SELECTOR, douyin.username);
    await page.type(PASSWORD_SELECTOR, douyin.password);

    // 获得验证码图片
    await getScreenshot(page);

    let code = "";
    while (!code) {
      let result = await startGetCode();
      if (result.includes("OK")) {
        code = result;
        await page.type(CAPTCHAINPUT_SELECTOR, code.slice(3));
        await page.click(LOGINBTN_SELECTOR);
        await page.waitFor(3 * 1000);

        console.log(page.url());
        // 返回的验证码不匹配
        if (page.url() === uri) {
          code = "";
          // 清空输入框
          await page.click(CAPTCHAINPUT_SELECTOR, { clickCount: 3 });
          await page.keyboard.press("Backspace");
          // 重新获得验证码图片
          await getScreenshot(page);
        } else {
          console.log("验证码获取并且验证成功！");

          // 开始获取数据
          await startGetData(page);
        }
      } else {
        await page.click(".captcha-wrap");
        console.log("获得的验证码失败，刷新新的验证码");
      }
    }

    // process.exit(0);
  } catch (error) {
    console.log(error);
    // await browser.close();
    // process.exit(-1);
  }
})();

async function startGetData(page) {
  await page.goto("https://mp.toutiao.com/profile_v3/douyin/data-analysis");

  // 1. 核心运营数据
  await page.waitForSelector(".tui-tabs");
  await page.waitFor(3000);
  // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await page.screenshot({
    clip: {
      x: 400,
      y: 0,
      width: 1000,
      height: 2000
    },
    path: "./tmp/douyin/screenshots/data-analysis.png"
  });

  console.log("获得核心运营数据");

  // 2. 视频互动数据
  await page.waitForSelector(".pgc-title-tab");
  await page.click(
    ".tui-tabs:nth-child(1) .pgc-title .pgc-title-tab:nth-child(3)"
  );

  await page.waitFor(3000);
  // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await page.screenshot({
    clip: {
      x: 400,
      y: 0,
      width: 1000,
      height: 2000
    },
    path: "./tmp/douyin/screenshots/data-analysis-video.png"
  });

  console.log("获得视频互动数据");

  // 3. 内容管理
  page.goto("https://mp.toutiao.com/profile_v3/douyin/content-manage");
  await page.waitForSelector(".content");
  await page.waitFor(3000);
  await page.screenshot({
    clip: {
      x: 400,
      y: 0,
      width: 1000,
      height: 2000
    },
    path: "./tmp/douyin/screenshots/data-analysis-content-manage.png"
  });

  console.log("完成数据收集");
  process.exit(0);
}

async function startGetCode() {
  return new Promise(async resolve => {
    try {
      const resultId = await uploadImg(captcha.apikey);
      console.log("获得了resultId:", resultId.slice(3));
      const interval = await setInterval(async () => {
        // 每隔10s调用一次
        const codeResult = await getResult(resultId.slice(3));
        if (codeResult.includes("OK")) {
          // 验证码获取成功
          console.log("验证码获取成功！" + codeResult);
          clearInterval(interval);
          resolve(codeResult);
        } else if (codeResult === "CAPCHA_NOT_READY") {
          // 正在识别
          console.log("正在等待识别验证码结果!10秒后重试！");
        } else if (codeResult === "ERROR_CAPTCHA_UNSOLVABLE") {
          // 验证码无法识别
          clearInterval(interval);
          resolve("ERROR_CAPTCHA_UNSOLVABLE");
        } else {
          // 其他错误
          clearInterval(interval);
          console.log("出现错误", codeResult);
          resolve(codeResult);
        }
      }, 10000);
    } catch (error) {
      console.log(error);
    }
  });
}

/**
 * 2captcha文档： https://2captcha.com/2captcha-api#solving_normal_captcha
 */

async function uploadImg(apikey) {
  console.log(apikey);
  let formData = {
    key: apikey,
    file: fs.createReadStream(__dirname + "\\tmp\\douyin\\captcha.png")
  };
  return request
    .post({ url: "http://2captcha.com/in.php", formData: formData })
    .then(body => {
      return body;
    })
    .catch(err => {
      throw err;
    });
}

// 获取结果接口（循环调用此接口直到有识别结果）
async function getResult(resultId) {
  return axios
    .get(
      `http://2captcha.com/res.php?id=${resultId}&action=get&key=${
        captcha.apikey
      }`
    )
    .then(res => res.data);
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

async function getScreenshot(page) {
  // 获取验证码码图片
  //imageData = await page.$eval(CAPTCHAIMG_SELECTOR, i => i.src);
  const captchaImage = await page.waitForSelector(CAPTCHAIMG_SELECTOR);
  imageData = await captchaImage.screenshot({
    path: "./tmp/douyin/captcha.png",
    omitBackground: false
  });
}
