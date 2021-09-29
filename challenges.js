const puppy = require("puppeteer");
let moderators = ["ShahrukhAnsari","AamirAnsari"];
//all the functions of puppeteer are asynchronous as well as return promise also
//await can be used

//the reason we use await with puppy launch is that first the browser loads then the website will load
async function openBrowser(){
    //gives the browser object(now we can control the browser through the methods provided in object)
const browser = await puppy.launch({
    headless:false,
    defaultViewport: false,
    args : [
        '--start-maximized' 
    ],
    
});
// await browser.newPage(); //opens the new page
//this gives the page object (we can control the webpage throught the method provided by the objects)

// for(let i = 0;i<9;i++){
//     await browser.newPage();
// }
// let tabs = await browser.pages();
// for(let i = 0;i<tabs.length;i++){
// let currentTab = tabs[i];
// await currentTab.goto("https://www.google.com");
// }

//alternate of above
//pages return the array currently opened tags
// browser.pages().then(function(tabs){
//     tabs[0].goto("https://www.google.com");
// })
// //newPage opens new page
// for(let i = 0;i<9;i++){
//     browser.newPage().then(function(tab){
//         tab.goto("https://www.google.com");
//     })
// }

const tabs = await browser.pages();
const tab = tabs[0];
await tab.goto("https://www.hackerrank.com/auth/login");
let usernameInputTab = await tab.$("#input-1");
let passwordInputTab = await tab.$("#input-2");
let rememberCheckbox = await tab.$(".checkbox-input");
let loginButton = await tab.$('[data-analytics="LoginPassword"]');
await usernameInputTab.type("makega7616@soulsuns.com");
await passwordInputTab.type("temp@123");
await rememberCheckbox.click();
await loginButton.click();
//this step must be used when waitforselector doesn't work
await tab.waitForNavigation({waitUntil: "networkidle2"});
//when you load to new page (waits if the given tag is visible on site or not)
await tab.waitForSelector('[data-analytics="NavBarProfileDropDown"]',{
    visible:true
})
//after that clicking will take place
let myProfileButton = await tab.$('[data-analytics="NavBarProfileDropDown"]');
await myProfileButton.click();
let administrationButton = await tab.$('[data-analytics="NavBarProfileDropDownAdministration"]');
await administrationButton.click();
await tab.waitForSelector('.admin-tabbed-nav a');

let administrationTabs = await tab.$$(".admin-tabbed-nav a");
await administrationTabs[1].click();

let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
await createChallengeButton.click();
//waits for the tags (textareas and all)
await tab.waitForSelector("#input_format-container .CodeMirror-code");
let challengeNameInput = await tab.$("#name");
let challengeDescriptionInput = await tab.$("#preview");
await challengeNameInput.type("kjdsbf");
await challengeDescriptionInput.type("kjdsbf");
let codeTextAreas = await tab.$$(".CodeMirror-code");

await tab.evaluate( () => {
    window.scrollBy(0,window.innerHeight);
});
for(let i in codeTextAreas){
    await codeTextAreas[i].click();
    await codeTextAreas[i].type("kjdbsf");
}
await tab.waitForSelector("#tags_tagsinput");
let tagsTextArea = await tab.$("#tags_tagsinput");
await tagsTextArea.click();
await tagsTextArea.type("kjdsbf");
await tab.keyboard.press("Enter");

let saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
await saveChangesButton.click();
await tab.waitForSelector('[data-tab="moderators"]');
let moderatorButton = await tab.$('[data-tab="moderators"]');
await moderatorButton.click();
await tab.waitForSelector("#moderator");
let moderatorTextArea = await tab.$("#moderator");
for(let moderator of moderators) {
    await moderatorTextArea.type(moderator);
    await tab.keyboard.press("Enter");
}
await tab.waitForSelector(".save-challenge.btn.btn-green");
saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
await saveChangesButton.click();
}
openBrowser();