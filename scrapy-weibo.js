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

    // let news = [];
    // for (let i = 1; i <= 17; i++) {
    //     await page.goto('https://s.weibo.com/weibo/NBA%25202K19&nodup=1&page=' + i);
    //     const newsArray = await page.evaluate((sWeibo, sLink, sName, sComment, sSave, sRepost, sComments, sLove, sDateTime) => {
    //         return Array.prototype.slice.apply(document.querySelectorAll(sWeibo))
    //           .map($newsListItem => {
    //             const name = $newsListItem.querySelector(sName).innerText;
    //             const comment = $newsListItem.querySelector(sComment).innerText;
    //             const save = $newsListItem.querySelector(sSave).innerText;
    //             const repost = $newsListItem.querySelector(sRepost).innerText;
    //             const comments = $newsListItem.querySelector(sComments).innerText;
    //             const love = $newsListItem.querySelector(sLove).innerText;
    //             const dateTime = $newsListItem.querySelector(sDateTime).title;
    //             const link = $newsListItem.querySelector(sLink).href;
    //             return {
    //               name, link, comment, save, repost, comments, love, dateTime
    //             };
    //           })
    //       }, WEIBO_ITEM_SELECTOR, WEIBO_USER_LINK, WEIBO_ITEM_NAME_SELECTOR, WEIBO_ITEM_COMMENT_SELECTOR, WEIBO_ITEM_SAVE_SELECTOR, WEIBO_ITEM_REPOST_SELECTOR,WEIBO_ITEM_COMMENTS_SELECTOR, WEIBO_ITEM_LOVE_SELECTOR, WEIBO_ITEM_DATETIME_SELECTOR);
    //     await page.waitFor(10 * 1000);
    //     news = news.concat(newsArray);
    // }
    // console.log(news);


    let news = [{
        "name": "你是kelpy哪个单位的",
        "link": "https://weibo.com/u/6341413594?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》泄露！詹皇喜上封面】国外零售商泄露了《NBA 2K19》的封面宣传图，作为NBA传奇的勒布朗·詹姆斯喜上封面。根据商店特供封面宣传图显示，该作是NBA2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天获取游戏，即9月7日发布，标准版则为9月11日发售，勒布朗·詹姆斯除了本作，之前 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 17:00"
    }, {
        "name": "HQ侃侃",
        "link": "https://weibo.com/u/6483672576?refer_flag=1001030103_",
        "comment": "《NBA 2K19》发售日泄露 詹姆斯将坐镇封面球星(同步自@新浪看点)|《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 15:55"
    }, {
        "name": "深蓝79643",
        "link": "https://weibo.com/u/6033844208?refer_flag=1001030103_",
        "comment": "最近，NBA2K官方宣布骑士当家球星勒布朗詹姆斯当选2K19封面人物。这款游戏从1999年诞生到现在，马上将迎来第20个年头这一重要时刻，所以让詹姆斯代言2K19无疑是再适合不过的人选。勒布朗不仅是外界公认的现役联盟第一人，也是划时代的历史级别超级巨星，如果说乔丹统治了90年代，科比代表了00年代，那 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 14:25"
    }, {
        "name": "咪咕游戏官微\t",
        "link": "https://weibo.com/cmgame?refer_flag=1001030103_",
        "comment": "#咪咕抢鲜看#日前，2K新作《NBA 2K19》已经正式上架Steam，支持中文，预计今年9月12日发售。其中20周年纪念版封面人物是超级巨星——詹姆斯，霸气侧漏。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-07 14:17"
    }, {
        "name": "7911丶Goone\t",
        "link": "https://weibo.com/u/6135303835?refer_flag=1001030103_",
        "comment": "来自2k游戏的毒奶，\n记得去年2k18的封面是欧文，然后骑士输了～\n今年设立2k19的封面是老詹，然后骑士输了～\n#2018NBA总决赛# 骑士#心疼老詹# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "1",
        "dateTime": "2018-06-07 13:42"
    }, {
        "name": "Vitch\t",
        "link": "https://weibo.com/vitch?refer_flag=1001030103_",
        "comment": "NBA 2K19 - How Could They Have Known _ (Feat. 2 Chainz, Rapsody and Jerreau) Vitch的微... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 13:36"
    }, {
        "name": "龍柒SNEAKER\t",
        "link": "https://weibo.com/long7sneaker?refer_flag=1001030103_",
        "comment": "#L7快讯# NBA 2K19 的广告正片来啦！本作的封面人物选择了 LeBron James，并在封面上使用了 G.O.A.T （Greatest of All Time） 的标签。 龍柒SNEAKE... ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论2",
        "love": "19",
        "dateTime": "2018-06-07 12:35"
    }, {
        "name": "并非体育\t",
        "link": "https://weibo.com/u/3938278490?refer_flag=1001030103_",
        "comment": "#群众体育汇#传奇并非与生俱来，而是通过后天塑造！ 勒布朗-詹姆斯在NBA 2K19 20周年纪念版宣传片亲手精选了一些关键词来表达自己在阿克伦从一个稚嫩的孩子不断成长，成就非凡，并永登世界巅峰的故事。最强詹皇成长史！一起来了解一下！勒布朗·詹姆斯 NBA2K19 网页链接 ​#NBA比赛日# ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 12:11"
    }, {
        "name": "richardzc",
        "link": "https://weibo.com/u/1312372813?refer_flag=1001030103_",
        "comment": "传奇并非与生俱来，而是通过后天塑造！\n勒布朗-詹姆斯在NBA 2K19 20周年纪念版宣传片亲手精选了一些关键词来表达自己在阿克伦从一个稚嫩的孩子不断成长，成就非凡，并永登世界巅峰的故事。最强詹皇成长史！一起来了解一下！网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 12:04"
    }, {
        "name": "邮爸卦纟m",
        "link": "https://weibo.com/u/6557721567?refer_flag=1001030103_",
        "comment": "NBA 2K19 封面人物：LeBron James NBA 2K19 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 11:11"
    }, {
        "name": "饶腹锌瓜亦瑶",
        "link": "https://weibo.com/u/6558954520?refer_flag=1001030103_",
        "comment": "NBA 2K19 封面人物：LeBron James NBA 2K19 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 08:52"
    }, {
        "name": "红烧Venom\t",
        "link": "https://weibo.com/u/6251746225?refer_flag=1001030103_",
        "comment": "2K19官方推特此前宣布，骑士前锋勒布朗-詹姆斯将成为他们的封面代言人。雷霆前锋卡梅罗-安东尼今日也在推特上发图（见新闻配图）祝贺詹姆斯。\n“#STAYME7O @詹姆斯 @NBA2k 封面球员 #兄弟情”安东尼写道。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-07 08:09"
    }, {
        "name": "泉泉工作室",
        "link": "https://weibo.com/qqgzs?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》上线Steam】#NBA2K19# 已经上线Steam平台，9月12日发售，国区标准版售价199元，20周年版售价464元。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 08:00"
    }, {
        "name": "用户5736892677",
        "link": "https://weibo.com/u/5736892677?refer_flag=1001030103_",
        "comment": "哈哈，nba live 05是安东尼啊，那时候都在玩盗版碟 《安东尼晒图祝贺詹姆斯成为2K19封面人物》|安东尼晒图...（来自@新浪体育 客户端。下载地址：网页链接） ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 07:59"
    }, {
        "name": "虾米oap是只狗",
        "link": "https://weibo.com/u/6345205683?refer_flag=1001030103_",
        "comment": "美媒Cavs Nation报道：《NBA 2K19》将把勒布朗·詹姆斯作为20周年版本的封面球员！ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 06:14"
    }, {
        "name": "挪威政府养老基金\t",
        "link": "https://weibo.com/norgesbank?refer_flag=1001030103_",
        "comment": "《NBA 2K19》正式登陆Steam：售199元，配置需求公布 - 新闻发布 - Chiphell - 分享与交流用户体验 网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 05:44"
    }, {
        "name": "yiranhua_B",
        "link": "https://weibo.com/u/6341925818?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！作为20周年版本，2K19将在9月8日发售。老詹曾当选过2K14封面人物。 ​​​ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 02:10"
    }, {
        "name": "wewechen0102",
        "link": "https://weibo.com/u/5822138422?refer_flag=1001030103_",
        "comment": "美媒：詹姆斯將成為《2K19》封面球員-體育新聞-新浪新聞中心\n直播吧6月5日訊據美媒《CavsNation》報導，《NBA2K19》將會把勒布朗-詹姆斯作為20周... 网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-07 00:12"
    }, {
        "name": "TRULIGION\t",
        "link": "https://weibo.com/u/1966071415?refer_flag=1001030103_",
        "comment": "#潮流资讯##nba# 2K19 将以#詹姆斯# 为封面球员☞9月11日上线 TRULIGION... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 23:57"
    }, {
        "name": "amigo1111l",
        "link": "https://weibo.com/u/6137908480?refer_flag=1001030103_",
        "comment": "美媒Cavs Nation报道：《NBA 2K19》将把勒布朗·詹姆斯作为20周年版本的封面球员！ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 23:51"
    }, {
        "name": "戒不掉的征途",
        "link": "https://weibo.com/u/6433505412?refer_flag=1001030103_",
        "comment": "二十周年的《NBA 2K19》，是成为下一个NBA Live还是强势反弹(同步自@新浪看点)|二十周年的... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 23:16"
    }, {
        "name": "游戏小五哥\t",
        "link": "https://weibo.com/u/6442022723?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》上架Steam 支持中文，PC版配置要求公布》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 22:40"
    }, {
        "name": "新浪体育\t",
        "link": "https://weibo.com/sportschannel?refer_flag=1001030103_",
        "comment": "《NBA 2K19》勒布朗-詹姆斯封面故事——They will know your name。\n他们怎会知道？他们怎么会知道站在他们面前的是一个王者。\n他们怎会知道？他们的孩子，一个16岁的英雄，正在牺牲自己为他们而战。\n他们怎会知道？他的动力，他的能量，以及受他激励的一代又一代。\n他真的是人类么？他的能力没有极限 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发36",
        "comments": "评论17",
        "love": "104",
        "dateTime": "2018-06-06 21:00"
    }, {
        "name": "谦虚是需要实力的",
        "link": "https://weibo.com/u/6207817599?refer_flag=1001030103_",
        "comment": "《NBA 2K19》正式公布 詹姆斯登上纪念版封面Live for gamers，为玩家而生的游戏直播平台 分享链接 网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 20:45"
    }, {
        "name": "YshadowL\t",
        "link": "https://weibo.com/u/5295579425?refer_flag=1001030103_",
        "comment": "《NBA 2K19》上架Steam平台：售价199元(同步自@新浪看点)|《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 20:45"
    }, {
        "name": "dia一横儿",
        "link": "https://weibo.com/u/6238657236?refer_flag=1001030103_",
        "comment": "美媒Cavs Nation报道：《NBA 2K19》将把勒布朗·詹姆斯作为20周年版本的封面球员！ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 20:38"
    }, {
        "name": "新浪NBA\t",
        "link": "https://weibo.com/nbachannel?refer_flag=1001030103_",
        "comment": "《NBA 2K19》勒布朗-詹姆斯封面故事——They will know your name。\n他们怎会知道？他们怎么会知道站在他们面前的是一个王者。\n他们怎会知道？他们的孩子，一个16岁的英雄，正在牺牲自己为他们而战。\n他们怎会知道？他的动力，他的能量，以及受他激励的一代又一代。\n他真的是人类么？他的能力没有极限 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发77",
        "comments": "评论54",
        "love": "266",
        "dateTime": "2018-06-06 20:30"
    }, {
        "name": "斑马网\t",
        "link": "https://weibo.com/banmayuanchuang?refer_flag=1001030103_",
        "comment": "《NBA 2K19》正式公布 詹姆斯再次喜提封面人物(同步自@新浪看点)|《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 20:23"
    }, {
        "name": "EYE游戏",
        "link": "https://weibo.com/eyeuc?refer_flag=1001030103_",
        "comment": "#EYE资源中心# #NBA2K18# 新增资源【NBA2K18 勒布朗詹姆斯2K19引导图】(V2.0) | 作者: MVP30 -->> 详情/下载: 网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 20:09"
    }, {
        "name": "SailBoat游戏网",
        "link": "https://weibo.com/u/5725877682?refer_flag=1001030103_",
        "comment": "今天2K宣布《NBA 2K19》二十周年纪念版将会以3次获得NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗·詹姆斯作为封面球星。这次的封面上的关键词通过勒布朗·詹姆斯亲自挑选，生动的表现出了阿克伦最挚爱的孩子的心路历程。上面的每一个词都对勒布朗詹姆斯意义深远！\n\n点击链接查看原文！\n​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 20:03"
    }, {
        "name": "宁美玩购\t",
        "link": "https://weibo.com/ningmeiwangou?refer_flag=1001030103_",
        "comment": "2K正式公布了#NBA 2K19#二十周年纪念版，勒布朗·詹姆斯成为封面球星。这次的游戏封面通过勒布朗詹姆斯亲自挑选的一些生动的关键词表现出了阿克伦最挚爱的孩子的心路历程。#NBA 2K19#二十周年纪念版由Visual Concepts开发，将于2018年9月7日以数字版和实体版同时在Xbox One、PS4和Switch平台，以数字版 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 18:15"
    }, {
        "name": "优酷游戏\t",
        "link": "https://weibo.com/youkugame?refer_flag=1001030103_",
        "comment": "今日游报: BLG上单穿女装直播 詹姆斯成NBA 2K19封面人物\n#BLG##AJ##LOL##詹姆斯#\n今日游报: ... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 18:02"
    }, {
        "name": "武月天丫",
        "link": "https://weibo.com/u/6228327105?refer_flag=1001030103_",
        "comment": "最近，NBA2K官方宣布骑士当家球星勒布朗詹姆斯当选2K19封面人物。这款游戏从1999年诞生到现在，马上将迎来第20个年头这一重要时刻，所以让詹姆斯代言2K19无疑是再适合不过的人选。勒布朗不仅是外界公认的现役联盟第一人，也是划时代的历史级别超级巨星，如果说乔丹统治了90年代，科比代表了00年代，那 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 17:52"
    }, {
        "name": "蚕豆网\t",
        "link": "https://weibo.com/candou?refer_flag=1001030103_",
        "comment": "詹姆斯成为代言人？《NBA 2K19》提前泄露！(同步自@新浪看点)|詹姆斯成为... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 17:50"
    }, {
        "name": "JiaanGuo6",
        "link": "https://weibo.com/u/5890821110?refer_flag=1001030103_",
        "comment": "NBA 2K19 JiaanGuo6... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 17:42"
    }, {
        "name": "优酷游戏\t",
        "link": "https://weibo.com/youkugame?refer_flag=1001030103_",
        "comment": "今日游报: BLG上单穿女装直播 詹姆斯成NBA 2K19封面人物\n#BLG##AJ##lol##詹姆斯#\n今日游报: ... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 17:41"
    }, {
        "name": "ZOL中关村在线\t",
        "link": "https://weibo.com/cbsizol?refer_flag=1001030103_",
        "comment": "【詹皇降临！《NBA 2K19》正式登陆Steam 售价199元】根据最新的消息显示，目前《NBA 2K19》已经正式在Steam游戏商店上架，将于9月12日发布，售价为199元。特别版本售价为464元。玩家若参与游戏预购，可以提前四天进行游玩，同时获得100000 VC、MyTEAM卡包、MyPLAYER LeBron主题数字道具等礼品。 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论1",
        "love": "8",
        "dateTime": "2018-06-06 17:25"
    }, {
        "name": "MarrFeder",
        "link": "https://weibo.com/u/5243384457?refer_flag=1001030103_",
        "comment": "NBA 2K19\nHow could they have known? ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 17:12"
    }, {
        "name": "大罐子啊智\t",
        "link": "https://weibo.com/u/2437048020?refer_flag=1001030103_",
        "comment": "NBA 2K19 封面人物：LeBron James  \n‏\n NBA 2K19 ​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 16:35"
    }, {
        "name": "莽夫的蟒",
        "link": "https://weibo.com/u/6542248153?refer_flag=1001030103_",
        "comment": "发布了头条文章：《​在NBA 2K19 二十周年纪念版中，勒布朗詹姆斯的话意义深远》 |​在NBA 2K1... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 16:27"
    }, {
        "name": "NOWRE现客\t",
        "link": "https://weibo.com/nowre?refer_flag=1001030103_",
        "comment": "勒布朗·詹姆斯正式确定成为《NBA 2K19》封面人物，大家更担心的…可能还是著名的 “2K 魔咒“ 吧？网页链接 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论4",
        "love": "13",
        "dateTime": "2018-06-06 15:58"
    }, {
        "name": "爱加糖的咖啡瑾\t",
        "link": "https://weibo.com/u/2693200950?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！\n\n作为20周年版本，2K19将在9月8日发售。\n\n2K送来助攻，暗示詹姆斯要换队？\n\n你们觉得呢#NBA# ​ ​​​ |深圳 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "1",
        "dateTime": "2018-06-06 15:33"
    }, {
        "name": "EYE游戏",
        "link": "https://weibo.com/eyeuc?refer_flag=1001030103_",
        "comment": "#EYE资源中心# #NBA2K18# 新增资源【NBA2K18 勒布朗詹姆斯2K19引导图】(V1.0) | 作者: MVP30 -->> 详情/下载: 网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 15:30"
    }, {
        "name": "pkacc047_vc",
        "link": "https://weibo.com/u/6413724336?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》官宣封面代言人为詹姆斯，9月7日解锁游戏》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 15:25"
    }, {
        "name": "驱动中国官方\t",
        "link": "https://weibo.com/driverchina?refer_flag=1001030103_",
        "comment": "《NBA 2K19》官宣封面代言人为詹姆斯，9月7日解锁游戏(同步自@新浪看点)|《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 15:25"
    }, {
        "name": "泰安体彩\t",
        "link": "https://weibo.com/taianticai?refer_flag=1001030103_",
        "comment": "【詹姆斯当选NBA2K19封面人物】6月5日，NBA 2K19正式宣布骑士球星勒布朗·詹姆斯正式成为该游戏的封面人物，2K19将于今年9月8日发售。值得一提的是，这不是詹姆斯首次担任NBA2K游戏的封面人物，他曾当选过2K14的封面人物。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 15:22"
    }, {
        "name": "小菜爱八卦",
        "link": "https://weibo.com/u/6487329140?refer_flag=1001030103_",
        "comment": "《NBA 2K19》詹皇喜上封面，将登陆PC和各大主机端(同步自@新浪看点)|《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 14:47"
    }, {
        "name": "你不内谁满么",
        "link": "https://weibo.com/u/6160878884?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》泄露！詹皇喜上封面】国外零售商泄露了《NBA 2K19》的封面宣传图，作为NBA传奇的勒布朗·詹姆斯喜上封面。根据商店特供封面宣传图显示，该作是NBA2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天获取游戏，即9月7日发布，标准版则为9月11日发售，勒布朗·詹姆斯除了本作，之前 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 14:36"
    }, {
        "name": "发c面包子",
        "link": "https://weibo.com/u/6146016466?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》泄露！詹皇喜上封面】国外零售商泄露了《NBA 2K19》的封面宣传图，作为NBA传奇的勒布朗·詹姆斯喜上封面。根据商店特供封面宣传图显示，该作是NBA2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天获取游戏，即9月7日发布，标准版则为9月11日发售，勒布朗·詹姆斯除了本作，之前 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 14:32"
    }, {
        "name": "pkacc136_vl",
        "link": "https://weibo.com/u/6413724526?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》将于9月11日正式发售》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 14:10"
    }, {
        "name": "PlayStation\t",
        "link": "https://weibo.com/psasia?refer_flag=1001030103_",
        "comment": "【大帝再临】成为传奇 并非与生俱来。NBA 2K GC 很荣幸请到 LeBron James 担任 PS4《NBA2K19 20周年纪念版》封面球星 #NBA2K19# \n\n即日起於PS Store预购PS4《NBA 2K19 20周年纪念版》(中文版) 可提早四天游玩，并获得丰富特典：网页链接 PlayStatio... ​",
        "save": "收藏",
        "repost": "转发29",
        "comments": "评论43",
        "love": "77",
        "dateTime": "2018-06-06 14:06"
    }, {
        "name": "游侠网官方微博\t",
        "link": "https://weibo.com/ali213?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》现已登陆Steam】《NBA 2K19》现已上线Steam平台，游戏将于2018年9月12日发售，国区标准版售价199元，20周年版售价464元。 网页链接",
        "save": "收藏",
        "repost": "转发4",
        "comments": "评论3",
        "love": "6",
        "dateTime": ""
    }, {
        "name": "G-Hub主机游戏置换门户\t",
        "link": "https://weibo.com/gmhub?refer_flag=1001030103_",
        "comment": "//@PlayStation中国:《NBA 2K19》将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。这个夏天，你准备好了吗？",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "SOLE官方微博\t",
        "link": "https://weibo.com/solecollectorcn?refer_flag=1001030103_",
        "comment": "#履程趣事# NBA释出了由勒布朗·詹姆斯作为游戏封面的NBA 2K19宣传短片，虽然现在还没有游戏画面曝光，不过单单从短片中就可以看到满满的勒布朗元素，大家都找到了哪些细节呢？\n\n：NBAE SOLE官方微... ​",
        "save": "收藏",
        "repost": "转发23",
        "comments": "评论11",
        "love": "87",
        "dateTime": "2018-06-06 13:35"
    }, {
        "name": "卅卅篮球\t",
        "link": "https://weibo.com/u/6004256129?refer_flag=1001030103_",
        "comment": "2K19官方20周年纪念版宣传片！超燃！了解一下 卅卅篮球#NBA# 卅卅篮球的... ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-06 13:27"
    }, {
        "name": "聚焦篮球\t",
        "link": "https://weibo.com/278117785?refer_flag=1001030103_",
        "comment": "#NBA# BR恶搞2k19封面应当属于JR ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "10",
        "dateTime": "2018-06-06 13:26"
    }, {
        "name": "psmilee",
        "link": "https://weibo.com/u/6081587385?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》泄露！詹皇喜上封面】国外零售商泄露了《NBA 2K19》的封面宣传图，作为NBA传奇的勒布朗·詹姆斯喜上封面。根据商店特供封面宣传图显示，该作是NBA2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天获取游戏，即9月7日发布，标准版则为9月11日发售，勒布朗·詹姆斯除了本作，之前 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 13:20"
    }, {
        "name": "优酷游戏\t",
        "link": "https://weibo.com/youkugame?refer_flag=1001030103_",
        "comment": "《NBA 2K19》正式公布 詹姆斯成为二十周年纪念版封面人物\n#NBA ##2K19##詹姆斯#\n《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 12:58"
    }, {
        "name": "BallNeverLies\t",
        "link": "https://weibo.com/u/6524691356?refer_flag=1001030103_",
        "comment": "詹姆斯当选2K19的封面人物，当之无愧！今年的表现足以证明你的伟大！\n#NBA##詹姆斯# BallNeverL... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 12:40"
    }, {
        "name": "ImPurity街头生活指南\t",
        "link": "https://weibo.com/impurity?refer_flag=1001030103_",
        "comment": "🎮 NBA 2K19 Trailer 发布了勒布朗詹姆斯作为代言人的宣传片！ ImPurity街... ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论1",
        "love": "3",
        "dateTime": "2018-06-06 12:38"
    }, {
        "name": "YXECG官博\t",
        "link": "https://weibo.com/u/6300779539?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》正式公布】北京时间今晚《NBA 2K》官方正式公布了《NBA 2K19》，它将登陆PS4/Xbox One/PC/Switch。本作将有两个版本：标准版和20周年纪念版，其中20周年纪念版将由4次夺得NBA常规赛MVP、3次夺得NBA总决赛MVP、3次夺得NBA总冠军、14次入选NBA全明星阵容的小前锋勒布朗·詹姆斯担任封面人物 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论2",
        "love": "12",
        "dateTime": "2018-06-06 12:33"
    }, {
        "name": "pkacc047_vc",
        "link": "https://weibo.com/u/6413724336?refer_flag=1001030103_",
        "comment": "发布了头条文章：《神舟轻薄战神带你来看看 《NBA 2K19》封面人物》 |神舟轻薄战... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 12:32"
    }, {
        "name": "智电网\t",
        "link": "https://weibo.com/zhidianwang?refer_flag=1001030103_",
        "comment": "神舟轻薄战神带你来看看 《NBA 2K19》封面人物(同步自@新浪看点)|神舟轻薄战... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 12:32"
    }, {
        "name": "球鞋毒药\t",
        "link": "https://weibo.com/u/6348500265?refer_flag=1001030103_",
        "comment": "#毒闻趣事# 《NBA 2K19》二十周年纪念版正式公布，詹皇作为封面球星回归，并且亲自挑选封面关键词“为伟大而奋斗”“动力”“平等”。今年9月，Xbox One、PS4、Switch和PC平台一齐上线，还说什么，肯定得买啊！ 球鞋毒药的... ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论1",
        "love": "7",
        "dateTime": "2018-06-06 12:27"
    }, {
        "name": "篮民共和\t",
        "link": "https://weibo.com/lanmingonghe?refer_flag=1001030103_",
        "comment": "2k19詹姆斯宣传短片，小编还是很期待这次詹姆斯的歌单的 nba 詹姆斯 篮民共和的... ​",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论",
        "love": "15",
        "dateTime": "2018-06-06 12:24"
    }, {
        "name": "篮球实战馆\t",
        "link": "https://weibo.com/nbalqjx?refer_flag=1001030103_",
        "comment": "2k19封面人物-詹姆斯#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "9",
        "dateTime": "2018-06-06 12:22"
    }, {
        "name": "只要过朝暮",
        "link": "https://weibo.com/u/6067270736?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！作为20周年版本，2K19将在9月8日发售。老詹曾当选过2K14封面人物。 ​​​ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 12:19"
    }, {
        "name": "KIKS官方微博\t",
        "link": "https://weibo.com/newsize?refer_flag=1001030103_",
        "comment": "#KIKS定番# 《NBA 2K19》正式公布！国行二十周年纪念版封面公布！ ​",
        "save": "收藏",
        "repost": "转发4",
        "comments": "评论2",
        "love": "34",
        "dateTime": "2018-06-06 12:14"
    }, {
        "name": "ynopality",
        "link": "https://weibo.com/u/6072684175?refer_flag=1001030103_",
        "comment": "美媒Cavs Nation报道：《NBA 2K19》将把勒布朗·詹姆斯作为20周年版本的封面球员！ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 12:11"
    }, {
        "name": "SEEK_China\t",
        "link": "https://weibo.com/seek2018?refer_flag=1001030103_",
        "comment": "如火如荼的NBA总决赛正在上演，今日2K也正式公布了《NBA 2K19》二十周年纪念版，继2K14之后“詹皇”勒布朗·詹姆斯再次成为了封面。《NBA 2K19》二十周年纪念版由Visual Concepts开发，将于2018年9月7日以数字版和实体版同时在Xbox One、PS4和Switch平台，以数字版在PC平台全球首发。今年从季后赛到东部 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 12:06"
    }, {
        "name": "国产ESPN\t",
        "link": "https://weibo.com/u/6019168547?refer_flag=1001030103_",
        "comment": "2K19封面人物 — 勒布朗·詹姆斯！\n\n为什么封面没有用穿球衣的图片？想一想，这是个细思极恐的问题！#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发4",
        "comments": "评论10",
        "love": "21",
        "dateTime": "2018-06-06 12:02"
    }, {
        "name": "宅是一种人生态度",
        "link": "https://weibo.com/u/5090966583?refer_flag=1001030103_",
        "comment": "怎么现在游戏都搞这种//@A9VG:预购《NBA 2K19 20周年纪念版》可提前四天游玩本作，同时获得100000 VC、50000 MyTEAM点数、20个MyTEAM联盟卡包、10个MyTEAM卡包、MyPLAYER LeBron主题数字道具等。实体版中还有海报、贴纸、腕带。内容一览→|《NBA 2K19...",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "游戏伐木累\t",
        "link": "https://weibo.com/allnewgames?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》9月7日发售】PS4《NBA 2K19》确定将于9月7日推出，封面人物为勒布朗·詹姆斯（LeBron James）。玩家即日起在PS Store预购PS4《NBA 2K19 20周年纪念版》中文版，可提早四天游玩，并获得丰富特典。持有《NBA 2K18》的顾客可以9折购买《NBA 2K19 20周年纪念版》。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 11:53"
    }, {
        "name": "竞彩258网\t",
        "link": "https://weibo.com/jingcai258?refer_flag=1001030103_",
        "comment": "#NBA# NBA 2K19预告片，詹姆斯王者归来！ 竞彩258网... ​",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论",
        "love": "6",
        "dateTime": "2018-06-06 11:52"
    }, {
        "name": "游戏不动产\t",
        "link": "https://weibo.com/GameBDC?refer_flag=1001030103_",
        "comment": "詹皇回归！《NBA 2K19》官方中文预告片【他们怎么会知道？】公布  NBA2K 游戏不动产... ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论2",
        "love": "2",
        "dateTime": "2018-06-06 11:48"
    }, {
        "name": "篮球信徒Witness\t",
        "link": "https://weibo.com/crazycrossover?refer_flag=1001030103_",
        "comment": "非常酷炫的2K19宣传片，How Could They Have Known，致敬封面人物詹姆斯，超燃！#NBA# 篮球信徒Wi... ​",
        "save": "收藏",
        "repost": "转发68",
        "comments": "评论21",
        "love": "222",
        "dateTime": "2018-06-06 11:48"
    }, {
        "name": "DoNews游戏\t",
        "link": "https://weibo.com/gdonews?refer_flag=1001030103_",
        "comment": "【NBA2K19二十周年纪念版9月7日发售 詹姆斯为封面球星】《NBA 2K19》20周年纪念版将于9月7日正式发售，勒布朗詹姆斯为封面球星。#NBA# |NBA2K19二... ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论1",
        "love": "",
        "dateTime": "2018-06-06 11:44"
    }, {
        "name": "运动尖货\t",
        "link": "https://weibo.com/runningtopgear?refer_flag=1001030103_",
        "comment": "#尖货乱侃#《NBA 2K19》，9月7日。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 11:37"
    }, {
        "name": "612主机游戏推荐\t",
        "link": "https://weibo.com/u/5509113056?refer_flag=1001030103_",
        "comment": "发布了头条文章：《勒布朗詹姆斯代言《NBA 2K19：20周年纪念版》将于9月7日提前发售》 詹姆斯希望这次上封面能赢_(:з」∠)_ |勒布朗詹姆... ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 11:32"
    }, {
        "name": "小筱凪",
        "link": "https://weibo.com/u/6100847270?refer_flag=1001030103_",
        "comment": "《NBA 2K19》上架Steam 预购开启9月12日发售 网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 11:30"
    }, {
        "name": "PlayStation\t",
        "link": "https://weibo.com/psasia?refer_flag=1001030103_",
        "comment": "篮球游戏杰作《NBA 2K》踏入20周年PS4《NBA 2K19》确定於9月7日推出丶封面人物由 LeBron James 出任。\n即日起於PS Store预购PS4《NBA 2K19 20周年纪念版》(中文版) 可提早四天游玩，并获得丰富特典：网页链接\n\n※持有《NBA 2K18》的顾客可以9折购买《NBA 2K19 20周年纪念版》。 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发38",
        "comments": "评论30",
        "love": "69",
        "dateTime": "2018-06-06 11:29"
    }, {
        "name": "小鸟说体育",
        "link": "https://weibo.com/u/6543769582?refer_flag=1001030103_",
        "comment": "打破魔咒？《NBA 2K19》传詹皇将二度登上封面人物(同步自@新浪看点)|打破魔咒？... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 11:23"
    }, {
        "name": "Young_Gilpin\t",
        "link": "https://weibo.com/334556778?refer_flag=1001030103_",
        "comment": "NBA 2K19预告片《How Could They Have Known?》(Feat. 2 Chainz, Rapsody & Jerreau) Young_Gilp... ​",
        "save": "收藏",
        "repost": "转发12",
        "comments": "评论4",
        "love": "29",
        "dateTime": "2018-06-06 11:20"
    }, {
        "name": "pkacc134_el",
        "link": "https://weibo.com/u/6413936906?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》上架Steam平台：售价199元》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 11:10"
    }, {
        "name": "Dr_Match\t",
        "link": "https://weibo.com/52000717?refer_flag=1001030103_",
        "comment": "《NBA 2K19》20周年版封面确定 预购可得詹姆斯主题道具-|《NBA 2K19... [来自A9VG的资讯] ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 11:10"
    }, {
        "name": "石家庄市电子竞技协会\t",
        "link": "https://weibo.com/sjzesa?refer_flag=1001030103_",
        "comment": "学聪明了，不带队服，省得重做封面，毕竟谁上封面谁就要转会//@NintendoSwitch: 《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "竞彩258网\t",
        "link": "https://weibo.com/jingcai258?refer_flag=1001030103_",
        "comment": "#NBA# 你们以为2K19的封面人物是老詹？其实是JR ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-06 11:05"
    }, {
        "name": "Siyan-木又日君-o-",
        "link": "https://weibo.com/siyansky?refer_flag=1001030103_",
        "comment": "ns 没60祯没必要买//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "雷速体育\t",
        "link": "https://weibo.com/leisutiyu?refer_flag=1001030103_",
        "comment": "传奇并非与生俱来，而是通过后天塑造！\n勒布朗-詹姆斯在NBA 2K19 20周年纪念版宣传片亲手精选了一些关键词来表达自己在阿克伦从一个稚嫩的孩子不断成长，成就非凡，并永登世界巅峰的故事。最强詹皇成长史！一起来了解一下！ NBA2K中国... ​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 10:50"
    }, {
        "name": "爱Apps\t",
        "link": "https://weibo.com/iapps?refer_flag=1001030103_",
        "comment": "2018 年是《NBA 2K》系列游戏问世 20 周年的年份，Visual Concepts 工作室即将发布《NBA 2K19》以及《NBA 2K19 20周年纪念版》。事实确实如此，本次《NBA 2K19 20周年纪念版》的封面球星为骑士队的勒布朗·詹姆斯，而且纪念版中会有专属道具和服饰。网页链接 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-06 10:50"
    }, {
        "name": "pkacc107_vo",
        "link": "https://weibo.com/u/6413724457?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》上架 Steam 平台：售价 199 元》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 10:49"
    }, {
        "name": "pkacc086_tt",
        "link": "https://weibo.com/u/6413724409?refer_flag=1001030103_",
        "comment": "发布了头条文章：《詹姆斯：很荣幸能成为NBA 2K19的封面人物》 |詹姆斯：很... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 10:49"
    }, {
        "name": "hello麦小麦",
        "link": "https://weibo.com/u/1807131620?refer_flag=1001030103_",
        "comment": "我人生最后悔的事情就是花了60刀首发买了2k18NS数字版，最后又买了国行PS4版//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "NBA2K中国\t",
        "link": "https://weibo.com/u/6553536243?refer_flag=1001030103_",
        "comment": "传奇并非与生俱来，而是通过后天塑造！\n勒布朗-詹姆斯在NBA 2K19 20周年纪念版宣传片亲手精选了一些关键词来表达自己在阿克伦从一个稚嫩的孩子不断成长，成就非凡，并永登世界巅峰的故事。最强詹皇成长史！一起来了解一下！#勒布朗·詹姆斯# #NBA2K19# #战出威名#  NBA2K NBA2K中国... ​",
        "save": "收藏",
        "repost": "转发46",
        "comments": "评论29",
        "love": "76",
        "dateTime": "2018-06-06 10:39"
    }, {
        "name": "鄙视TX34906",
        "link": "https://weibo.com/u/5353239479?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "顶级锋卫摇摆人\t",
        "link": "https://weibo.com/u/2531075985?refer_flag=1001030103_",
        "comment": "2k19 已经宣布，JR史密斯由于在总决赛中扮演了令人印象深刻的角色，所以特聘为封面人物#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论1",
        "love": "5",
        "dateTime": "2018-06-06 10:27"
    }, {
        "name": "为什么没有想要的名字\t",
        "link": "https://weibo.com/371970125?refer_flag=1001030103_",
        "comment": "肯定很贵//@A9VG:预购《NBA 2K19 20周年纪念版》可提前四天游玩本作，同时获得100000 VC、50000 MyTEAM点数、20个MyTEAM联盟卡包、10个MyTEAM卡包、MyPLAYER LeBron主题数字道具等。实体版中还有海报、贴纸、腕带。内容一览→|《NBA 2K19...",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "BB姬Studio\t",
        "link": "https://weibo.com/u/5938544491?refer_flag=1001030103_",
        "comment": "《NBA 2K19》已登陆Steam，标准版售价为199元，20周年版售价为464元。游戏将于9月12日解锁，最低配置在图里~ ​",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论14",
        "love": "32",
        "dateTime": "2018-06-06 10:21"
    }, {
        "name": "游戏宅的那点事\t",
        "link": "https://weibo.com/u/3562724682?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》登陆Steam平台 游戏配置需求公布】今日《NBA 2K19》上线Steam平台，游戏将于9月12日发售，国区标准版售价为199元，20周年版售价为464元。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "3",
        "dateTime": "2018-06-06 10:21"
    }, {
        "name": "3DMGAME官方微博\t",
        "link": "https://weibo.com/3dmgame?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》登陆Steam平台 游戏配置需求公布】今日《NBA 2K19》上线Steam平台，游戏将于9月12日发售，国区标准版售价为199元，20周年版售价为464元。\n预购奖励和配置需求见配图，Steam地址见链接~ ​",
        "save": "收藏",
        "repost": "转发21",
        "comments": "评论63",
        "love": "89",
        "dateTime": "2018-06-06 10:19"
    }, {
        "name": "奇游联机宝\t",
        "link": "https://weibo.com/lianjibao?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》9月7日上线，现已开启预购】《NBA 2K19》二十周年纪念版宣传片公布，小皇帝勒布朗·詹姆斯成为封面颜值担当。《NBA 2K19》二十周年纪念版，将于9月7日登陆Xbox One, 标准版则将于9月11日发售，预购二十周年纪念版的玩家（预购地址：网页链接），可以获得詹姆斯主题道具以及一 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 10:11"
    }, {
        "name": "游玩社长\t",
        "link": "https://weibo.com/H1Z1zx?refer_flag=1001030103_",
        "comment": "《NBA 2K19》已经上线Steam平台，9月12日发售，国区标准版售价199元，20周年版售价464元。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 10:07"
    }, {
        "name": "9527的篮球梦\t",
        "link": "https://weibo.com/u/2673262594?refer_flag=1001030103_",
        "comment": "《NBA 2K19》勒布朗-詹姆斯封面故事——They will know your name。\n他们怎会知道？他们怎么会知道站在他们面前的是一个王者。\n他们怎会知道？他们的孩子，一个16岁的英雄，正在牺牲自己为他们而战。\n他们怎会知道？他的动力，他的能量，以及受他激励的一代又一代。\n他真的是人类么？他的能力没有极限 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发22",
        "comments": "评论5",
        "love": "61",
        "dateTime": "2018-06-06 10:01"
    }, {
        "name": "K者超",
        "link": "https://weibo.com/u/2892240921?refer_flag=1001030103_",
        "comment": "《在《NBA 2K19》中，勒布朗詹姆斯的话意义深远》《NBA 2K19 》标准版将于2018年9月11日在XboxOne，PlayStation。网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 09:54"
    }, {
        "name": "小鸡手柄\t",
        "link": "https://weibo.com/xiaojishoubing?refer_flag=1001030103_",
        "comment": " nba #NBA2K19# 今日2K正式公布了《NBA 2K19》二十周年纪念版，勒布朗·詹姆斯成为封面球星！\n《NBA 2K19》二十周年纪念版由Visual Concepts开发，将于2018年9月7日以数字版和实体版同时在Xbox One、PS4和Switch平台，以数字版在PC平台全球首发。标准版将于2018年9月11日在X ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "",
        "dateTime": "2018-06-06 09:51"
    }, {
        "name": "Bencaptor建明",
        "link": "https://weibo.com/u/6202477478?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！作为20周年版本，2K19将在9月8日发售。老詹曾当选过2K14封面人物。 ​​​ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 09:40"
    }, {
        "name": "Xbox\t",
        "link": "https://weibo.com/xboxcn?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》发售日确认，现已开启预购】《NBA 2K19》二十周年纪念版宣传片公布，小皇帝勒布朗·詹姆斯成为封面颜值担当。《NBA 2K19》二十周年纪念版，将于9月7日登陆Xbox One, 标准版则将于9月11日发售，预购二十周年纪念版的玩家（预购地址：网页链接），可以获得詹姆斯主题道具以及一 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发7",
        "comments": "评论18",
        "love": "46",
        "dateTime": "2018-06-06 09:38"
    }, {
        "name": "体育游戏之家\t",
        "link": "https://weibo.com/u/6361271435?refer_flag=1001030103_",
        "comment": "《2K19》公布了詹姆斯作为封面的宣传照，背景中可以看到“皇帝”、“史上最佳”等字样；随后BR恶搞了JR史密斯的2K封面照，后面的文字是\"别犹豫，赶紧投”、“我知道比分是平局”等#NBA总决赛# 最好玩的NBA手游了解一下：网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "7",
        "dateTime": "2018-06-06 09:30"
    }, {
        "name": "pkacc014_dh",
        "link": "https://weibo.com/u/6413724273?refer_flag=1001030103_",
        "comment": "发布了头条文章：《勒布朗成NBA 2K19封面人物 这次他能打破魔咒么?》 |勒布朗成NB... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 09:27"
    }, {
        "name": "一月的顽石",
        "link": "https://weibo.com/u/1569695082?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "游玩社长\t",
        "link": "https://weibo.com/H1Z1zx?refer_flag=1001030103_",
        "comment": "昨日2K正式公布了《NBA 2K19》二十周年纪念版，勒布朗·詹姆斯成为封面球星。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-06 09:07"
    }, {
        "name": "_朱丽叶的爸爸\t",
        "link": "https://weibo.com/535567949?refer_flag=1001030103_",
        "comment": "我没钱！！！！//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "爆棚体育视频\t",
        "link": "https://weibo.com/u/6425158495?refer_flag=1001030103_",
        "comment": "#六眼飞鱼# NBA2K19官方正式宣布了他们的封面代言人——骑士后卫JR·史密斯。此前，JR从没登上过2K系列封面。2K19将在9月8发售，也就是JR生日的前一天。总决赛G1，JR上场39分钟，10投3中，其中3分球6投2中，得到10分6篮板2助攻。在常规时间最后时刻，抢下了重要的进攻篮板！@六眼飞鱼节目组 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论5",
        "love": "13",
        "dateTime": "2018-06-06 08:50"
    }, {
        "name": "善良的一个固执的大哥",
        "link": "https://weibo.com/u/6102747646?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！作为20周年版本，2K19将在9月8日发售。老詹曾当选过2K14封面人物。 ​​​ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 08:49"
    }, {
        "name": "我爱科比论坛\t",
        "link": "https://weibo.com/ilkers?refer_flag=1001030103_",
        "comment": "詹姆斯成为NBA 2K19游戏的封面人物\n然后有人恶搞了JR ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论6",
        "love": "13",
        "dateTime": "2018-06-06 08:40"
    }, {
        "name": "K者超",
        "link": "https://weibo.com/u/2892240921?refer_flag=1001030103_",
        "comment": "詹姆斯不是14封面吗？怎么19也是《勒布朗·詹姆斯成《NBA 2K19》封面人物！9月7日将登录XB1/PS4/NS/PC平台》国外零售商近日泄露了《NBA 2K19》封面宣传图，NBA传奇勒布朗第二次成为这款系列游戏的封面。网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 08:31"
    }, {
        "name": "阿芈家的金毛",
        "link": "https://weibo.com/jinnisama?refer_flag=1001030103_",
        "comment": "03黄金一代的詹姆斯怎么小时候就喜欢玩05年成立的2k sports的游戏？//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "AJ球鞋代购之人称江小都\t",
        "link": "https://weibo.com/thefure?refer_flag=1001030103_",
        "comment": "2k19@NBA ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 08:10"
    }, {
        "name": "微观篮球\t",
        "link": "https://weibo.com/u/5635855696?refer_flag=1001030103_",
        "comment": "#詹姆斯NBA 2K19封面#JR再次躺枪詹姆斯当选2K19二十周年纪念版封面人物B/R出击恶搞JR史密斯#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论12",
        "love": "65",
        "dateTime": "2018-06-06 07:09"
    }, {
        "name": "祁娥安Simon\t",
        "link": "https://weibo.com/524930012?refer_flag=1001030103_",
        "comment": "#NBA资讯# NBA 2K19官方推特在今天正式宣布了他们的封面代言人——骑士前锋勒布朗-詹姆斯。此前，詹姆斯曾当选2K14的封面人物。在官方发布的游戏封面中，展示了一系列由詹姆斯亲自挑选、对其有特殊意义的词汇。2K19将在9月8日发售。\n本赛季常规赛，詹姆斯场均出场36.9分钟，得到27.5分8.6篮板9.1助攻； ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论8",
        "love": "5",
        "dateTime": "2018-06-06 06:29"
    }, {
        "name": "flb1h",
        "link": "https://weibo.com/316236923?refer_flag=1001030103_",
        "comment": "//@PlayStation中国:《NBA 2K19》将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。这个夏天，你准备好了吗？",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "用户5650440830",
        "link": "https://weibo.com/u/5650440830?refer_flag=1001030103_",
        "comment": "#企鹅直播#《篮球晚报：一哥膝盖疼痛消失计划复出 LBJ将成2K19封面》网页链接免费观看NBA比赛，实时获取最新报道，尽在@企鹅直播 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 05:52"
    }, {
        "name": "灌篮大风车\t",
        "link": "https://weibo.com/u/6090644987?refer_flag=1001030103_",
        "comment": "#NBA#詹姆斯当选2K19封面，伊戈达拉有望G3复出 灌篮大风车... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "1",
        "dateTime": "2018-06-06 02:19"
    }, {
        "name": "篮球大片\t",
        "link": "https://weibo.com/u/2670184211?refer_flag=1001030103_",
        "comment": "詹姆斯将成为篮球游戏NBA2K19的封面人物。作为20周年版本，2K19将在9月8日发售。而詹姆斯曾当选2K14的封面人物。那年詹姆斯离开热火加盟骑士。 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论7",
        "love": "18",
        "dateTime": "2018-06-06 02:01"
    }, {
        "name": "篮球微动态\t",
        "link": "https://weibo.com/577802222?refer_flag=1001030103_",
        "comment": "NBA 2K19在今天正式宣布了他们的二十周年纪念版游戏封面代言人——勒布朗-詹姆斯 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "7",
        "dateTime": "2018-06-06 01:50"
    }, {
        "name": "KIKS官方微博\t",
        "link": "https://weibo.com/newsize?refer_flag=1001030103_",
        "comment": "#KIKS定番# 官宣：勒布朗.詹姆斯成为 NBA 2K19 封面人物！ ​",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论16",
        "love": "97",
        "dateTime": "2018-06-06 01:28"
    }, {
        "name": "一墨眉无锋一",
        "link": "https://weibo.com/u/5140181350?refer_flag=1001030103_",
        "comment": "@和谐昵称 好玩不//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "终有停息之时雨",
        "link": "https://weibo.com/u/3822702047?refer_flag=1001030103_",
        "comment": "@Uheroooo 买就完事儿了//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "",
        "dateTime": ""
    }, {
        "name": "柯老大大大",
        "link": "https://weibo.com/u/3570509781?refer_flag=1001030103_",
        "comment": "看来我的Switch买值了 可惜毕业回国前玩不到//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "缩在窝里哒栗安",
        "link": "https://weibo.com/u/2144425570?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "Alexhugh",
        "link": "https://weibo.com/u/6056410538?refer_flag=1001030103_",
        "comment": "#企鹅直播#《篮球晚报：一哥膝盖疼痛消失计划复出 LBJ将成2K19封面》网页链接免费观看NBA比赛，实时获取最新报道，尽在@企鹅直播 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-06 00:01"
    }, {
        "name": "鞋吧Sneakersbar\t",
        "link": "https://weibo.com/sneakersbar?refer_flag=1001030103_",
        "comment": "NBA 2K19\n\n晚安#午夜壁纸# ​",
        "save": "收藏",
        "repost": "转发15",
        "comments": "评论21",
        "love": "363",
        "dateTime": "2018-06-06 00:00"
    }, {
        "name": "安东得咙冬咚咚咚",
        "link": "https://weibo.com/u/2710752040?refer_flag=1001030103_",
        "comment": "//@重獸乐队_趴趴熊猫:冲着封面，我也得买一个！！//@NintendoSwitch: 《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": ""
    }, {
        "name": "重獸乐队_趴趴熊猫\t",
        "link": "https://weibo.com/519840120?refer_flag=1001030103_",
        "comment": "冲着封面，我也得买一个！！//@NintendoSwitch: 《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "1",
        "dateTime": ""
    }, {
        "name": "Vince_龗少\t",
        "link": "https://weibo.com/u/1830230124?refer_flag=1001030103_",
        "comment": "一句话别买国行版//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "山口组芹泽多摩雄",
        "link": "https://weibo.com/weedxxxx?refer_flag=1001030103_",
        "comment": "2K19封面人物——勒布朗-詹姆斯！ ​​​ 倾骑所有#NBA##whateverittakes# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "7",
        "dateTime": "2018-06-05 23:47"
    }, {
        "name": "b站搜索i威少",
        "link": "https://weibo.com/u/5399638842?refer_flag=1001030103_",
        "comment": "NBA 2K19官方推特在今天正式宣布了他们的封面代言人——骑士前锋勒布朗-詹姆斯 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-05 23:43"
    }, {
        "name": "赛客篮球CIKERS\t",
        "link": "https://weibo.com/u/6340916939?refer_flag=1001030103_",
        "comment": "詹姆斯正式成为NBA 2K19 20周年特别版封面  ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 23:39"
    }, {
        "name": "小黑盒官博娘\t",
        "link": "https://weibo.com/u/5732710487?refer_flag=1001030103_",
        "comment": "#nba2k19# 【今日2K正式公布了《NBA 2K19》二十周年纪念版，勒布朗·詹姆斯成为封面球星】《NBA 2K19》二十周年纪念版由Visual Concepts开发，将于2018年9月7日以数字版和实体版同时在Xbox One、PS4和Switch平台，以数字版在PC平台全球首发。《NBA 2K19》标准版将于2018年9月11日在Xbox One、PS4、Switc ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-05 23:39"
    }, {
        "name": "-九九归一\t",
        "link": "https://weibo.com/XYZ071316?refer_flag=1001030103_",
        "comment": "#詹姆斯NBA 2K19封面# \n@付允寒_ @un句号 讲真，我真的真的希望他离开骑士了 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论8",
        "love": "5",
        "dateTime": "2018-06-05 23:36"
    }, {
        "name": "勒布朗图汇\t",
        "link": "https://weibo.com/235075234?refer_flag=1001030103_",
        "comment": "NBA 2K19邀请2 Chainz，Rapsody，Jerreau一起带来的新曲《How Could They Have Known?》 勒布朗图汇... ​",
        "save": "收藏",
        "repost": "转发41",
        "comments": "评论3",
        "love": "114",
        "dateTime": "2018-06-05 23:35"
    }, {
        "name": "人間體卡卡羅特\t",
        "link": "https://weibo.com/zxsdxc8?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "篮球大片\t",
        "link": "https://weibo.com/u/2670184211?refer_flag=1001030103_",
        "comment": "NBA 2K19在今天正式宣布了他们的二十周年纪念版游戏封面代言人——骑士前锋勒布朗-詹姆斯。 在官方发布的游戏封面中，展示了一系列由詹姆斯亲自挑选、对他具有特殊意义的词汇。\n詹姆斯在一份个人声明中说道：“我十分荣幸能够成为二十周年纪念版封面人物，这是我从小就热爱的一款游戏。我们在封面设计 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论4",
        "love": "18",
        "dateTime": "2018-06-05 23:25"
    }, {
        "name": "光影伴我飞\t",
        "link": "https://weibo.com/bevisx?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》官方公布发售消息 恭喜詹姆斯再次喜提封面人物》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "",
        "dateTime": "2018-06-05 23:20"
    }, {
        "name": "南瓜头-leehom\t",
        "link": "https://weibo.com/wangtao121?refer_flag=1001030103_",
        "comment": "#5日NBA头条：詹姆斯当选2K19封面 伊戈达拉有望G3复出# @腾讯视频 5日NBA头条... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 23:06"
    }, {
        "name": "zoom桂\t",
        "link": "https://weibo.com/u/3156991882?refer_flag=1001030103_",
        "comment": "买！//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "Gamepoch星游纪\t",
        "link": "https://weibo.com/gamepoch?refer_flag=1001030103_",
        "comment": "期待回顾大作！//@木木竖竖竖: 二十周年了，我也玩了十九年。。是时候暑期找个时间做个回顾吧…//@PlayStation中国:《NBA 2K19》将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。这个夏天，你准备好了吗？",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "2",
        "dateTime": ""
    }, {
        "name": "口袋村的大猫\t",
        "link": "https://weibo.com/canselwicecs?refer_flag=1001030103_",
        "comment": "每年的封面毒奶//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "易体网\t",
        "link": "https://weibo.com/iyiti?refer_flag=1001030103_",
        "comment": "在NBA 2K19 二十周年纪念版中，勒布朗詹姆斯的话意义深远(同步自@新浪看点)|在NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 22:49"
    }, {
        "name": "特立独行的boy丶",
        "link": "https://weibo.com/u/6510049434?refer_flag=1001030103_",
        "comment": "2K19 老詹\n供众号 NBA高清图片墙 \n获取更多 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-05 22:45"
    }, {
        "name": "网易爱玩\t",
        "link": "https://weibo.com/game163?refer_flag=1001030103_",
        "comment": "NBA2K系列的最新作《NBA 2K19》的20周年纪念版公布，勒布朗·詹姆斯为封面球星。游戏将于2018年9月11日在Xbox One、PS4、Switch和PC平台发售。 网易爱玩的... ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论2",
        "love": "15",
        "dateTime": "2018-06-05 22:32"
    }, {
        "name": "闭嘴快插眼",
        "link": "https://weibo.com/u/5242400000?refer_flag=1001030103_",
        "comment": "期待国行//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "love火箭\t",
        "link": "https://weibo.com/loverockets?refer_flag=1001030103_",
        "comment": "再来看看另一版的2K19封面#图说NBA# ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论15",
        "love": "49",
        "dateTime": "2018-06-05 22:22"
    }, {
        "name": "eekerr",
        "link": "https://weibo.com/u/3161590655?refer_flag=1001030103_",
        "comment": "买买买，刚买了红帽子奥德赛。//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "准者篮球训练营\t",
        "link": "https://weibo.com/u/5661950872?refer_flag=1001030103_",
        "comment": "NBA 2K19最新宣传片 - 《How Could They Have Known》，詹皇再次成为封面主角！不过你还记得2k封面的魔咒吗 准者篮球训... ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论5",
        "love": "4",
        "dateTime": "2018-06-05 22:05"
    }, {
        "name": "SIZE尺码\t",
        "link": "https://weibo.com/isize?refer_flag=1001030103_",
        "comment": "勒布朗·詹姆斯登上《2k19》20周年纪念版封面！在0:2落后的情况下，他能否带领球队力挽狂澜？金州四虎又能否进一步接近奥布莱恩杯？让我们拭目以待，聚焦NBA总决赛第三场！ ​​​",
        "save": "收藏",
        "repost": "转发9",
        "comments": "评论13",
        "love": "86",
        "dateTime": "2018-06-05 22:03"
    }, {
        "name": "沈樑shenliang\t",
        "link": "https://weibo.com/270955112?refer_flag=1001030103_",
        "comment": "想买台Switch了，想玩的游戏你都有，而且还随时随地都可以玩//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论2",
        "love": "",
        "dateTime": ""
    }, {
        "name": "迟一苇",
        "link": "https://weibo.com/u/5436695647?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "杉果娘Sonkwo\t",
        "link": "https://weibo.com/sonkwogame?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》首支预告片公布】2K公布了NBA2K系列的最新作《NBA 2K19》的20周年纪念版，勒布朗·詹姆斯为封面球星。《NBA 2K19》将于2018年9月11日在Xbox One、PS4、Switch和PC平台全球发售，预购可以4天提前进入游戏。 杉果娘Sonk... ​",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论9",
        "love": "22",
        "dateTime": "2018-06-05 21:56"
    }, {
        "name": "赵璞\t",
        "link": "https://weibo.com/jackychar?refer_flag=1001030103_",
        "comment": " 赵璞说 詹姆斯成了NBA 2K19的封面人物。2K系列的封面最近五六年可也是原装正版黑洞啊，除了16年的三星封面，其他几年的詹姆斯、杜兰特、保罗·乔治、欧文，但凡上封面，不出两年必转会。估计骑士球迷要哭晕在厕所了。。。 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论24",
        "love": "13",
        "dateTime": "2018-06-05 21:55"
    }, {
        "name": "refinery29\t",
        "link": "https://weibo.com/refinery29?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》系列游戏20周年纪念版正式发布，詹姆斯担任封面球星】 “今年是Visual Concepts工作室成立三十周年，同时也是《NBA2K》系列游戏问世二十周年的日子，所以能和本世代最具标志性的球星勒布朗詹姆斯一起合作纪念这一里程碑，我认为意义非凡，”NBA2K全球营销副总裁Alfie Brody说，“ ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 21:54"
    }, {
        "name": "兴爷\t",
        "link": "https://weibo.com/32226393?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "伊姆卡来吃蘑菇嘛",
        "link": "https://weibo.com/u/2885843974?refer_flag=1001030103_",
        "comment": "@luvian丶露 阿爸我要三个平台买三份！//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "我们都是球鞋控\t",
        "link": "https://weibo.com/cnsneakers?refer_flag=1001030103_",
        "comment": "NBA 2K19 封面人物：LeBron James  \n‏\n NBA 2K19 ​",
        "save": "收藏",
        "repost": "转发7",
        "comments": "评论10",
        "love": "122",
        "dateTime": "2018-06-05 21:44"
    }, {
        "name": "封印解除啊co",
        "link": "https://weibo.com/u/5949248559?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "新浪体育\t",
        "link": "https://weibo.com/sportschannel?refer_flag=1001030103_",
        "comment": "今日2K正式公布了《NBA 2K19》二十周年纪念版，勒布朗·詹姆斯成为封面球星。《NBA 2K19》二十周年纪念版由Visual Concepts开发，将于2018年9月7日以数字版和实体版同时在Xbox One、PS4和Switch平台，以数字版在PC平台全球首发。你准备好入手了吗新浪游戏的... ​",
        "save": "收藏",
        "repost": "转发93",
        "comments": "评论55",
        "love": "190",
        "dateTime": "2018-06-05 21:43"
    }, {
        "name": "Walkhorseee\t",
        "link": "https://weibo.com/u/5613890506?refer_flag=1001030103_",
        "comment": "老詹封面啊，这不是逼我买典藏版嘛//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "新浪游戏\t",
        "link": "https://weibo.com/517656716?refer_flag=1001030103_",
        "comment": "今日2K正式公布了《NBA 2K19》二十周年纪念版，勒布朗·詹姆斯成为封面球星。《NBA 2K19》二十周年纪念版由Visual Concepts开发，将于2018年9月7日以数字版和实体版同时在Xbox One、PS4和Switch平台，以数字版在PC平台全球首发。 新浪游戏的... ​",
        "save": "收藏",
        "repost": "转发30",
        "comments": "评论15",
        "love": "75",
        "dateTime": "2018-06-05 21:39"
    }, {
        "name": "青年小田儿",
        "link": "https://weibo.com/tml14?refer_flag=1001030103_",
        "comment": "还有四个月，箭在弦上//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "不知名的码农",
        "link": "https://weibo.com/u/2132045724?refer_flag=1001030103_",
        "comment": "18生涯模式还没到90能力值//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "树荫蘑菇",
        "link": "https://weibo.com/u/3215492405?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "鞋会\t",
        "link": "https://weibo.com/525832012?refer_flag=1001030103_",
        "comment": "NBA 2K19\n\nLeBron James \n\n视频还是很带感的！ 鞋会的秒拍... ​",
        "save": "收藏",
        "repost": "转发56",
        "comments": "评论14",
        "love": "117",
        "dateTime": "2018-06-05 21:32"
    }, {
        "name": "香港新浪遊戲\t",
        "link": "https://weibo.com/sinahkgame?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》正式公佈！詹姆斯擔任紀念版封面球星】今日2K正式公佈了《NBA2K19》二十週年紀念版，勒布朗・詹姆斯成為封面球星。网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "",
        "dateTime": "2018-06-05 21:30"
    }, {
        "name": "范特西JAM",
        "link": "https://weibo.com/u/2755932461?refer_flag=1001030103_",
        "comment": "厉害了我的詹//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "任天堂switch情报小站",
        "link": "https://weibo.com/u/6112951204?refer_flag=1001030103_",
        "comment": "NBA 2K19 标准版将于 2018 年 9 月 11 日在 Xbox One，PlayStation4，Nintendo Switch，Windows PC 平台上全球首发。",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": ""
    }, {
        "name": "zhou-syyyy\t",
        "link": "https://weibo.com/u/5970935509?refer_flag=1001030103_",
        "comment": "💯💯//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "丁哥篮球",
        "link": "https://weibo.com/u/6525054530?refer_flag=1001030103_",
        "comment": "NBA: 詹姆斯成为2k19的封面人物, 或被交易到火箭(同步自@新浪看点)|NBA: 詹姆... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 21:23"
    }, {
        "name": "一个善良小伙",
        "link": "https://weibo.com/heyannanhai?refer_flag=1001030103_",
        "comment": "詹姆斯正式成为NBA 2K19 20周年特别版封面 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 21:22"
    }, {
        "name": "浪玩堂\t",
        "link": "https://weibo.com/pcvg?refer_flag=1001030103_",
        "comment": "今日2K正式公布了《NBA 2K19》二十周年纪念版，勒布朗·詹姆斯成为封面球星。\n\n“今年是Visual Concepts工作室成立三十周年，同时也是《NBA2K》系列游戏问世二十周年的日子，所以能和本世代最具标志性的球星勒布朗·詹姆斯一起合作纪念这一里程碑，我认为意义非凡，”NBA2K全球营销副总裁Alfie Brody说。 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发9",
        "comments": "评论8",
        "love": "23",
        "dateTime": "2018-06-05 21:21"
    }, {
        "name": "用户5528582830",
        "link": "https://weibo.com/u/5528582830?refer_flag=1001030103_",
        "comment": "买不买呢//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "铭哥32\t",
        "link": "https://weibo.com/u/3266970384?refer_flag=1001030103_",
        "comment": "#詹姆斯NBA 2K19封面#",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "铭哥32\t",
        "link": "https://weibo.com/u/3266970384?refer_flag=1001030103_",
        "comment": "#詹姆斯NBA 2K19封面#",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "BEGATA贝吉塔",
        "link": "https://weibo.com/u/2479920403?refer_flag=1001030103_",
        "comment": "❤️//@PlayStation中国:《NBA 2K19》将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。这个夏天，你准备好了吗？",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "柠檬酱huuuuu\t",
        "link": "https://weibo.com/ninatou?refer_flag=1001030103_",
        "comment": "哇//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "HYPEBEAST時尚生活雜誌\t",
        "link": "https://weibo.com/hypebeastweibo?refer_flag=1001030103_",
        "comment": "【官方宣布 LeBron James 将担任《NBA 2K19》封面人物】2K Games 今日宣布 LeBron 将再次担任《NBA 2K19》封面人物，本季 33 岁高龄的 LeBron James 持续缴出统治级的球场表现，二度上榜依旧能让球迷们心服口服，但「皇帝」是否会延续前几年的封面人物换队魔咒呢？详情请点击：网页链接 ​",
        "save": "收藏",
        "repost": "转发11",
        "comments": "评论12",
        "love": "42",
        "dateTime": "2018-06-05 21:16"
    }, {
        "name": "油菜花的阿沾",
        "link": "https://weibo.com/u/3443816014?refer_flag=1001030103_",
        "comment": "//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "Wuluuuuuu",
        "link": "https://weibo.com/u/1970167123?refer_flag=1001030103_",
        "comment": "买还不行吗//@NintendoSwitch:《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "NintendoSwitch\t",
        "link": "https://weibo.com/NintendoSwitch?refer_flag=1001030103_",
        "comment": "《NBA 2K19》将于 9 月 11 日登陆 Nintendo Switch.",
        "save": "收藏",
        "repost": "转发30",
        "comments": "评论45",
        "love": "61",
        "dateTime": ""
    }, {
        "name": "看球说\t",
        "link": "https://weibo.com/u/6562792882?refer_flag=1001030103_",
        "comment": "2K官方宣布，詹姆斯将成为成为2K19封面人物。\n恭喜詹皇，季后詹让人无话可说！ NBA总决赛 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-05 21:12"
    }, {
        "name": "铭哥32\t",
        "link": "https://weibo.com/u/3266970384?refer_flag=1001030103_",
        "comment": "#詹姆斯NBA 2K19封面#",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "KEYbasara",
        "link": "https://weibo.com/ORAORAORAORA?refer_flag=1001030103_",
        "comment": "不知道19的生涯模式怎么样//@PlayStation中国:《NBA 2K19》将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。这个夏天，你准备好了吗？",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "3",
        "dateTime": ""
    }, {
        "name": "铭哥32\t",
        "link": "https://weibo.com/u/3266970384?refer_flag=1001030103_",
        "comment": "#詹姆斯NBA 2K19封面#",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "雾栖Kirisu",
        "link": "https://weibo.com/u/1957297097?refer_flag=1001030103_",
        "comment": "惊了，怎么就20周年了，最早玩的也就live2004…//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "篮球技巧教学\t",
        "link": "https://weibo.com/physicalinformation?refer_flag=1001030103_",
        "comment": "詹姆斯正式成为NBA 2K19 20周年特别版封面 #NBA# ​",
        "save": "收藏",
        "repost": "转发21",
        "comments": "评论30",
        "love": "246",
        "dateTime": "2018-06-05 21:04"
    }, {
        "name": "A9VG\t",
        "link": "https://weibo.com/a9vg?refer_flag=1001030103_",
        "comment": "预购《NBA 2K19 20周年纪念版》可提前四天游玩本作，同时获得100000 VC、50000 MyTEAM点数、20个MyTEAM联盟卡包、10个MyTEAM卡包、MyPLAYER LeBron主题数字道具等。实体版中还有海报、贴纸、腕带。内容一览→|《NBA 2K19...",
        "save": "收藏",
        "repost": "转发9",
        "comments": "评论7",
        "love": "3",
        "dateTime": ""
    }, {
        "name": "电玩橙子TGchengzi\t",
        "link": "https://weibo.com/dwcz?refer_flag=1001030103_",
        "comment": "今日2K正式公布篮球大作《NBA 2K19》将于9月7日发售二十周年纪念版，封面由NBA最具统治力的球星勒布朗詹姆斯担任，《NBA 2K19》标准版将于9月11日发售，两个版本分别登陆PS4,XB1,Switch平台，并且《NBA 2K19》国行版本确认继续由星游纪在中国发行，对于是否可以与国外版本同步发售，敬请期待我们后续的 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-05 21:00"
    }, {
        "name": "牧笛横吹26",
        "link": "https://weibo.com/u/5266666017?refer_flag=1001030103_",
        "comment": "@哲基尔的日常 是不是该准备预订了//@PlayStation中国:《NBA 2K19》将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。这个夏天，你准备好了吗？",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "",
        "dateTime": ""
    }, {
        "name": "Creative短片",
        "link": "https://weibo.com/hzwpf?refer_flag=1001030103_",
        "comment": "《NBA 2K19》主题曲 手机黑科技...（分享自@秒拍）下载猛戳：网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 20:59"
    }, {
        "name": "花折临夕Hanaori\t",
        "link": "https://weibo.com/hanaori0619?refer_flag=1001030103_",
        "comment": "哇//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "PlayStation中国\t",
        "link": "https://weibo.com/playstationchina?refer_flag=1001030103_",
        "comment": "《NBA 2K19》将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。这个夏天，你准备好了吗？",
        "save": "收藏",
        "repost": "转发17",
        "comments": "评论32",
        "love": "42",
        "dateTime": ""
    }, {
        "name": "NintendoSwitch\t",
        "link": "https://weibo.com/NintendoSwitch?refer_flag=1001030103_",
        "comment": "《NBA 2K19》确认登陆 Nintendo Switch，此次封面球员是勒布朗·詹姆斯。\n今年是《NBA 2K》系列正式登场的第二十个年头，为了纪念，原来的黄金版也改名为「二十周年纪念版(20th Anniversary Edition)」。\n本作将于 9 月 11 日发售，标准版 59.99 美元，「二十周年纪念版」99.99 美元。\n购买「二十周年纪 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发42",
        "comments": "评论93",
        "love": "77",
        "dateTime": "2018-06-05 20:58"
    }, {
        "name": "顾丑_丑\t",
        "link": "https://weibo.com/worldofwjj?refer_flag=1001030103_",
        "comment": "//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "蒙埃布塔塔\t",
        "link": "https://weibo.com/u/2261574823?refer_flag=1001030103_",
        "comment": "//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "STN工作室\t",
        "link": "https://weibo.com/stanleyreport?refer_flag=1001030103_",
        "comment": "2K公布《NBA 2K19》二十周年纪念版游戏宣传片，购买二十周年纪念版将会获得10万游戏币，5万点MyTeam积分，20个MyTeam联盟包（每周交付一个），此外实体盘还会赠送一张《NBA 2K19》詹姆斯封面海报、一份NBA 2K贴纸以及一个詹姆斯选出的单词的定制腕带。ps：二十周年纪念版售价99.99美元。 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发8",
        "comments": "评论20",
        "love": "101",
        "dateTime": "2018-06-05 20:54"
    }, {
        "name": "I3PROMISE",
        "link": "https://weibo.com/u/3090706122?refer_flag=1001030103_",
        "comment": "这个封面就很灵性 网页链接 //@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "今井小宇宙\t",
        "link": "https://weibo.com/brut?refer_flag=1001030103_",
        "comment": "//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "MJ_Carson\t",
        "link": "https://weibo.com/mjcarson?refer_flag=1001030103_",
        "comment": "NBA 2K19预告片，王者归来！ MJ_Carson... ​",
        "save": "收藏",
        "repost": "转发70",
        "comments": "评论19",
        "love": "113",
        "dateTime": "2018-06-05 20:51"
    }, {
        "name": "__謝rtan\t",
        "link": "https://weibo.com/u/2622155715?refer_flag=1001030103_",
        "comment": "肯定买//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "游侠网官方微博\t",
        "link": "https://weibo.com/ali213?refer_flag=1001030103_",
        "comment": "《NBA 2K19》来了！期待！",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "3",
        "dateTime": ""
    }, {
        "name": "无限海胆\t",
        "link": "https://weibo.com/337338777?refer_flag=1001030103_",
        "comment": "成了//@机核网: 《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "YJ_nnnnn\t",
        "link": "https://weibo.com/u/2101707401?refer_flag=1001030103_",
        "comment": "//@机核网:《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": ""
    }, {
        "name": "机核网\t",
        "link": "https://weibo.com/gamecore?refer_flag=1001030103_",
        "comment": "《NBA 2K19》要来了",
        "save": "收藏",
        "repost": "转发13",
        "comments": "评论19",
        "love": "25",
        "dateTime": ""
    }, {
        "name": "二柄主机游戏APP\t",
        "link": "https://weibo.com/erbingapp?refer_flag=1001030103_",
        "comment": "NBA 2K官方刚刚公布了《NBA 2K19》20周年纪念版的封面以及版本信息，克利夫兰骑士队当家球星勒布朗·詹姆斯将成为该版本的封面人物，而游戏普通版的封面则多年来首次使用了手绘的篮球战术板。根据游戏官网提供的情报，预购普通版的玩家将可以获得5000VC点数、10个MT联盟包（每周一个）、以及一个封面球 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发12",
        "comments": "评论11",
        "love": "22",
        "dateTime": "2018-06-05 20:50"
    }, {
        "name": "游侠网官方微博\t",
        "link": "https://weibo.com/ali213?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》发售时间公布】《NBA 2K19》二十周年纪念版将在2018年9月7日以数字版和实体版同时在Xbox One，PS4，NS平台，以数字版在Windows PC平台全球首发。《NBA 2K19》标准版将于2018年9月11日在Xbox One，PS4，NS，Windows PC平台上全球首发。《NBA 2K19》PS国行版由星游纪在中国发行。 ​",
        "save": "收藏",
        "repost": "转发5",
        "comments": "评论4",
        "love": "13",
        "dateTime": "2018-06-05 20:49"
    }, {
        "name": "NS新闻速报\t",
        "link": "https://weibo.com/u/6247019417?refer_flag=1001030103_",
        "comment": "《NBA 2K19》正式官宣，将于9月11日发售。\n购买20周年豪华版（99.99美金）的玩家可以提前4天（9月7日）享受游戏，当然也有很多点数，金币之类的赠品。\n这次2K选择了宣传图只放出一个脑袋，不用担心去年临时换队的问题了。 ​",
        "save": "收藏",
        "repost": "转发21",
        "comments": "评论39",
        "love": "69",
        "dateTime": "2018-06-05 20:48"
    }, {
        "name": "MJ_Carson\t",
        "link": "https://weibo.com/mjcarson?refer_flag=1001030103_",
        "comment": "官宣：詹姆斯正式成为NBA 2K19 20周年特别版封面 ​",
        "save": "收藏",
        "repost": "转发10",
        "comments": "评论19",
        "love": "142",
        "dateTime": "2018-06-05 20:46"
    }, {
        "name": "篮球必修课\t",
        "link": "https://weibo.com/u/3732856997?refer_flag=1001030103_",
        "comment": "詹姆斯将登上NBA 2K19封面！而NBA 2K游戏一直存在着一个“魔咒”，那就是登上封面的球员基本都会离开原来的球队,比如2K14的詹姆斯、2K15的杜兰特、2K17的保罗-乔治、2K18的欧文，所以这一次老詹能不能打破这个魔咒 詹姆斯#NBA# ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论3",
        "love": "2",
        "dateTime": "2018-06-05 20:40"
    }, {
        "name": "鞋狂\t",
        "link": "https://weibo.com/u/6355176023?refer_flag=1001030103_",
        "comment": "【詹姆斯将成NBA2K19封面】国外零售商泄露了《NBA 2K19》的封面宣传图，骑士球员勒布朗·詹姆斯喜上封面。但是，还记得2K系列封面人物的魔咒的吗？ ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论3",
        "love": "5",
        "dateTime": "2018-06-05 20:40"
    }, {
        "name": "3DMGAME官方微博\t",
        "link": "https://weibo.com/3dmgame?refer_flag=1001030103_",
        "comment": "【2K正式公布《NBA 2K19》 二十周年纪念版封面由勒布朗·詹姆斯担任】今天 2K 宣布 NBA2K 将会以3次NBA总决赛冠军，4次NBA MVP以及NBA2K游戏忠实拥趸的勒布朗詹姆斯作为NBA 2K19 二十周年纪念版的封面球星。\n这次的封面通过勒布朗詹姆斯亲自挑选的一些生动的关键词表现出了阿克伦最挚爱的孩子的心路历程 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发11",
        "comments": "评论8",
        "love": "29",
        "dateTime": "2018-06-05 20:39"
    }, {
        "name": "Gamepoch星游纪\t",
        "link": "https://weibo.com/gamepoch?refer_flag=1001030103_",
        "comment": "发布了头条文章：《在NBA 2K19 二十周年纪念版中，勒布朗詹姆斯的话意义深远》 |在NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发216",
        "comments": "评论67",
        "love": "107",
        "dateTime": "2018-06-05 20:39"
    }, {
        "name": "天空-血影无痕\t",
        "link": "https://weibo.com/206222688?refer_flag=1001030103_",
        "comment": "年货又快要上市了！NBA 2K19官方推特在今天正式宣布了他们的封面代言人 — 勒布朗-詹姆斯。9月8日发售。#NBA2K19# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 20:39"
    }, {
        "name": "全国大学生院系篮球挑战赛\t",
        "link": "https://weibo.com/u/6201046902?refer_flag=1001030103_",
        "comment": "#全国大学生院系篮球挑战赛# 詹姆斯将当选《NBA 2k19》封面人物，作为车枪类型的体育游戏，《NBA 2k19》将登陆switch，九月发售标准版。作为20周年系列的封面人物，传奇老詹可以说是当之无愧的人选～@詹姆斯吧官方微博@詹姆斯官方微博@NBA @IT之家@金州勇士@新浪NBA@NIKE@Nikestore@勒布朗图汇@微博NBA ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 20:19"
    }, {
        "name": "游侠网官方微博\t",
        "link": "https://weibo.com/ali213?refer_flag=1001030103_",
        "comment": "《NBA 2K19》20周年封面图公布，机智的一匹 ​",
        "save": "收藏",
        "repost": "转发7",
        "comments": "评论10",
        "love": "16",
        "dateTime": "2018-06-05 20:18"
    }, {
        "name": "XBOX-SKYER\t",
        "link": "https://weibo.com/xboxsky?refer_flag=1001030103_",
        "comment": "2K Sports 公布了 NBA 2K19 封面明星是 LeBron James。游戏将在 9 月 11 日发售。\nPloygon：网页链接 ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论4",
        "love": "5",
        "dateTime": "2018-06-05 20:16"
    }, {
        "name": "流浪的逆光奔跑",
        "link": "https://weibo.com/u/6505677416?refer_flag=1001030103_",
        "comment": "转让商业保理公司，转让保理公司股权 戴文龙 <<151-2OO7-1827>> 就算你满身荆棘如刺猬，仍有我伸手拥你无忌讳。\n\n转让商业保理公司，转让保理公司股权 戴文龙 <<151-2OO7-1827>> 就算你满身荆棘如刺猬，仍有我伸手拥你无忌讳。\n\n转让商业保理公司，转让保理公司股权 戴文龙 <<151-2OO7-1827>> 就算你满 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 20:14"
    }, {
        "name": "granite84062",
        "link": "https://weibo.com/u/6453466434?refer_flag=1001030103_",
        "comment": "木南日菜身材最好真田春香四个人对慧聪网的评价网页链接 织田真子在线观看Xplay 男妇科医生日记小说 美女大胆尿尿 詹姆斯NBA 2K19封面 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 20:13"
    }, {
        "name": "FREEHDNBA\t",
        "link": "https://weibo.com/FreeHDNBA?refer_flag=1001030103_",
        "comment": "NBA 2K19 —— How Could They Have Known? FREEHDNBA... ​",
        "save": "收藏",
        "repost": "转发31",
        "comments": "评论2",
        "love": "46",
        "dateTime": "2018-06-05 20:11"
    }, {
        "name": "A9VG\t",
        "link": "https://weibo.com/a9vg?refer_flag=1001030103_",
        "comment": "《NBA 2K19》“20周年版”封面放出，完美解决了詹姆斯可能会在今年夏天跳槽的隐患 ​",
        "save": "收藏",
        "repost": "转发39",
        "comments": "评论23",
        "love": "49",
        "dateTime": "2018-06-05 20:09"
    }, {
        "name": "十年青春喂了猪",
        "link": "https://weibo.com/u/5920357391?refer_flag=1001030103_",
        "comment": "#企鹅直播#《篮球晚报：一哥膝盖疼痛消失计划复出 LBJ将成2K19封面》网页链接免费观看NBA比赛，实时获取最新报道，尽在@企鹅直播 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 20:04"
    }, {
        "name": "七宝Gu酱",
        "link": "https://weibo.com/u/6069792158?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！作为20周年版本，2K19将在9月8日发售。老詹曾当选过2K14封面人物。 ​​​ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 20:00"
    }, {
        "name": "环球体育传媒_Jenny\t",
        "link": "https://weibo.com/cocokey?refer_flag=1001030103_",
        "comment": "#詹姆斯将成为《2K19》封面球员# 据美媒《Cavs Nation》报道，《NBA 2K19》将会把詹姆斯作为20周年版本封面球员。詹姆斯曾是《NBA 2K14》的封面球员，上次勒布朗成为游戏封面时还是热火的一员，当时他刚刚获得2013年总冠军，顺势成为了2K14的封面人物。在一年后，他重新回到家乡球队骑士，并帮助球队 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 18:20"
    }, {
        "name": "NOWRE现客\t",
        "link": "https://weibo.com/nowre?refer_flag=1001030103_",
        "comment": "勒布朗或将成为 NBA 2K19 封面，骑士球迷表示很担心！可怕的 “2K” 诅咒难道又要奏效了？网页链接 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论2",
        "love": "16",
        "dateTime": "2018-06-05 17:59"
    }, {
        "name": "游戏风云GameFY\t",
        "link": "https://weibo.com/gamefy?refer_flag=1001030103_",
        "comment": "勒布朗成NBA 2K19封面人物 这次他能打破魔咒么@每日游报 游戏风云Ga... ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-05 17:39"
    }, {
        "name": "新新球鞋网\t",
        "link": "https://weibo.com/xkicks?refer_flag=1001030103_",
        "comment": "【“2K” 魔咒？勒布朗或将成为 NBA 2K19 封面】骑勇大战来到第四年，无论谁会最终问鼎总冠军，有一个声音肯定是所有人都无法反驳的：勒布朗·詹姆斯是无可争议的现役第一人。今天外媒透露，勒布朗很可能将成为 NBA 2K19 的封面人物，预计会在 9 月 7 日正式发布。不过根据队伍各个人员比赛状况，不知新 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论2",
        "love": "4",
        "dateTime": "2018-06-05 17:06"
    }, {
        "name": "高山刺hL芹",
        "link": "https://weibo.com/u/6345361453?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！作为20周年版本，2K19将在9月8日发售。老詹曾当选过2K14封面人物。 ​​​ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 17:03"
    }, {
        "name": "球迷聊球\t",
        "link": "https://weibo.com/qiumiliao?refer_flag=1001030103_",
        "comment": "#球迷聊球# 勒布朗成NBA 2K19封面人物，这次他能打破魔咒么？ ​",
        "save": "收藏",
        "repost": "转发236",
        "comments": "评论17",
        "love": "133",
        "dateTime": "2018-06-05 17:03"
    }, {
        "name": "神锋费莱尼\t",
        "link": "https://weibo.com/u/5386794968?refer_flag=1001030103_",
        "comment": "#詹姆斯NBA 2K19封面# \n决定三？？实锤了。。。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 16:40"
    }, {
        "name": "篮球君爱上框\t",
        "link": "https://weibo.com/u/6169415770?refer_flag=1001030103_",
        "comment": "#NBA# 2K19封面人物—詹姆斯。据说2K有个封面定律—谁上封面谁换队。 ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 16:00"
    }, {
        "name": "游戏风云GameFY\t",
        "link": "https://weibo.com/gamefy?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》将登陆Switch主机】消息来源某零售店的广告牌，作为NBA传奇的勒布朗·詹姆斯喜上封面。从广告牌来看《NBA 2K19》可能会在9月发售，就和去年一样。该作是NBA 2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天获取游戏，即9月7日发布。标准版则为9月11日发售。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "4",
        "dateTime": "2018-06-05 14:29"
    }, {
        "name": "游走在苏非同凡响",
        "link": "https://weibo.com/u/6094584557?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！作为20周年版本，2K19将在9月8日发售。老詹曾当选过2K14封面人物。 ​​​ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 14:27"
    }, {
        "name": "播食梦者",
        "link": "https://weibo.com/u/6094865071?refer_flag=1001030103_",
        "comment": "美媒Cavs Nation报道：《NBA 2K19》将把勒布朗·詹姆斯作为20周年版本的封面球员！ ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 14:27"
    }, {
        "name": "pkacc144_wb",
        "link": "https://weibo.com/u/6413936924?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》发售日泄露 詹姆斯将坐镇封面球星》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 13:32"
    }, {
        "name": "小刚在大理\t",
        "link": "https://weibo.com/csgly?refer_flag=1001030103_",
        "comment": "詹姆斯 NBA2K19封面\n国外零售商泄露了《NBA 2K19》的封面宣传图，勒布朗·詹姆斯喜上封面。你们还记得2K系列封面人物的魔咒的吗 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-05 13:30"
    }, {
        "name": "不羁diao\t",
        "link": "https://weibo.com/BJdiao?refer_flag=1001030103_",
        "comment": "《NBA 2K19》的封面人物——勒布朗·詹姆斯，这也是詹姆斯继《NBA 2K14》后再度担任封面人物。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-05 13:23"
    }, {
        "name": "数字热DGHOT\t",
        "link": "https://weibo.com/u/5835847839?refer_flag=1001030103_",
        "comment": "詹姆斯NBA 2K19封面\n毫无违和感，老詹一直就是NBA精神和文化的象征，再次登上游戏封面也算是能让我们在未来某一天他退役后能多保存一些关于他的记忆。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-05 13:16"
    }, {
        "name": "极乐玩家-Carl\t",
        "link": "https://weibo.com/mrcarlcc?refer_flag=1001030103_",
        "comment": "《NBA 2K19》泄露！詹皇喜上封面 登陆XB1/PS4/NS/PC(同步自@新浪看点)|《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "",
        "dateTime": "2018-06-05 13:02"
    }, {
        "name": "ManBetX_Sports万博体育\t",
        "link": "https://weibo.com/u/6300868488?refer_flag=1001030103_",
        "comment": "#万博体育# #新万博manbetx# #勒布朗·詹姆斯# #NBA总决赛# \n\n【勒布朗-詹姆斯将成为2K19的封面人物】\n\n据CavsNation报道，有消息称，骑士球员勒布朗-詹姆斯将成为篮球游戏NBA2K19的封面人物。\n\n此前，詹姆斯曾当选2K14的封面人物。 ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 13:00"
    }, {
        "name": "BOOT电子竞技俱乐部\t",
        "link": "https://weibo.com/bootgaming?refer_flag=1001030103_",
        "comment": "国外零售商泄露了NBA2K系列的20周年作品《NBA 2K19》的宣传封面。\n今年的封面人物是传奇球星勒布朗·詹姆斯。\n詹皇登上如此有纪念意义的作品的宣传封面，粉丝们估计会非常开心吧~\n#nba2k19# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 12:57"
    }, {
        "name": "时代篮球\t",
        "link": "https://weibo.com/shidailanqiu?refer_flag=1001030103_",
        "comment": "詹姆斯当选2K19的封面人物\n詹姆斯（热火）、杜兰特（雷霆）、乔治（步行者）、欧文（骑士）都最终离队\n那么…… ​​​#NBA# ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论4",
        "love": "6",
        "dateTime": "2018-06-05 12:55"
    }, {
        "name": "NBA篮球竞彩分析推荐\t",
        "link": "https://weibo.com/u/3959691592?refer_flag=1001030103_",
        "comment": "詹姆斯将成为2K19的封面，而成为这个游戏封面的球员下赛季必离队\n\n 篮球 篮彩#NBA##跟着大牛买篮彩# 每日篮彩推荐 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "3",
        "dateTime": "2018-06-05 12:54"
    }, {
        "name": "i毒舌科技\t",
        "link": "https://weibo.com/u/2871522161?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA 2K19的封面人物，关于这个夏天詹姆斯会不会有决定3众说纷纭，还记得2K的魔咒吗？ ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "10",
        "dateTime": "2018-06-05 12:47"
    }, {
        "name": "另眼看体育风云",
        "link": "https://weibo.com/mrkezizhang?refer_flag=1001030103_",
        "comment": "勒布朗成NBA 2K19封面人物 这次他能打破魔咒吗?(同步自@新浪看点)|勒布朗成NB... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 12:46"
    }, {
        "name": "地球不重启体育梦不熄",
        "link": "https://weibo.com/u/6355176061?refer_flag=1001030103_",
        "comment": "【詹姆斯将成NBA2K19封面】国外零售商泄露了《NBA 2K19》的封面宣传图，骑士球员勒布朗·詹姆斯喜上封面。但是，还记得2K系列封面人物的魔咒的吗？ ​​​​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 12:46"
    }, {
        "name": "新万博ManBetX\t",
        "link": "https://weibo.com/NewManBetX?refer_flag=1001030103_",
        "comment": "#万博体育# #新万博manbetx# #克利夫兰骑士# #勒布朗·詹姆斯# \n\n【美媒：詹姆斯将成为《2K19》封面球员】\n\n据美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。詹姆斯曾是《NBA 2K14》的封面球员。 ​​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 11:35"
    }, {
        "name": "pkacc120_ea",
        "link": "https://weibo.com/u/6404562347?refer_flag=1001030103_",
        "comment": "发布了头条文章：《勒布朗成NBA 2K19封面人物 这次他能打破魔咒么?》 |勒布朗成NB... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 11:34"
    }, {
        "name": "Gorfu\t",
        "link": "https://weibo.com/Gorfu?refer_flag=1001030103_",
        "comment": "勒布朗-詹姆斯将成为《NBA 2K19》作为20周年版本的封面球员！#NBA# 篮球永不熄 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 11:33"
    }, {
        "name": "篮球高清图库\t",
        "link": "https://weibo.com/kobephotos?refer_flag=1001030103_",
        "comment": "美媒Cavs Nation报道：《NBA 2K19》将把勒布朗·詹姆斯作为20周年版本的封面球员！\n#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发4",
        "comments": "评论9",
        "love": "44",
        "dateTime": "2018-06-05 11:27"
    }, {
        "name": "BB姬Studio\t",
        "link": "https://weibo.com/u/5938544491?refer_flag=1001030103_",
        "comment": "国外零售商泄露了《NBA 2K19》，登上封面的为勒布朗·詹姆斯。该作是NBA2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天即9月7日获取游戏，标准版则为9月11日发售，游戏包括XB1/PS4/NS/PC平台。 ​",
        "save": "收藏",
        "repost": "转发6",
        "comments": "评论15",
        "love": "34",
        "dateTime": "2018-06-05 11:19"
    }, {
        "name": "游侠网官方微博\t",
        "link": "https://weibo.com/ali213?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》泄露 詹姆斯再上封面】近日，国外一家零售店放出了一个《NBA 2K19》的人像立牌，这次上封面的NBA球星赫然是勒布朗·詹姆斯。根据牌子上的内容，本作是2K系列20周年纪念作品，将于9月11日发售，且玩家如果预购的话可以提早4天玩到游戏。 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论1",
        "love": "2",
        "dateTime": "2018-06-05 11:14"
    }, {
        "name": "pkacc003_cv",
        "link": "https://weibo.com/u/6404562211?refer_flag=1001030103_",
        "comment": "发布了头条文章：《《NBA 2K19》将登陆Switch，标准版9月发售》 |《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 11:13"
    }, {
        "name": "电玩巴士\t",
        "link": "https://weibo.com/tgbusvip?refer_flag=1001030103_",
        "comment": "国外零售商泄露了《NBA 2K19》的封面人物——勒布朗·詹姆斯，这也是詹姆斯继《NBA 2K14》后再度担任封面人物。今年詹姆斯能否打破魔咒呢\n根据立牌上的信息显示，该作标准版将在9月11日登陆PS4/X1/Switch/PC平台 ​",
        "save": "收藏",
        "repost": "转发9",
        "comments": "评论27",
        "love": "81",
        "dateTime": "2018-06-05 11:11"
    }, {
        "name": "球哥BBB-all\t",
        "link": "https://weibo.com/u/5849049051?refer_flag=1001030103_",
        "comment": "勒布朗-詹姆斯将登上NBA2K19的封面!!\n想想2K14的詹姆斯，2K15的杜兰特，2K17的乔治，2K18的欧文……\n现在詹姆斯又要登上2K19了\n2K的诅咒还会继续吗？\n难道真的会有决定3？？？ ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "3",
        "dateTime": "2018-06-05 11:10"
    }, {
        "name": "W吴海强\t",
        "link": "https://weibo.com/u/3339964800?refer_flag=1001030103_",
        "comment": "#NBA# 詹姆斯成为2k19封面人物。哎呦厉害了！\n\n不过目前我还只是偶尔玩玩2k14。\n\n后面出的就不再玩了。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-05 11:02"
    }, {
        "name": "Ballin篮球\t",
        "link": "https://weibo.com/ballinbasketball?refer_flag=1001030103_",
        "comment": "詹姆斯将成为2K19的封面人物，2K19将在9月8日发售。 NBA2K ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论3",
        "love": "11",
        "dateTime": "2018-06-05 11:02"
    }, {
        "name": "新浪游戏\t",
        "link": "https://weibo.com/517656716?refer_flag=1001030103_",
        "comment": "日前国外零售商泄露了《NBA 2K19》的封面宣传图，作为NBA传奇的勒布朗·詹姆斯喜上封面。根据商店特供封面宣传图显示，该作是NBA2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天获取游戏，即9月7日发布，标准版则为9月11日发售，勒布朗·詹姆斯除了本作，之前还上过《NBA 2K14》封面，游戏平 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发21",
        "comments": "评论69",
        "love": "293",
        "dateTime": "2018-06-05 11:00"
    }, {
        "name": "三天两觉是也\t",
        "link": "https://weibo.com/santianliangjiao?refer_flag=1001030103_",
        "comment": "过去那9个月里，我的一项娱乐活动就是平均每周打开一次steam，看一下NBA2K18下面的差评，那简直就是一部段子集。\n作为一部每年推出一代的年货类游戏，2K18能在发行9个月后，仍旧保持着近期好评率比总体好评率低1%（近期26%，总体27%）的惊人评价，可见其品质之坚挺；像这种能让人恶心整整一年的3A级大 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发12",
        "comments": "评论70",
        "love": "542",
        "dateTime": "2018-06-05 10:48"
    }, {
        "name": "STN工作室\t",
        "link": "https://weibo.com/stanleyreport?refer_flag=1001030103_",
        "comment": "【NBA 2K19封面人物疑似泄露，詹姆斯担任二十周年版封面人物】推特用户ShakeDown2012在昨天发布了两张疑似《NBA 2K19》的宣传图，可以看到封面人物为勒布朗詹姆斯，同时发布日期显示为9月7日，而鉴于2K的毒奶，2K14的詹姆斯回到了骑士，15的杜兰特去了勇士，17的乔治去了雷霆，18的欧文去了凯尔特人， ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发6",
        "comments": "评论31",
        "love": "116",
        "dateTime": "2018-06-05 10:45"
    }, {
        "name": "新浪新手卡中心\t",
        "link": "https://weibo.com/sinaka?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》泄露！詹皇喜上封面】国外零售商泄露了《NBA 2K19》的封面宣传图，作为NBA传奇的勒布朗·詹姆斯喜上封面。根据商店特供封面宣传图显示，该作是NBA2K系列20周年作品，玩家如果预购这个“20周年版”可以提前4天获取游戏，即9月7日发布，标准版则为9月11日发售，勒布朗·詹姆斯除了本作，之前 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发17",
        "comments": "评论15",
        "love": "61",
        "dateTime": "2018-06-05 10:42"
    }, {
        "name": "IT之家\t",
        "link": "https://weibo.com/ithome?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》将登陆Switch，标准版9月发售】车枪球类型的体育游戏一年一作已是常态，而NBA 2K系列也是做到了《NBA 2K19》。目前国外零售商泄露了本作的封面宣传图，作为NBA传奇的勒布朗·詹姆斯喜上封面。……详情点击：|《NBA 2K19... ​",
        "save": "收藏",
        "repost": "转发6",
        "comments": "评论8",
        "love": "17",
        "dateTime": "2018-06-05 10:38"
    }, {
        "name": "3DMGAME官方微博\t",
        "link": "https://weibo.com/3dmgame?refer_flag=1001030103_",
        "comment": "【《NBA 2K19》确认登陆Switch 詹姆斯担任封面人物】《NBA 2K19》将登陆Switch主机，消息来源于零售店的广告牌。从广告牌来看《NBA 2K19》可能会在9月发售，封面人物为勒布朗詹姆斯。\n然而有意思的是2K14詹姆斯离开热火，2K15杜兰特去了勇士，17乔治去了雷霆，18年欧文去了凯尔特人，那么目前总决赛0-2 ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发4",
        "comments": "评论5",
        "love": "17",
        "dateTime": "2018-06-05 10:36"
    }, {
        "name": "爆炒NBA\t",
        "link": "https://weibo.com/BCNBA?refer_flag=1001030103_",
        "comment": "#NBA# 【勒布朗-詹姆斯将成为2K19的封面人物\n】此前，詹姆斯曾当选2K14的封面人物。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-05 10:30"
    }, {
        "name": "篮球之声\t",
        "link": "https://weibo.com/574711009?refer_flag=1001030103_",
        "comment": "詹姆斯将成为2K19的封面人物，还记得2k诅咒吗\n#NBA# ​",
        "save": "收藏",
        "repost": "转发20",
        "comments": "评论21",
        "love": "114",
        "dateTime": "2018-06-05 10:23"
    }, {
        "name": "网易爱玩\t",
        "link": "https://weibo.com/game163?refer_flag=1001030103_",
        "comment": "【零售商广告牌泄密《NBA 2K19》将登陆Switch主机】从广告牌上的信息来看，《NBA 2K19》会在9月发售，购买20周年纪念版游戏的玩家可以提前4天游玩。 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "3",
        "dateTime": "2018-06-05 10:12"
    }, {
        "name": "疯狂红单\t",
        "link": "https://weibo.com/fengkuanghongdan?refer_flag=1001030103_",
        "comment": "据美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。詹姆斯曾是《NBA 2K14》的封面球员。所以，詹皇决定3要实锤了？ ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 10:07"
    }, {
        "name": "技巧君侃球\t",
        "link": "https://weibo.com/nbaqmxh?refer_flag=1001030103_",
        "comment": "据美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。\n关于2K的魔咒可以了解下！自从2K14开始，被2K选中当封面的人物大多都转队了！ ​​​​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论2",
        "love": "6",
        "dateTime": "2018-06-05 10:03"
    }, {
        "name": "游戏观察君\t",
        "link": "https://weibo.com/wanplusdota2?refer_flag=1001030103_",
        "comment": "【詹姆斯确认成为2k19封面人物】今日据外媒称，《NBA 2K19》将于2018年9月7日发售并推出20周年纪念版，骑士球星詹姆斯将作为封面人物。詹姆斯此前曾在2K14中当选封面人物。在本次季后赛中，詹姆斯场均出场41.7分钟，得到34.6分9.2篮板8.9助攻，当选封面人物可谓实至名归。\n\n#詹姆斯# #nba2k19# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 09:56"
    }, {
        "name": "NintendoSwitch俱乐部\t",
        "link": "https://weibo.com/u/6208624359?refer_flag=1001030103_",
        "comment": "《NBA 2K19》确认今年9月将发售NS版本，当然这也是意料之中的事情。 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "3",
        "dateTime": "2018-06-05 09:46"
    }, {
        "name": "圣安东尼奥2014",
        "link": "https://weibo.com/u/6509563582?refer_flag=1001030103_",
        "comment": "#2K魔咒#“决定3要来了”？💥詹姆斯将成为2K19的封面人物作为20周年版本，2K19将在9月8日发售此前，詹姆斯曾当选2K14的封面人物 #NBA总决赛# ​​​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 09:37"
    }, {
        "name": "篮球湿叔\t",
        "link": "https://weibo.com/Andrewiggins?refer_flag=1001030103_",
        "comment": "詹姆斯NBA 2K19封面 詹姆斯成为NBA 2K19二十周年版本的封面人物，在此之前詹姆斯曾被选为2K14的封面人物。 \n2K封面人物神秘魔咒了解一下。14封面詹姆斯回了骑士，15杜兰特去了勇士，17乔治去了雷霆，18欧文游戏还没出就去了绿军！  ​",
        "save": "收藏",
        "repost": "转发25",
        "comments": "评论18",
        "love": "76",
        "dateTime": "2018-06-05 09:28"
    }, {
        "name": "凤凰网体育\t",
        "link": "https://weibo.com/sportsifeng?refer_flag=1001030103_",
        "comment": "【运动汇|一哥G3有望复出 詹皇离开骑士已成定局？】伊戈达拉左膝已无痛感，他可能在#NBA总决赛#下一场复出；詹姆斯登上《NBA 2K19》封面，这款游戏存在登上封面就转会或表现不佳的魔咒；U23国足4-2击败纳米比亚，张玉宁破门；小威宣布因伤退出法网，莎拉波娃错失终结18连败机会。|运动汇|一... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "6",
        "dateTime": "2018-06-05 09:27"
    }, {
        "name": "UOOSPORTS\t",
        "link": "https://weibo.com/u/6218004127?refer_flag=1001030103_",
        "comment": " 詹姆斯 NBA季后赛勒布朗-詹姆斯将成为2K19的封面人物，2K封面定律—谁上封面谁换队​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论1",
        "love": "9",
        "dateTime": "2018-06-05 09:21"
    }, {
        "name": "二柄主机游戏APP\t",
        "link": "https://weibo.com/erbingapp?refer_flag=1001030103_",
        "comment": "尽管2K还没宣布，但网上已经提前曝光了《NBA 2K19》，这次的来源似乎是零售商用来为游戏做宣传的人物立牌。从立牌上我们可以看到《NBA 2K19》将于9月7日发售，由克利夫兰队的当红球星勒布朗詹姆斯担当封面人物，将会有20周年纪念版本，部分玩家似乎可以提前4天进行游玩。游戏登陆的平台为PS4、Xbox One ​ ...展开全文c",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "2",
        "dateTime": "2018-06-05 09:12"
    }, {
        "name": "大西布中文网\t",
        "link": "https://weibo.com/westbrookcn?refer_flag=1001030103_",
        "comment": "#NBA# 2K19封面人物—詹姆斯。据说2K有个封面定律—谁上封面谁换队。 ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论26",
        "love": "80",
        "dateTime": "2018-06-05 09:10"
    }, {
        "name": "阿德托昆博FansClub\t",
        "link": "https://weibo.com/u/6403737490?refer_flag=1001030103_",
        "comment": "恭喜 詹姆斯，成为2k19封面人物，你认为 字母哥letterbro什么时候能成为2k封面人物呢#nba零距离##NBA# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "1",
        "dateTime": "2018-06-05 09:05"
    }, {
        "name": "一个就好9",
        "link": "https://weibo.com/u/5096034979?refer_flag=1001030103_",
        "comment": "据悉2K将会把詹姆斯作为NBA 2K19二十周年版本的封面人物，在此之前詹姆斯曾被选为2K14的封面人物。 ​​​​\n当然2K封面人物可不好当，魔咒一套一套。14封面詹姆斯回了骑士，15杜兰特去了勇士，17乔治去了雷霆，18欧文游戏还没出就去了绿军！ ​​​ ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "",
        "dateTime": "2018-06-05 09:00"
    }, {
        "name": "NYBO青少年篮球资讯\t",
        "link": "https://weibo.com/u/6545424019?refer_flag=1001030103_",
        "comment": "勒布朗-詹姆斯将成为2K19的封面人物，难不成封面离队又要成真了……#nybo##NBA季后赛# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "1",
        "dateTime": "2018-06-05 08:57"
    }, {
        "name": "微观篮球\t",
        "link": "https://weibo.com/u/5635855696?refer_flag=1001030103_",
        "comment": "#詹姆斯 2K19封面#“决定3要来了”？💥詹姆斯将成为2K19的封面人物作为20周年版本，2K19将在9月8日发售此前，詹姆斯曾当选2K14的封面人物 #NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发31",
        "comments": "评论37",
        "love": "90",
        "dateTime": "2018-06-05 08:56"
    }, {
        "name": "FuckBasketball\t",
        "link": "https://weibo.com/u/5630847689?refer_flag=1001030103_",
        "comment": "詹姆斯将成为2K19的封面人物#NBA# ​",
        "save": "收藏",
        "repost": "转发11",
        "comments": "评论43",
        "love": "146",
        "dateTime": "2018-06-05 08:54"
    }, {
        "name": "篮球大图\t",
        "link": "https://weibo.com/hdpicture?refer_flag=1001030103_",
        "comment": "据悉2K将会把詹姆斯作为NBA 2K19二十周年版本的封面人物，在此之前詹姆斯曾被选为2K14的封面人物。 ​​​​\n当然2K封面人物可不好当，魔咒一套一套。14封面詹姆斯回了骑士，15杜兰特去了勇士，17乔治去了雷霆，18欧文游戏还没出就去了绿军！ ​",
        "save": "收藏",
        "repost": "转发48",
        "comments": "评论107",
        "love": "297",
        "dateTime": "2018-06-05 08:53"
    }, {
        "name": "823区",
        "link": "https://weibo.com/u/5582953212?refer_flag=1001030103_",
        "comment": "詹姆斯将成为篮球游戏NBA2K19的封面人物。2K19将在9月8日发售。而詹姆斯曾当选2K14的封面人物。 |西安·西安... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论2",
        "love": "2",
        "dateTime": "2018-06-05 08:45"
    }, {
        "name": "篮球视点",
        "link": "https://weibo.com/u/1902131971?refer_flag=1001030103_",
        "comment": "美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。 ​​​\n\nNBA2K19将在9月8日发售，而詹姆斯上次出现在2K封面的时候还是在2014年。\n#篮球视点# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论1",
        "love": "4",
        "dateTime": "2018-06-05 08:38"
    }, {
        "name": "国产ESPN\t",
        "link": "https://weibo.com/u/6019168547?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA2K19的封面人物！\n\n作为20周年版本，2K19将在9月8日发售。\n\n老詹曾当选过2K14封面人物。 ​​​#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发47",
        "comments": "评论63",
        "love": "377",
        "dateTime": "2018-06-05 08:36"
    }, {
        "name": "詹姆斯资讯\t",
        "link": "https://weibo.com/u/5088697550?refer_flag=1001030103_",
        "comment": "美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。 ​​​\n\n 詹姆斯#nba2k19# ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论1",
        "love": "13",
        "dateTime": "2018-06-05 08:35"
    }, {
        "name": "篮球教学论坛\t",
        "link": "https://weibo.com/hupunba?refer_flag=1001030103_",
        "comment": "詹姆斯将成为NBA 2K19的封面人物！还记得2K的魔咒吗？ #NBA总决赛#  篮球教学 ​",
        "save": "收藏",
        "repost": "转发103",
        "comments": "评论126",
        "love": "1183",
        "dateTime": "2018-06-05 08:35"
    }, {
        "name": "只关于篮球\t",
        "link": "https://weibo.com/u/5508233899?refer_flag=1001030103_",
        "comment": "詹姆斯将成为篮球游戏NBA2K19的封面人物。作为20周年版本，2K19将在9月8日发售。而詹姆斯曾当选2K14的封面人物。 ​",
        "save": "收藏",
        "repost": "转发30",
        "comments": "评论73",
        "love": "375",
        "dateTime": "2018-06-05 08:32"
    }, {
        "name": "强哥说事\t",
        "link": "https://weibo.com/31688416?refer_flag=1001030103_",
        "comment": " 我是詹姆斯球迷美媒《Cavs Nation》：《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。\n詹姆斯曾是《NBA 2K14》的封面球员！ ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论11",
        "love": "45",
        "dateTime": "2018-06-05 08:31"
    }, {
        "name": "篮球热点\t",
        "link": "https://weibo.com/209096781?refer_flag=1001030103_",
        "comment": "美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。 ​",
        "save": "收藏",
        "repost": "转发21",
        "comments": "评论30",
        "love": "147",
        "dateTime": "2018-06-05 08:31"
    }, {
        "name": "骑士队更衣室\t",
        "link": "https://weibo.com/u/3054851745?refer_flag=1001030103_",
        "comment": "据美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。\n詹姆斯曾是《NBA 2K14》的封面球员。\n《NBA 2K》最早发行于1999年11月10日。 ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论5",
        "love": "32",
        "dateTime": "2018-06-05 08:30"
    }, {
        "name": "篮球实战馆\t",
        "link": "https://weibo.com/nbalqjx?refer_flag=1001030103_",
        "comment": "美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。#NBA# ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论2",
        "love": "7",
        "dateTime": "2018-06-05 08:29"
    }, {
        "name": "干扰球啊\t",
        "link": "https://weibo.com/mrbasketball?refer_flag=1001030103_",
        "comment": "美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。#NBA总决赛# ​​​\n有点害怕啊 ​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "5",
        "dateTime": "2018-06-05 08:24"
    }, {
        "name": "极速绿茵场",
        "link": "https://weibo.com/u/6124094414?refer_flag=1001030103_",
        "comment": "【勒布朗-詹姆斯将成为2K19的封面人物】虎扑6月5日讯据CavsNation报道，有消息称，骑士球员勒布朗-詹姆斯将成为篮球游戏NBA2K19的封面人物。|勒布朗-詹... ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 08:22"
    }, {
        "name": "观篮球\t",
        "link": "https://weibo.com/u/6197920443?refer_flag=1001030103_",
        "comment": "《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员 ​",
        "save": "收藏",
        "repost": "转发",
        "comments": "评论",
        "love": "",
        "dateTime": "2018-06-05 08:22"
    }, {
        "name": "篮球大片\t",
        "link": "https://weibo.com/u/2670184211?refer_flag=1001030103_",
        "comment": "据美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。\n詹姆斯曾是《NBA 2K14》的封面球员。 ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论7",
        "love": "19",
        "dateTime": "2018-06-05 08:21"
    }, {
        "name": "斯哥侃球\t",
        "link": "https://weibo.com/u/6040159096?refer_flag=1001030103_",
        "comment": "《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论8",
        "love": "52",
        "dateTime": "2018-06-05 08:20"
    }, {
        "name": "篮球热视频\t",
        "link": "https://weibo.com/271111498?refer_flag=1001030103_",
        "comment": "美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。#NBA总决赛# ​",
        "save": "收藏",
        "repost": "转发6",
        "comments": "评论7",
        "love": "36",
        "dateTime": "2018-06-05 08:19"
    }, {
        "name": "布朗尼-詹姆斯BronnyJames\t",
        "link": "https://weibo.com/u/6356771720?refer_flag=1001030103_",
        "comment": "詹姆斯将成为《2K19》封面球员\n\n《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。\n\n詹姆斯曾是《NBA 2K14》的封面球员。 ​​​",
        "save": "收藏",
        "repost": "转发1",
        "comments": "评论",
        "love": "17",
        "dateTime": "2018-06-05 08:14"
    }, {
        "name": "新浪NBA\t",
        "link": "https://weibo.com/nbachannel?refer_flag=1001030103_",
        "comment": "詹姆斯登上了20周年纪念版的《NBA 2K19》封面，这或许意味着詹姆斯离开骑士已成定局NBA 2K 游戏一直存在着一个魔咒，那就是登上封面的球员基本都会离开原来的球队，比如2K14的詹姆斯、2K15的杜兰特、2K17保罗-乔治、2K18的欧文。#图说NBA# ​",
        "save": "收藏",
        "repost": "转发16",
        "comments": "评论32",
        "love": "93",
        "dateTime": "2018-06-05 08:10"
    }, {
        "name": "万博体育\t",
        "link": "https://weibo.com/u/2645472157?refer_flag=1001030103_",
        "comment": "【美媒：詹姆斯将成为《2K19》封面球员】\n据美媒《Cavs Nation》报道，《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。詹姆斯曾是《NBA 2K14》的封面球员。 ​",
        "save": "收藏",
        "repost": "转发2",
        "comments": "评论4",
        "love": "14",
        "dateTime": "2018-06-05 08:06"
    }, {
        "name": "说球帝\t",
        "link": "https://weibo.com/liuzhanyang888?refer_flag=1001030103_",
        "comment": "《NBA 2K19》将会把勒布朗-詹姆斯作为20周年版本封面球员。 ​",
        "save": "收藏",
        "repost": "转发3",
        "comments": "评论5",
        "love": "19",
        "dateTime": "2018-06-05 07:46"
    }, {
        "name": "NS新闻速报\t",
        "link": "https://weibo.com/u/6247019417?refer_flag=1001030103_",
        "comment": "《NBA 2K19》确认今年9月将发售NS版本，当然这也是意料之中的事情。 ​",
        "save": "收藏",
        "repost": "转发53",
        "comments": "评论74",
        "love": "134",
        "dateTime": "2018-06-05 06:57"
    }];



    console.log(news.length);
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
                news[i].fans = fans.replace(/[\r\n\t]/g,"").match(/[0-9]+/g)[0];
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
    fs.writeFile('./weibo_nba2k19_all.json', JSON.stringify(news), function(err) {
        if(!err) {
            console.log("数据写入完毕");
  
        } else {
            console.log("数据写入出错");
        }  
        process.exit();        
    });
})();