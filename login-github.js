const puppeteer = require('puppeteer');
const CREDS = require('./creds').github;
const USERNAME_SELECTOR = 'input#login_field';
const PASSWORD_SELECTOR = 'input#password';
const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
const searchUrl = 'https://github.com/search?q=Paul&type=Users&utf8=%E2%9C%93';
const USER_LIST_INFO_SELECTOR = '.user-list-item';

const USER_LIST_USERNAME_SELECTOR = '.user-list-info>a:nth-child(2)';
// const USER_LIST_EMAIL_SELECTOR = '.user-list-info>.user-list-meta .muted-link';

(async() => {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.goto('https://github.com/login');
    console.log("用户名是：", CREDS.username);
    console.log("密码是：", CREDS.password);
    await page.type(USERNAME_SELECTOR, CREDS.username);
    await page.type(PASSWORD_SELECTOR, CREDS.password);

    await page.click(BUTTON_SELECTOR);

    await page.goto(searchUrl);
    await page.waitFor(2 * 1000);

    const users = await page.evaluate((sel) => {
        return Array.prototype.slice.apply(document.querySelectorAll(sel))
            .map($userListItem => {
                // 用户名
                const username = $userListItem.querySelector(".f4").innerText;
                console.log(username);
                // 邮箱
                // return {
                //     username
                // };
            })
            // 不是所有用户都显示邮箱
            // .filter(u => !!u.email);
    }, USER_LIST_INFO_SELECTOR);

    // await browser.close();
})();