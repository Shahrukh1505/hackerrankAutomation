const puppy = require("puppeteer");
async function openBrowser(){
  
const browser = await puppy.launch({
    headless:false,
    defaultViewport: false,
    args : [
        '--start-maximized' 
    ],
    
});

const tabs = await browser.pages();
const tab = tabs[0];
await tab.goto("https://www.hackerrank.com/auth/login");
let usernameInputTab = await tab.$("#input-1");
let passwordInputTab = await tab.$("#input-2");
let rememberCheckbox = await tab.$(".checkbox-input");
let loginButton = await tab.$('[data-analytics="LoginPassword"]');
await usernameInputTab.type("kiciye3428@bio123.net");
await passwordInputTab.type("temp@123");
await rememberCheckbox.click();
await loginButton.click();
//wait for selector is used whenever you move to new page
//you need to waait for the page to completely load the called selector
await tab.waitForSelector('.prep-kit-name');
let StartPreparationButton = await tab.$('.prep-kit-name');
await StartPreparationButton.click();

await tab.waitForSelector('[data-analytics="SolvePrepKitChallenge"]');
let solveChallengeButtons = await tab.$$(
    '[data-analytics="SolvePrepKitChallenge"]'
);
let solveChallengeUrls = [];
for(let solveChallengeButton of solveChallengeButtons) {
    solveChallengeUrls.push (
        await tab.evaluate(function (ele) {
return "https://www.hackerrank.com" + ele.getAttribute("href");
        },solveChallengeButton)
    );
}
for(let i in solveChallengeUrls){
    if(i!=1){
        await tab.goto(solveChallengeUrls[i]);
        await tab.waitForSelector('[data-attr2="Editorial"]');
        let editorial = await tab.$('[data-attr2="Editorial"]');
        await editorial.click();
        await tab.waitForSelector('.highlight pre'); // select the element
        const e = await tab.$('.highlight pre');
const value = await e.evaluate(el => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context
let str = value;
let problems = await tab.$('[data-analytics="ChallengeViewTab"]');
await problems.click();
await tab.waitForSelector('.view-lines');
await tab.click('[type = "checkbox"]');
await tab.type('#input-1', str);
await tab.keyboard.down('Control');
  await tab.keyboard.press('KeyA');
  await tab.keyboard.up('Control');
  await tab.keyboard.down('Control');
  await tab.keyboard.press('KeyX');
  await tab.keyboard.up('Control');
let editor = await tab.$('.view-lines');
await editor.click();
await tab.keyboard.down('Control');
  await tab.keyboard.press('KeyA');
  await tab.keyboard.up('Control');
  await tab.keyboard.down('Control');
  await tab.keyboard.press('KeyV');
  await tab.keyboard.up('Control');
  
  let submit = await tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
  await submit.click();
  await tab.waitForTimeout(4000);
}
}
}
openBrowser();