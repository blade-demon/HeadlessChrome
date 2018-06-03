const puppeteer = require('puppeteer');
const request = require('superagent');
const CREDS = require('./creds').psn;

const USERNAME_SELECTOR = 'input#ember697';
const PASSWORD_SELECTOR = 'input#ember711';
const LOGIN_BTN_SELECTOR = 'button.primary-button';
const RECAPTCHA_IMAGE_SELECTOR = 'img#recaptcha_challenge_image';
const RECAPTCHA_INPUT_SELECTOR = 'input#recaptcha_response_field';


let accountId = "";
// 查看某个用户的accountId的奖杯
const GETTROPHIES_URL = 'https://my.playstation.com/profile/' + accountId + '/trophies';

(async() => {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.goto('https://id.sonyentertainmentnetwork.com/signin/?response_type=token&scope=capone%3Areport_submission%2Ckamaji%3Agame_list%2Ckamaji%3Aget_account_hash%2Cuser%3Aaccount.get%2Cuser%3Aaccount.profile.get%2Ckamaji%3Asocial_get_graph%2Ckamaji%3Augc%3Adistributor&client_id=656ace0b-d627-47e6-915c-13b259cd06b2&redirect_uri=https%3A%2F%2Fmy.playstation.com%2Fauth%2Fresponse.html%3FrequestID%3Dexternal_request_3086b2a8-c1f5-4b71-aefc-214064010eda%26baseUrl%3D%2F%26returnRoute%3D%2F%26targetOrigin%3Dhttps%3A%2F%2Fmy.playstation.com%26excludeQueryParams%3Dtrue&prompt=login&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&error=login_required&error_code=4165&error_description=User+is+not+authenticated#/signin?entry=%2Fsignin');

    console.log("用户名是：", CREDS.username);
    console.log("密码是：", CREDS.password);
    await page.waitFor(3 * 1000);

    await page.type(USERNAME_SELECTOR, CREDS.username);
    await page.type(PASSWORD_SELECTOR, CREDS.password);
    // const cropPosition = await page.$(RECAPTCHA_IMAGE_SELECTOR).offset();
    // console.log(await page.$(RECAPTCHA_IMAGE_SELECTOR));
    // await detectRecaptcha("AIzaSyDBSrVjivmLS7lVqPStac4E0N-F2jVtH10");
    await page.screenshot({
        path: 'screenshot.png',
        clip: {
            x: 220,
            y: 380,
            width: 360,
            height: 100
        }
    });

    await page.waitFor(10 * 1000);
    await page.click(LOGIN_BTN_SELECTOR);

    // await page.type(RECPTACHA_SELECTOR, "123");

    await page.waitFor(3 * 1000);
    await page.goto('https://my.playstation.com/profile/xuziwei89/friends?q=jiangxf', { waitUntil: "load" });


})();

let detectRecaptcha = (key) => {
    request
        .post('https://vision.googleapis.com/v1/images:annotate?key=' + key)
        .send({
            "requests": [{
                "image": {
                    "content": "data:image/png;base64,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"
                },
                "features": [{
                    "type": "TEXT_DETECTION"
                }]
            }]
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            // Calling the end function will send the request
            if (err) {
                console.log(err.message);
            } else {
                console.log(res);
            }
        });
};