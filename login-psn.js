const puppeteer = require("puppeteer");
const request = require("superagent");
const terminalImage = require("term-img");
const inquirer = require("inquirer");
const CREDS = require("./creds").psn;

const USERNAME_SELECTOR = ".wrapper-signin-textfield input";
const PASSWORD_SELECTOR = ".wrapper-password-textfield input";
const LOGIN_BTN_SELECTOR = "button.primary-button";
const RECAPTCHA_IMAGE_SELECTOR = "img#recaptcha_challenge_image";
const RECAPTCHA_INPUT_SELECTOR = "input#recaptcha_response_field";

let tempRecaptcha = "";
let loginSuccessful = false;

let accountId = "";
// 查看某个用户的accountId的奖杯
const GETTROPHIES_URL =
  "https://my.playstation.com/profile/" + accountId + "/trophies";

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.goto(
    "https://id.sonyentertainmentnetwork.com/signin/?response_type=token&scope=capone%3Areport_submission%2Ckamaji%3Agame_list%2Ckamaji%3Aget_account_hash%2Cuser%3Aaccount.get%2Cuser%3Aaccount.profile.get%2Ckamaji%3Asocial_get_graph%2Ckamaji%3Augc%3Adistributor&client_id=656ace0b-d627-47e6-915c-13b259cd06b2&redirect_uri=https%3A%2F%2Fmy.playstation.com%2Fauth%2Fresponse.html%3FrequestID%3Dexternal_request_3086b2a8-c1f5-4b71-aefc-214064010eda%26baseUrl%3D%2F%26returnRoute%3D%2F%26targetOrigin%3Dhttps%3A%2F%2Fmy.playstation.com%26excludeQueryParams%3Dtrue&prompt=login&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&error=login_required&error_code=4165&error_description=User+is+not+authenticated#/signin?entry=%2Fsignin"
  );
  await page.setViewport({
    width: 1600,
    height: 0
  });
  await page.waitFor(3 * 1000);

  // 填入用户名和密码
  await page.type(USERNAME_SELECTOR, CREDS.username);

  while (!loginSuccessful) {
    await page.type(PASSWORD_SELECTOR, CREDS.password);
    await page.evaluate(function() {
      document.querySelector("input#recaptcha_response_field").value = "";
    });

    // 控制台显示验证码
    const imageData = await page.$eval(RECAPTCHA_IMAGE_SELECTOR, el => el.src);
    tempRecaptcha = imageData;
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    await require("fs").writeFileSync("recapcha.png", base64Data, "base64");
    await terminalImage("recapcha.png", {
      width: 80,
      height: 20
    });

    const code = await inquirer.prompt([
      {
        message: "请输入您验证码以继续登录：",
        type: "input",
        name: "text"
      }
    ]);
    // 输入新的验证码信息
    await page.type(RECAPTCHA_INPUT_SELECTOR, code.text);
    await page.click(LOGIN_BTN_SELECTOR);
    await page.waitFor(3 * 1000);
    let data = await page.$eval(RECAPTCHA_IMAGE_SELECTOR, el => el.src);
    if (tempRecaptcha == data) {
      loginSuccessful = true;
    }
  }
  // console.log("登陆成功！");
  await page.goto("https://my.playstation.com/profile/jiangxf/trophies", {
    waitUntil: "load"
  });
})();
