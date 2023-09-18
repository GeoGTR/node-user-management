const {By, Builder} = require('selenium-webdriver');
const {suite} =  require('selenium-webdriver/testing');
const assert = require('assert');

const chrome = require('selenium-webdriver/chrome')   
const screen = {
    width: 640,
    height: 480
};

suite(env=>{
    describe("Accounts listesi testleri",()=>{
        let driver;
        
        before(async()=>{
            driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless().windowSize(screen))
            .build();
        });
        after(async()=>{
            await driver.quit();
        });
        it("Test kullanıcısı oluşturma",async()=>{
            await driver.get("http://35.239.91.104:4000/");
            await driver.findElement(By.id('name')).sendKeys('tsName');
            await driver.findElement(By.id('surname')).sendKeys('tsSurname');
            await driver.findElement(By.id('email')).sendKeys('tsEmail@tsEmail')
            await driver.findElement(By.id('password')).sendKeys('tsPassword')

            await driver.findElement(By.id('submit')).click()

            let userlist = await driver.findElement(By.id('userList'));
            let users = await userlist.findElements(By.tagName('li'));
            let testuser = users[users.length-1];
            
            assert.equal(await testuser.getText(),'tsName tsSurname - tsEmail@tsEmail');
        });
    });
});
